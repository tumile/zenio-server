export default (state = {}, action) => {
	switch (action.type) {
		case "SET_CURRENT_ROOM":
			return {
				isChatting: !!action.roomId.length,
				roomId: action.roomId
			}
		default:
			return state
	}
}
