import "./App.css";

import { BrowserRouter, Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrdersScreen from "./screens/OrdersScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductsScreen from "./screens/ProductsScreen";
import React from "react";
import ShippingScreen from "./screens/ShippingScreen";
import SigninScreen from "./screens/SigninScreen";
import { logout } from "./actions/userActions";

function App() {
  const userSignin = useSelector(state => state.userSignin);
  let { userInfo } = userSignin;
  userInfo = userInfo ? userInfo.data : {};
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <Link to="/">Shopping Cart</Link>
          </div>
          <div className="header-links">
            {userInfo ? (
              <div>
                {userInfo.role === "user" && (
                  <div>
                    <span> Hello User - {userInfo.name} </span>
                    <Link to="/cart">Cart</Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="button secondary"
                    >
                      Logout
                    </button>
                  </div>
                )}
                {userInfo.role === "shop" && (
                  <div>
                    <div className="dropdown">
                      <a href="#"> Hello Admin - {userInfo.name} </a>
                      <ul className="dropdown-content">
                        <li>
                          <Link to="/products">Products</Link>
                        </li>
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="button secondary"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/">Sign In</Link>
            )}
          </div>
        </header>
        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/home" component={HomeScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/" exact={true} component={SigninScreen} />
          </div>
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
