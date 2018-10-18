export default (state = [], action) => {
	switch (action.type) {
		case "ADD_ERROR":
			return [...state, action.error]
		case "REMOVE_ERROR":
			return []
		default:
			return state
	}
}
