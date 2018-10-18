export default (state = {}, action) => {
	switch (action.type) {
		case "SET_USER":
			return {
				isAuthenticated: !!Object.keys(action.user).length,
				user: action.user
			}
		default:
			return state
	}
}
