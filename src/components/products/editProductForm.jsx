import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { ProductsContext } from "../../providers/productsProvider";
import { editProduct } from "../../services/db";

class EditProductForm extends Component {
  static contextType = ProductsContext;

  state = {
    product: {
      productName: this.props.product.name,
      productPrice: this.props.product.price,
      productStockCount: this.props.product.stockCount,
    },
  };

  handleInput = ({ currentTarget: input }) => {
    let product = { ...this.state.product };
    product[input.name] = input.value;
    this.setState({ product });
  };

  handleSaveProduct = async (e) => {
    e.preventDefault();
    const { productName, productPrice, productStockCount } = this.state.product;
    let temp_product = {
      _id: this.props.product._id,
      creationDate: this.props.product.creationDate,
      name: productName,
      price: productPrice,
      stockCount: productStockCount,
    };

    var result = await editProduct(temp_product);
    const { products, setProducts } = this.context;
    let index = await products.findIndex(
      (product) => product._id === result._id
    );
    let new_products = [...products];
    new_products[index] = await result;
    await setProducts(new_products);
    this.props.onModalClose();
    // await console.log("Product saved!", new_products);
  };

  render() {
    const { productName, productPrice, productStockCount } = this.state.product;
    return (
      <>
        <Form>
          <Form.Group controlId="formBasicProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="input"
              placeholder="Enter Product Name"
              value={productName}
              name="productName"
              onChange={this.handleInput}
            />
          </Form.Group>

          <Form.Group controlId="formBasicProductPrice">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="input"
              placeholder="Enter Product Price"
              value={productPrice}
              name="productPrice"
              onChange={this.handleInput}
            />
          </Form.Group>
          <Form.Group controlId="formBasicProductStock">
            <Form.Label>Stock Count</Form.Label>
            <Form.Control
              type="input"
              placeholder="Enter Product Stock"
              value={productStockCount}
              name="productStockCount"
              onChange={this.handleInput}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={this.handleSaveProduct}
          >
            Save
          </Button>
        </Form>
      </>
    );
  }
}

export default EditProductForm;
