import React, { Component, Fragment } from "react";
import SalesReportTable from "./salesreporttable";

class SalesReport extends Component {

  render() {
  
    return <Fragment> 
      <h1>Sales Report</h1>
      <div className="row">
        <SalesReportTable salesRecords={this.props.salesRecords}/>
      </div>
    </Fragment>;
  } 
}

export default SalesReport;
