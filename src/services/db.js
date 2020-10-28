import axios from "axios";

// axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';


let url = "http://localhost:3001";

export async function getProductsList() {
  let result = await fetch(`${url}/products/list`);
  result = await result.json();
  await console.log(result);
  return result;
}

export async function deleteProduct(_id) {
  let result = await fetch(`${url}/products/delete/${_id}`);
  result = await result.json();
  await console.log(result);
  return result;
}

export async function addProduct(product) {
  let result = await axios({
    method: "POST",
    url: `${url}/products/add`,
    data: product,
  });
  return await result.data;
}

export async function editProduct(product) {
  let result = await axios({
    method: "POST",
    url: `${url}/products/edit`,
    data: product,
  });
  await console.log("db call", result.data);
  return await result.data;
}

export async function addSalesRecord(record){
  let result = await axios({
    method: "POST",
    url: `${url}/salesrecord/add`,
    data: record,
  });
  await console.log("added sales record", result.data);
  return await result.data;
}

export async function searchSalesRecord(recordID){
  let result = await fetch(`${url}/salesrecord/search/${recordID}`);
  result = await result.json();
  await console.log(result);
  return await result;
}

export async function getAllSalesRecord(){
  let result = await fetch(`${url}/salesrecord/list`);
  result = await result.json();
  await console.log(result);
  return await result;
}