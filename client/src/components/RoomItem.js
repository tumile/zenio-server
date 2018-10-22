import "./styles/roomitem.css"
import React from "react"

const RoomItem = ({ members, setCurrentRoom }) => {
	return (
		<div className="roomitem" onClick={setCurrentRoom}>
			<img className="avatar" src={members[0].avatar} />
			<div className="info">
				<h4>{members[0].username}</h4>
			</div>
		</div>
	)
}

export default RoomItem
