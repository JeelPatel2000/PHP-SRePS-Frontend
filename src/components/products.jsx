import React, { Component } from "react";
import AddProductModal from "./addProductModal";
import ProductsTable from "./productsTable";

class Products extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="productHeader">
          <h1>Products</h1>
          <AddProductModal></AddProductModal>
        </div>
        <ProductsTable />
      </React.Fragment>
    );
  }
}
export default Products;
