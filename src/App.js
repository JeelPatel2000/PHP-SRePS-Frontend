import React from "react";
import Navbar from "./components/common/navbar";
import Products from "./components/products/products";
import Stock from "./components/stock/stock";
import SalesReport from "./components/salesreport/salesreport";
import Login from "./components/login";
import NotFound from "./components/notfound";
import Dashboard from "./components/dashboard/dashboard";
import { Switch, Route, Redirect } from "react-router-dom";
import { ProductsContext } from "./providers/productsProvider";
import PredictSales from "./components/predictsales/predictsales";


function App() {
  const [products, setProducts] = React.useState([]);
  const [cart, setCart] = React.useState([]);
  const [salesRecords, setSalesRecords] = React.useState([]);
  const [isLoggedIn, setLogin] = React.useState(localStorage.getItem("isloggedin"));

  //
  React.useEffect(() => {
    fetch("http://localhost:3001/products/list")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  React.useEffect(() => {
    fetch("http://localhost:3001/salesrecord/list")
      .then((res) => res.json())
      .then((data) => setSalesRecords(data))
      .catch((err) => console.error(err));
  }, []);

  const logout = () => {
    localStorage.setItem("isloggedin",false);
    setLogin("false");
  }

  return (
    <div className="App">
      <React.Fragment>
        {isLoggedIn==="false"?<Login isLoggedIn={isLoggedIn} setLogin={setLogin}/>:<>
        <Navbar logout={logout}/>
        <div className="container">
          {/* Passing down products context to all routes */}
          <ProductsContext.Provider value={{ products, setProducts }}>
            <Switch>
              {/* Passing down cart context only to dashboard */}
              <Route path="/dashboard">
                <Dashboard 
                  cart={cart} setCart={setCart} 
                  salesRecords={salesRecords} setSalesRecords={setSalesRecords}
                />
              </Route>
              <Route path="/products" component={Products} />
              <Route path="/stock" component={Stock} />
              <Route path="/salesreport">
                <SalesReport 
                  salesRecords={salesRecords} setSalesRecords={setSalesRecords}
                />
              </Route>
              <Route path="/predictsales">
                <PredictSales 
                  salesRecords={salesRecords}
                />
              </Route>
              <Route path="/notfound" component={NotFound} />
              <Redirect from="/" to="/dashboard" exact/>
              <Redirect to="/notfound" />
            </Switch>
          </ProductsContext.Provider>
        </div>
        </>
        }
     </React.Fragment>
    </div>
  );
}

export default App;
