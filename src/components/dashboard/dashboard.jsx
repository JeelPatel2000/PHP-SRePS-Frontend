import React, { Component, Fragment } from "react";
import { CartContext } from "../../providers/cartProvider";
import { ProductsContext } from "../../providers/productsProvider";
import _ from 'lodash';
import { hasObject, editObjectInList, findIndex } from "../../util/util";
import { addSalesRecord } from "../../services/db";
import beep from "../../audio/beep.mp3";


class Dashboard extends Component {

  static contextType = ProductsContext;
  
  state = {
    customerName: "",
    barcode: "",
    date: Date.now(),
    products: [],
  }

  handleInput = ({ currentTarget: input }) => {
    let state = { ...this.state };
    state[input.name] = input.value;
    this.setState(state);
  };

  handleBarcodeInput = ({ currentTarget: input }) => {
    let _barcode = this.state.barcode;
    _barcode = input.value;
    this.setState({ barcode: _barcode });
  }

  addScanProduct = ({ currentTarget: input }, cart, setCart) => {
    let _barcode = input.value;
    let temp_cart = [...cart];
    const { products } = this.context;
    let product;
    for (product of products) {
      if (product._id === _barcode) {

        if (hasObject("_id", product, temp_cart)) {
          let index = findIndex("_id", product, temp_cart);
          if (product.stockCount - temp_cart[index].quantity > 0) {
            temp_cart = editObjectInList("_id", "quantity", product, temp_cart);
            setCart(temp_cart);
          }
        }
        else {
          if (product.stockCount > 0) {
            temp_cart.push({
              _id: product._id,
              name: product.name,
              price: product.price,
              quantity: 1
            });
            setCart(temp_cart);
          }
        }
        //empty the barcode field
        this.setState({ barcode: "" });
        //play the beep sound
        document.getElementById("beepAudio").play();
        break;
      }
    }
  }



  displayTotalAmount = (cart) => {
    let total = 0;
    for (let item of cart) {
      total += (item.price * item.quantity);
    }
    return total;
  }

  displayTotalQuantity = (cart) => {
    let total = 0;
    for (let item of cart) {
      total += item.quantity;
    }
    return total;
  }

  handleDeleteProduct = (cart, setCart, item) => {
    const temp_cart = [...cart];
    let new_cart = temp_cart.filter((i) => i._id !== item._id);
    setCart(new_cart);
  }

  incrementItemQuantity = (cart, setCart, item) => {
    let temp_cart = [...cart];
    for (let i in temp_cart) {
      if (temp_cart[i]._id === item._id) {
        temp_cart[i].quantity++;
        break;
      }
    }
    setCart(temp_cart);
  }

  decreamentItemQuantity = (cart, setCart, item) => {
    let temp_cart = [...cart];
    for (let i in temp_cart) {
      if (temp_cart[i]._id === item._id) {
        temp_cart[i].quantity--;
        break;
      }
    }
    setCart(temp_cart);
  }

  calculateTotalAmountofCart(cart) {
    let total = 0;
    for (let item of cart) {
      total += item.price * item.quantity;
    }
    return total;
  }

  generateInvoice = (cart, setCart) => {
    let record = {
      customerName: this.state.customerName,
      products: cart,
      totalAmount: this.calculateTotalAmountofCart(cart)
    }

    addSalesRecord(record)
      .then(result => {
        //update the local state of products stock count
        let { products, setProducts } = this.context;
        let temp_products = [...products];
        let temp_cart = record.products;

        for (let i of temp_cart) {
          for (let j of temp_products) {
            if (j._id === i._id) {
              j.stockCount -= i.quantity;
              break;
            }
          }
        }
        //calling the hook and updating products with reduced stock count
        setProducts(temp_products);
        //update the local state of sales records
        const { salesRecords, setSalesRecords } = this.props;
        let temp_salesRecords = [result, ...salesRecords];
        setSalesRecords(temp_salesRecords);
        //empty the cart
        setCart([]);
        //clear the form
        this.setState({ customerName: "" });
        //notify the user
      })
      .catch(err => console.error(err));
  }






  render() {

    const { barcode, date, customerName } = this.state;
    const { cart, setCart } = this.props;

    return (
      <Fragment>
        <div>
          <h1>Dashboard</h1>
          <div id="dashboard-container" className="container p-3">
            <div className="row">
              <div className="col-lg-2">
                <label htmlFor="customer_input">Customer Name</label>
                <input
                  id="customer_input"
                  className="form-control"
                  name="customerName"
                  value={customerName}
                  onChange={this.handleInput}
                />
              </div>
              <div className="col-lg-2">
                <label htmlFor="barcode_input">Scan Product</label>
                <input
                  id="barcode_input"
                  className="form-control"
                  name="barcode"
                  value={barcode}
                  onInput={this.handleBarcodeInput}
                  onChange={(e) => this.addScanProduct(e, cart, setCart)}
                />
              </div>
            </div>
          </div>

          <table className="table table-hover">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                cart.length === 0 ? "" : cart.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>
                        <button className="btn btn-sm btn-primary" onClick={() => this.decreamentItemQuantity(cart, setCart, item)} disabled={item.quantity === 1 ? true : false}>-</button>
                        <span className="p-2">{item.quantity}</span>
                        <button className="btn btn-sm btn-primary" onClick={() => this.incrementItemQuantity(cart, setCart, item)}>+</button>
                      </td>
                      <td>{item.quantity * item.price}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.handleDeleteProduct(cart, setCart, item)}
                        >
                          Delete
                            </button>
                      </td>
                    </tr>
                  );
                })
              }

            </tbody>
            <tfoot>
              <tr>
                {
                  cart.length === 0 ? "" : (
                    <>
                      <td>Total</td>
                      <td></td>
                      <td></td>
                      <td>{this.displayTotalQuantity(cart)}</td>
                      <td>{this.displayTotalAmount(cart)}</td>
                      <td></td>
                    </>
                  )
                }
              </tr>
            </tfoot>
          </table>

          <div id="invoiceButtonDiv">
            <div></div>
            <button className="btn btn-success" onClick={() => this.generateInvoice(cart, setCart)} disabled={cart.length !== 0 ? false : true}>
              Generate Invoice
            </button>
          </div>
        </div>
        <audio id="beepAudio">
          <source src={beep}></source>
        </audio>

      </Fragment>
    );
  }
}

export default Dashboard;
