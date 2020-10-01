import React, { Component } from "react";
import ProductsTable from "./productsTable";

class Products extends Component {
  componentDidUpdate() {
    console.log("Products");
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <h1>Products</h1>
        </div>
        <ProductsTable />
      </React.Fragment>
    );
  }
}
export default Products;
