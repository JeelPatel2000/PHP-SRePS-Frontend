import React, { Component } from "react";
import { ProductsContext } from "../../providers/productsProvider";
import { deleteProduct } from "../../services/db";
import EditProductModal from "./editProductModal";

class ProductsTable extends Component {
  static contextType = ProductsContext;

  state = {
    editProductModalShow: false,
    currentEditProduct: null,
  };

  handleEditProductModalClose = () => {
    this.setState({ editProductModalShow: false });
  };

  handleEditProduct = (product) => {
    //opening the modal on clicking the edit button and updating the current edit product
    this.setState({ editProductModalShow: true, currentEditProduct: product });
  };

  handleDeleteProduct = (_id) => {
    const { products, setProducts } = this.context;
    const new_products = products.filter((product) => product._id !== _id);
    setProducts(new_products);
    deleteProduct(_id);
  };

  render() {
    const { products } = this.context;

    //const product_list = ProductsContext.Consumer.;

    if (products.length === 0) return <h2>No Products</h2>;
    else {
      return (
        <>
          <EditProductModal
            show={this.state.editProductModalShow}
            handleClose={this.handleEditProductModalClose}
            product={this.state.currentEditProduct}
          />
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Creation Date</th>
                <th>Stock Count</th>
                {/* <th></th> */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.creationDate}</td>
                    <td>{product.stockCount}</td>
                    {/* <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => this.handleEditProduct(product._id)}
                    >
                      Edit
                    </button>
                  </td> */}
                    <td>
                      <button
                        className="btn btn-primary"
                        style={{ marginRight: "10px" }}
                        onClick={() => this.handleEditProduct(product)}
                      >
                        Edit
                      </button>
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
        </>
      );
    }
  }
}

export default ProductsTable;
