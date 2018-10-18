export default (state = [], action) => {
	switch (action.type) {
		case "LOAD_ROOMS":
			return action.rooms
		case "ADD_ROOM":
			return [...state, action.room]
		default:
			return state
	}
}
