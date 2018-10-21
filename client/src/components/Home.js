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
		const { isAuthenticated, user, loadRooms } = this.props
		if (isAuthenticated) {
			const { userId } = user
			loadRooms(userId).catch((error) => console.log(error))
		}
	}

	render() {
		const { isChatting, roomId, rooms } = this.props
		return (
			<main className="main">
				<aside className="people">
					{rooms.map(({ roomId }, i) => (
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

const mapStateToProps = ({
	currentRoom: { isChatting, roomId },
	currentUser: { isAuthenticated, user },
	rooms
}) => ({
	isChatting,
	roomId,
	isAuthenticated,
	user,
	rooms
})

export default connect(
	mapStateToProps,
	{ loadRooms }
)(Home)
