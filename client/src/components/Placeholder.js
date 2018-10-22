import "./styles/placeholder.css"
import React, { Component } from "react"
import { connect } from "react-redux"
import apiCall from "../api"
import PeopleItem from "./PeopleItem"
import { createRoom } from "../redux/actions/rooms"

class Placeholder extends Component {
	state = {
		username: "",
		searching: false,
		results: []
	}

	handleSearch = (e) => {
		const value = e.target.value
		this.setState(
			(prev) => ({ ...prev, username: value, searching: true }),
			() => {
				setTimeout(() => {
					if (this.state.username !== "" && this.state.username === value) {
						apiCall
							.post("/user/find", { username: this.state.username })
							.then(({ data: { users } }) => {
								this.setState((prev) => ({
									...prev,
									searching: false,
									results: users
								}))
							})
							.catch((error) => console.log(error.response.data.error))
					} else {
						this.setState((prev) => ({
							...prev,
							searching: false
						}))
					}
				}, 700)
			}
		)
	}

	render() {
		const { username, results, searching } = this.state
		return (
			<div className="placeholder">
				<input
					type="text"
					className="search"
					placeholder="Search an user"
					value={username}
					onChange={this.handleSearch}
				/>
				{searching ? (
					<h3>Searching</h3>
				) : (
					<h3>Start a chat with your friend!</h3>
				)}
				{results.length > 0 &&
					results.map((user) => (
						<PeopleItem
							key={user._id}
							{...user}
							createRoom={() =>
								this.props.createRoom(this.props.userId, user._id)
							}
						/>
					))}
			</div>
		)
	}
}

export default connect(
	({
		currentUser: {
			user: { userId }
		}
	}) => ({ userId }),
	{ createRoom }
)(Placeholder)
