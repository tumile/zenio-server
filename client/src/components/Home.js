import "./styles/home.css"
import React, { Component } from "react"
import PeopleItem from "./PeopleItem"
import Placeholder from "./Placeholder"
import Chat from "./Chat"

class Home extends Component {
	render() {
		let chatSelected = true
		return (
			<main className="main">
				<aside className="people">
					{/* <input className="search" type="text" placeholder="search" /> */}
					{[...Array(5)].map((e, i) => (
						<PeopleItem
							key={i}
							name={`Awesome room no.${i + 1}`}
							lastestMess="Hey whats up"
						/>
					))}
				</aside>
				<section className="chat">
					{chatSelected ? <Chat /> : <Placeholder />}
				</section>
			</main>
		)
	}
}

export default Home
