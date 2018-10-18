import "./styles/chat.css"
import React, { Component } from "react"
import { connect } from "react-redux"
import SocketIO from "socket.io-client"
import Message from "./Message"

const token = localStorage.getItem("token")

class Chat extends Component {
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
		let flag = false
		return (
			<div className="chat">
				<div className="chat-header">
					<img
						className="avatar"
						src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
					/>
					<div>
						<div className="chat-with">Chat with Vincent Porter</div>
						<div className="chat-num-messages">already 1 902 messages</div>
					</div>
				</div>
				<div className="chat-history">
					{[...Array(10)].map((e, i) => {
						flag = !flag
						return <Message key={i} fromMe={flag} />
					})}
				</div>
				<div class="chat-message">
					<textarea placeholder="Type your message" rows="3" />
					<button>Send</button>
				</div>
			</div>
		)
	}
}

export default connect(({ messages }) => ({ messages }))(Chat)
