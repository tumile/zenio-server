export default (state = [], action) => {
	switch (action.type) {
		case "LOAD_ROOMS":
			if (!action.rooms || action.rooms.length === 0) return []
			return [...action.rooms]
		case "ADD_ROOM":
			return [...state, action.room]
		default:
			return state
	}
}
