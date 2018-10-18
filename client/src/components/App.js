import React from "react"
import { Provider } from "react-redux"
import { Route, Switch, BrowserRouter } from "react-router-dom"
import axios from "axios"
import jwtDecode from "jwt-decode"
import store from "../redux"
import ChatRoom from "./ChatRoom"
import Login from "./Login"
import Signup from "./Signup"
import "./styles/app.css"

export default () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
				</Switch>
			</BrowserRouter>
		</Provider>
	)
}
