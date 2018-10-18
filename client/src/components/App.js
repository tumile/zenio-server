import "./styles/app.css"
import React from "react"
import { Provider } from "react-redux"
import { Route, Switch, BrowserRouter } from "react-router-dom"
import axios from "axios"
import jwtDecode from "jwt-decode"
import store from "../redux"
import Login from "./Login"
import Signup from "./Signup"
import Home from "./Home"

export default () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/home" component={Home} />
				</Switch>
			</BrowserRouter>
		</Provider>
	)
}
