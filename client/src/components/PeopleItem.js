import "./styles/peopleitem.css"
import React from "react"

export default ({ roomId, name, status, setCurrentChat }) => {
	return (
		<div className="peopleitem" onClick={setCurrentChat(roomId)}>
			<img
				className="avatar"
				src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
			/>
			<div className="info">
				<h4>{name}</h4>
				<p>online</p>
			</div>
		</div>
	)
}
