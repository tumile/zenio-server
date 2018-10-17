import React from "react"
import { Provider } from "react-redux"
import store from "../redux"
import ChatRoom from "./ChatRoom"
import Login from "./Login"

export default () => {
	return (
		<Provider store={store}>
			<Login />
		</Provider>
	)
}
