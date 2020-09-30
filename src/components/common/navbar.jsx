import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">
          People Health Pharmacy
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/products">
              Products
            </NavLink>
            <NavLink className="nav-item nav-link" to="/stock">
              Stock
            </NavLink>
            <NavLink className="nav-item nav-link" to="/salesreport">
              Sales Report
            </NavLink>
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
