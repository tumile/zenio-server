import "./styles/home.css"
import React, { Component } from "react"
import { connect } from "react-redux"
import RoomItem from "./RoomItem"
import Placeholder from "./Placeholder"
import Chat from "./Chat"
import { setCurrentRoom } from "../redux/actions/currentRoom"
import { loadRooms } from "../redux/actions/rooms"

class Home extends Component {
	componentDidMount() {
		if (this.props.currentUser.user) {
			const { userId } = this.props.currentUser.user
			loadRooms(userId)
		}
	}

	render() {
		const { isChatting, roomId } = this.props.currentRoom
		return (
			<main className="main">
				<aside className="people">
					{this.props.rooms.map(({ roomId }, i) => (
						<RoomItem
							setCurrentRoom={() => setCurrentRoom(roomId)}
							key={roomId}
							name={`Awesome room no.${i + 1}`}
							lastestMess="Hey whats up"
						/>
					))}
				</aside>
				<section className="chat">
					{isChatting ? <Chat roomId={roomId} /> : <Placeholder />}
				</section>
			</main>
		)
	}
}

const mapStateToProps = ({ currentRoom, currentUser, rooms }) => ({
	currentRoom,
	currentUser,
	rooms
})

export default connect(
	mapStateToProps,
	{ loadRooms }
)(Home)
