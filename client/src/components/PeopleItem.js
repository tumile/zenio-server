import React from "react"

export default ({ username, avatar, createRoom }) => {
	return (
		<div className="peopleitem" onClick={createRoom}>
			<img className="avatar" src={avatar} alt="avatar" />
			<p>{username}</p>
		</div>
	)
}
