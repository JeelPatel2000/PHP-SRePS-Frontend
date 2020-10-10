import axios from "axios";

export async function getProductsList() {
  let result = await fetch("http://192.168.1.11:3001/products/list");
  result = await result.json();
  await console.log(result);
  return result;
}

export async function deleteProduct(_id) {
  let result = await fetch(`http://192.168.1.11:3001/products/delete/${_id}`);
  result = await result.json();
  await console.log(result);
  return result;
}

export async function addProduct(product) {
  let result = await axios({
    method: "POST",
    url: "http://192.168.1.11:3001/products/add",
    data: product,
  });
  return await result.data;
}

export async function editProduct(product) {
  let result = await axios({
    method: "POST",
    url: "http://192.168.1.11:3001/products/edit",
    data: product,
  });
  await console.log("db call", result.data);
  return await result.data;
}
