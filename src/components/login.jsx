import React, { Component } from "react";
import "../styles/login.css";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
class Login extends Component {
  state = {};
  render() {
    return (
      <div className="background">
        <div className="login-container">
          <h2> User Login </h2>

          <form>
            <div className="username">
              <span>
                <PersonIcon />
              </span>
              <input type="text" placeholder="Username" />
            </div>
            <div className="password">
              <span>
                <LockIcon />
              </span>
              <input type="password" placeholder="Password" />
            </div>
          </form>

          <button className="loginButton">Login</button>
        </div>
      </div>
    );
  }
}

export default Login;
