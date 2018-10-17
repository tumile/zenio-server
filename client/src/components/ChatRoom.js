import React, { Component } from "react"
import { connect } from "react-redux"
import { addNewMess } from "../redux/actions/messages"
import SocketIO from "socket.io-client"
const token = localStorage.getItem("token")

class ChatRoom extends Component {
	constructor() {
		super()
		this.state = {
			input: ""
		}
		this.socket = SocketIO.connect(
			"http://localhost:4000",
			{ query: { token } }
		)
	}

	componentDidMount() {
		// this.socket.on("new_message", data => {
		//   this.props.addNewMess(data);
		// });
		// this.socket.emit("join_room", "123");
		// this.socket.on("join_room", mess => console.log(mess));
		this.socket.on("error", (error) => console.log(error))
	}

	handleChange = (e) => {
		let value = e.target.value
		this.setState((prev) => ({ ...prev, input: value }))
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.socket.emit("new_message", this.state.input)
		this.setState((prev) => ({ ...prev, input: "" }))
	}

	render() {
		return (
			<div className="App">
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						value={this.state.input}
						onChange={this.handleChange}
					/>
					<input type="submit" value="Send" />
				</form>
				{this.props.messages.map((m, i) => (
					<p key={i}>{m}</p>
				))}
			</div>
		)
	}
}

export default connect(
	({ messages }) => ({ messages }),
	{ addNewMess }
)(ChatRoom)
