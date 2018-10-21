import React, { Component } from "react"
import { connect } from "react-redux"
import { authUser } from "../redux/actions/auth"
import "./styles/login.css"

class Signup extends Component {
	state = {
		username: "",
		password: ""
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleToggleForm = () => {
		this.props.history.push("/login")
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { username, password } = this.state
		this.props
			.authUser("signup", { username, password })
			.then(() => this.props.history.push("/home"))
			.catch(() => console.log("Oops error :("))
	}

	render() {
		const { username, password } = this.state

		return (
			<div className="form">
				<form onSubmit={this.handleSubmit}>
					{this.props.errors.map((message, i) => (
						<p key={i} className="error">
							{message}
						</p>
					))}
					<input type="file" placeholder="Profile picture" />
					<input
						name="username"
						value={username}
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
					<button>sign up</button>
					<p className="prompt">
						Already registered?{" "}
						<span className="link" onClick={this.handleToggleForm}>
							<strong>Sign In</strong>
						</span>
					</p>
				</form>
			</div>
		)
	}
}

export default connect(
	({ errors }) => ({ errors }),
	{ authUser }
)(Signup)
