import React, { Component } from "react"
import { connect } from "react-redux"
import { authUser } from "../redux/actions/auth"
import "./styles/login.css"

class Login extends Component {
	state = {
		username: "",
		password: ""
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleToggleForm = () => {
		this.props.history.push("/signup")
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { username, password } = this.state
		this.props
			.authUser("login", { username, password })
			.then(() => this.props.history.push("/home"))
			.catch(() => console.log("Oops error :("))
	}

	render() {
		const { username, password } = this.state

		return (
			<section className="form">
				<form onSubmit={this.handleSubmit}>
					{this.props.errors.map((message, i) => (
						<p key={i} className="error">
							{message}
						</p>
					))}
					<input
						name="username"
						vlaue={username}
						type="text"
						placeholder="Username"
						onChange={this.handleChange}
						autoComplete="off"
					/>
					<input
						name="password"
						value={password}
						type="password"
						placeholder="Password"
						onChange={this.handleChange}
						autoComplete="off"
					/>
					<button>login</button>
					<p className="prompt">
						Not registered?{" "}
						<span className="link" onClick={this.handleToggleForm}>
							<strong>Create an account</strong>
						</span>
					</p>
				</form>
			</section>
		)
	}
}

export default connect(
	({ errors }) => ({ errors }),
	{ authUser }
)(Login)
