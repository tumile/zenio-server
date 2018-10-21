import apiCall, { setAPIHeader } from "../../api"

export const authUser = (type, data) => {
	return (dispatch) => {
		dispatch({ type: "REMOVE_ERROR" })
		return new Promise((resolve, reject) => {
			apiCall
				.post(type === "login" ? "/auth/login" : "/auth/signup", data)
				.then(({ data: { token, ...user } }) => {
					console.log(user)
					dispatch({
						type: "SET_CURRENT_USER",
						user
					})
					setAPIHeader(token)
					localStorage.setItem("token", token)
					resolve()
				})
				.catch((error) => {
					dispatch({
						type: "ADD_ERROR",
						error: error.response.data.error.message
					})
					reject()
				})
		})
	}
}

export const logout = () => {
	return (dispatch) => {
		dispatch({
			type: "SET_CURRENT_USER",
			user: {}
		})
		setAPIHeader(null)
		localStorage.clear()
	}
}
