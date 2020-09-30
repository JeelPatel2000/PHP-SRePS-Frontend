import React, { Component } from "react";

class SalesReport extends Component {
  componentDidUpdate() {
    console.log("Sales");
  }
  render() {
    return <h1>Sales Report</h1>;
  }
}

export default SalesReport;
