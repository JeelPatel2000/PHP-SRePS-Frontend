import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { addProduct } from "../services/db";
import { ProductsContext } from "../providers/productsProvider";

class AddProductForm extends Component {
  static contextType = ProductsContext;

  state = {
    product: {
      productName: "",
      productPrice: 0,
      productStockCount: 0,
    },
  };

  handleInput = ({ currentTarget: input }) => {
    let product = { ...this.state.product };
    product[input.name] = input.value;
    this.setState({ product });
  };

  handleAddProduct = (e) => {
    e.preventDefault();
    const { productName, productPrice, productStockCount } = this.state.product;
    let product = {
      name: productName,
      price: productPrice,
      stockCount: productStockCount,
    };
    // console.log("Add Product Form Input: ", product);

    addProduct(product).then((result) => {
      const { products, setProducts } = this.context;
      let _products = [result, ...products];
      setProducts(_products);
      this.props.onModalClose();
    });
  };

  render() {
    const { productName, productPrice, productStockCount } = this.state.product;
    return (
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
        <Button variant="primary" type="submit" onClick={this.handleAddProduct}>
          Add Product
        </Button>
      </Form>
    );
  }
}

export default AddProductForm;
