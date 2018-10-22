import React, { Component } from "react"
import { connect } from "react-redux"
import { authUser } from "../redux/actions/auth"
import { removeError, addError } from "../redux/actions/errors"
import firebase from "../firebase"
import "./styles/login.css"

class Signup extends Component {
	state = {
		username: "",
		password: "",
		avatar: ""
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleToggleForm = () => {
		this.props.removeError()
		this.props.history.push("/login")
	}

	handlePhotoUpload = (e) => {
		this.props.removeError()
		let storage = firebase.storage().ref()
		const file = e.target.files[0]
		const type = file.type
		if (!type.includes("image")) {
			e.target.value = ""
			this.props.avatarError()
			return
		}
		const name = +new Date() + "-" + file.name
		storage
			.child(name)
			.put(file, { contentType: file.type })
			.then((snapshot) => snapshot.ref.getDownloadURL())
			.then((url) => {
				this.setState((prev) => ({ ...prev, avatar: url }))
			})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { username, password, avatar } = this.state
		this.props
			.authUser("signup", { username, password, avatar })
			.then(() => this.props.history.push("/home"))
			.catch(() => console.log("Oops error :("))
	}

	render() {
		const { username, password, avatar } = this.state
		const { errors } = this.props
		return (
			<div className="form">
				<form onSubmit={this.handleSubmit}>
					{errors.length > 0 &&
						errors.map((message, i) => (
							<p key={i} className="error">
								{message}
							</p>
						))}
					<input
						style={{
							backgroundImage:
								avatar.length > 0
									? `url(${avatar})`
									: "url(https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png)"
						}}
						className="inputFile"
						type="file"
						placeholder="Profile picture"
						onChange={this.handlePhotoUpload}
					/>
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

function mapDispatchToProps(dispatch) {
	return {
		avatarError: () =>
			dispatch(addError("Don't you want an image as your avatar?")),
		removeError: () => dispatch(removeError()),
		authUser: (type, data) => dispatch(authUser(type, data))
	}
}

export default connect(
	({ errors }) => ({ errors }),
	mapDispatchToProps
)(Signup)
