import React, { Component, Fragment } from "react";
import StockTable from "./stocktable";

class Stock extends Component {
  componentDidMount() {
    console.log("Stock");
  }
  render() {
    return (
      <Fragment>
        <div className="routeComponentHeader">
          <h1>Stock</h1>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <StockTable />
          </div>
          <div className="col-lg-6"></div>
        </div>
      </Fragment>
    );
  }
}

export default Stock;
