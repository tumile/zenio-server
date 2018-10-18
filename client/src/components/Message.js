import "./styles/message.css"
import React from "react"

export default ({ fromMe }) => {
	return (
		<div
			className="message-wrap"
			style={{
				alignItems: fromMe ? "flex-end" : "flex-start"
			}}>
			<p className={fromMe ? "my-name" : "other-name"}>Tuan</p>
			<div className={fromMe ? "message my-message" : "message other-message"}>
				Hi Vincent, how are you? How is the project coming along?
			</div>
		</div>
	)
}
