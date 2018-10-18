import React, { Component } from "react"
import "./styles/login.css"

class Signup extends Component {
	state = {
		name: "",
		pass: ""
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleToggleForm = () => {
		this.props.history.push("/login")
	}

	handleSubmit = (e) => {
		e.preventDefault()
	}

	render() {
		const { name, pass } = this.state

		return (
			<div className="form">
				<form onSubmit={this.handleSubmit}>
					<input type="file" placeholder="Profile picture" />
					<input
						name="name"
						value={name}
						type="text"
						placeholder="Username"
						onChange={this.handleChange}
					/>
					<input
						name="pass"
						value={pass}
						type="password"
						placeholder="Password"
						onChange={this.handleChange}
					/>
					<button>sign up</button>
					<p className="message">
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

export default Signup
