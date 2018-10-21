import axios from "axios"

export const loadRooms = (userId) => {
	return (dispatch) => {
		axios
			.post("/loadrooms", { userId })
			.then(({ rooms }) => {
				dispatch({
					type: "LOAD_ROOMS",
					rooms
				})
			})
			.catch((error) =>
				dispatch({
					type: "ADD_ERROR",
					error
				})
			)
	}
}
