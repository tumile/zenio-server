export const setCurrentRoom = (roomId) => {
	return (dispatch) => {
		dispatch({
			type: "SET_CURRENT_ROOM",
			roomId
		})
	}
}
