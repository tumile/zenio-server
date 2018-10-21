import apiCall from "../../api"

export const loadRooms = (userId) => {
	return (dispatch) => {
		dispatch({ type: "REMOVE_ERROR" })
		return new Promise((resolve, reject) => {
			apiCall
				.post("/user/loadrooms", { userId })
				.then(({ rooms }) => {
					dispatch({
						type: "LOAD_ROOMS",
						rooms
					})
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
