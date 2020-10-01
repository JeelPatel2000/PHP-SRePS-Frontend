import React, { Component } from "react";

class ProductsTable extends Component {
  endpoint = "";

  state = {
    product_list: [],
  };

  componentDidMount() {
    this.getProductsList();
  }

  getProductsList = () => {
    fetch("http://192.168.1.11:3001/products/list")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ product_list: data });
        console.log(data);
      });
  };

  handleDeleteProduct = (productID) => {
    fetch(`http://192.168.1.11:3001/products/delete/${productID}`).then(
      (result) => {
        const list = [...this.state.product_list];
        const new_list = list.filter((i) => i._id !== productID);
        this.setState({ product_list: new_list });
      }
    );
  };

  render() {
    const { product_list } = this.state;

    if (product_list.length === 0) {
      return <h2>No Products</h2>;
    }
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Creation Date</th>
            <th>Stock Count</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {product_list.map((product) => {
            return (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.creationDate}</td>
                <td>{product.stockCount}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default ProductsTable;
