import axios from "axios"

export const setAPIHeader = (token) => {
	if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
	else delete axios.defaults.headers.common["Authorization"]
}

export const authUser = (type, data) => {
	return (dispatch) => {
		axios
			.post(type === "login" ? "/login" : "/signup", data)
			.then(({ token, ...user }) => {
				dispatch({
					type: "SET_USER",
					user
				})
				dispatch({ type: "REMOVE_ERROR" })
				setAPIHeader(token)
				localStorage.setItem("token", token)
			})
			.catch((error) => dispatch({ type: "ADD_ERROR", error: error.message }))
	}
}

export const logout = () => {
	return (dispatch) => {
		dispatch({
			type: "SET_USER",
			user: {}
		})
		setAPIHeader(null)
		localStorage.clear()
	}
}
