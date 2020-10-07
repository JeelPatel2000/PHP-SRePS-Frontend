import React from "react";
import Navbar from "./components/common/navbar";
import Products from "./components/products/products";
import Stock from "./components/stock";
import SalesReport from "./components/salesreport";
import Login from "./components/login";
import NotFound from "./components/notfound";
import Dashboard from "./components/dashboard";
import { Switch, Route, Redirect } from "react-router-dom";
import { ProductsContext } from "./providers/productsProvider";

function App() {
  const [products, setProducts] = React.useState([]);

  //
  React.useEffect(() => {
    fetch("http://192.168.1.11:3001/products/list")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <React.Fragment>
        <Navbar />
        <div className="container">
          <ProductsContext.Provider value={{ products, setProducts }}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/products" component={Products} />
              <Route path="/stock" component={Stock} />
              <Route path="/salesreport" component={SalesReport} />
              <Route path="/notfound" component={NotFound} />
              <Redirect from="/" to="/dashboard" />
              <Redirect to="/notfound" />
            </Switch>
          </ProductsContext.Provider>
        </div>
      </React.Fragment>
    </div>
  );
}

export default App;
