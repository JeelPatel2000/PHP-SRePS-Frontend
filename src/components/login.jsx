import React, {Component} from "react";
import "../styles/login.css";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import Input from "./common/input";

const __USERNAME = "admin";
const __PASSWORD = "admin";

class Login extends Component {
	state = {
		account: {
			username: "",
			password: "",
		},
		errors: {},
	};

	validate = () => {
		const errors = {};
		const {account} = this.state;
		if (account.username.trim() === "")
			errors.username = "Please enter Username";
		if (account.password.trim() === "")
			errors.password = "Please enter password";

		return Object.keys(errors).length === 0 ? null : errors;
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate();
		this.setState({errors: errors || {}});
		if (errors) return;

		const {username, password} = this.state.account;
		if (username == "admin" && password == "admin") {
			let {setLogin} = this.props;
			console.log("Logged IN!");
			localStorage.setItem("isloggedin", true);
			setLogin(true);
		} else {
			// display error
			console.log(username, password);
			console.log("Wrong credentials!");
		}
		// console.log("submitted");
	};
	handleChange = ({currentTarget: input}) => {
		const account = {...this.state.account};
		account[input.name] = input.value;
		this.setState({account});
	};

	render() {
		// const renderErrorMessage = () => {
		//   console.log("reached here");
		//   const { errors } = this.state;
		//   if (this.state.errors.password) {
		//     return window.alert(errors.password);
		//     // <div className="alert alert-danger">{errors.password}</div>;
		//   }
		// };
		const {account, errors} = this.state;
		return (
			<div className="background">
				<div className="login-container">
					<h2> User Login </h2>

					<form onSubmit={this.handleSubmit}>
						<div className="username">
							<span>
								<PersonIcon />
							</span>
							<Input
								name="username"
								value={account.username}
								onChange={this.handleChange}
								type="text"
								error={errors.username}
								placeholder="username"
							/>
						</div>
						{errors.username && <div>{errors.username}</div>}
						<div className="password">
							<span>
								<LockIcon />
							</span>
							<Input
								placeholder="password"
								name="password"
								value={account.password}
								onChange={this.handleChange}
								type="password"
								error={errors.password}
							/>
							{errors.password && <div>{errors.password}</div>}
						</div>
						<button className="loginButton">Login</button>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
