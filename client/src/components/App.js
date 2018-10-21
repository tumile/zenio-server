import "./styles/app.css"
import React from "react"
import { Provider } from "react-redux"
import { Route, Switch, BrowserRouter } from "react-router-dom"
import jwtDecode from "jwt-decode"
import store from "../redux"
import Login from "./Login"
import Signup from "./Signup"
import Home from "./Home"
import withAuth from "../hocs/withAuth"
import { setAPIHeader } from "../api"

if (localStorage.token) {
	setAPIHeader(localStorage.token)
	try {
		store.dispatch({
			type: "SET_CURRENT_USER",
			user: jwtDecode(localStorage.token)
		})
	} catch (error) {
		store.dispatch({
			type: "SET_CURRENT_USER",
			user: {}
		})
	}
}

export default () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path="/login" component={withAuth(Login, false)} />
					<Route path="/signup" component={withAuth(Signup, false)} />
					<Route path="/home" component={withAuth(Home, true)} />
				</Switch>
			</BrowserRouter>
		</Provider>
	)
}
