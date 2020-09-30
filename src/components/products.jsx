import React, { Component } from "react";

class Products extends Component {
  componentDidUpdate() {
    console.log("Products");
  }
  render() {
    return <h1>Products</h1>;
  }
}

export default Products;
