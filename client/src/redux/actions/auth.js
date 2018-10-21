import apiCall, { setAPIHeader } from "../../api"
import { addError, removeError } from "./errors"

export const setCurrentUser = (user) => ({
	type: "SET_CURRENT_USER",
	user
})

export const authUser = (type, data) => {
	return (dispatch) => {
		dispatch(removeError())
		return new Promise((resolve, reject) => {
			apiCall
				.post(type === "login" ? "/auth/login" : "/auth/signup", data)
				.then(({ data: { token, ...user } }) => {
					dispatch(setCurrentUser(user))
					setAPIHeader(token)
					localStorage.setItem("token", token)
					resolve()
				})
				.catch((error) => {
					dispatch(addError(error.response.data.error.message))
					reject()
				})
		})
	}
}

export const logout = () => {
	return (dispatch) => {
		dispatch(setCurrentUser({}))
		setAPIHeader(null)
		localStorage.clear()
	}
}
