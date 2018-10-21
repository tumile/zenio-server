import { combineReducers, createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import currentUser from "./reducers/currentUser"
import errors from "./reducers/errors"
import rooms from "./reducers/rooms"
import currentRoom from "./reducers/currentRoom"

const rootReducer = combineReducers({
	currentUser,
	errors,
	rooms,
	currentRoom
})

export default createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)
