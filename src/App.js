import React from "react";
import Navbar from "./components/common/navbar";
import Products from "./components/products";
import Stock from "./components/stock";
import SalesReport from "./components/salesreport";
import Login from "./components/login";
import NotFound from "./components/notfound";
import Dashboard from "./components/dashboard";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/products" component={Products} />
            <Route path="/stock" component={Stock} />
            <Route path="/salesreport" component={SalesReport} />
            <Route path="/notfound" component={NotFound} />
            <Redirect from="/" to="/dashboard" exact />
            <Redirect to="/notfound" />
          </Switch>
        </div>
      </React.Fragment>
    </div>
  );
}

export default App;
