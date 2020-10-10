import React, { Component } from "react";
import { ProductsContext } from "../../providers/productsProvider";

class StockTable extends Component {
  static contextType = ProductsContext;

  render() {
    const { products } = this.context;

    //const product_list = ProductsContext.Consumer.;

    if (products.length === 0) return <h2>No Products to display Stock</h2>;
    else {
      return (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Stock Count</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.stockCount}</td>
                  {/* <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  }
}

export default StockTable;
