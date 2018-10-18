export default (state = {}, action) => {
	switch (action.type) {
		case "SET_CURRENT_CHAT":
			return {
				isChatting: !!action.roomId.length,
				roomId: action.roomId
			}
		default:
			return state
	}
}
