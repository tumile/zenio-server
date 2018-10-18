import { combineReducers, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import user from "./reducers/user"
import errors from "./reducers/errors"
import rooms from "./reducers/rooms"

const rootReducer = combineReducers({
	user,
	errors,
	rooms
})

export default createStore(rootReducer, applyMiddleware(thunk))
