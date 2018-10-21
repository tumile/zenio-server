export const addError = (message) => ({
	type: "ADD_ERROR",
	error: message
})

export const removeError = () => ({
	type: "REMOVE_ERROR"
})
