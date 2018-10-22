import apiCall from "../../api"

export const loadRooms = (userId) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			apiCall
				.post("/user/loadrooms", { userId })
				.then(({ data: { rooms } }) => {
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

export const createRoom = (userId, otherId) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			apiCall
				.post("/user/createroom", { userId, otherId })
				.then(({ data: { room } }) => {
					dispatch({
						type: "ADD_ROOM",
						room
					})
					resolve()
				})
				.catch((error) => {
					console.log(error)

					dispatch({
						type: "ADD_ERROR",
						error: error
					})
					reject()
				})
		})
	}
}
