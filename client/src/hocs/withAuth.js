import React from "react"
import { connect } from "react-redux"

const withAuth = (Component, authNeeded) => {
	class Wrapper extends Component {
		componentDidMount() {
			if (authNeeded && !this.props.isAuthenticated)
				this.props.history.push("/login")

			if (!authNeeded && this.props.isAuthenticated)
				this.props.history.push("/home")
		}
		render() {
			return <Component {...this.props} />
		}
	}

	return connect(({ currentUser: { isAuthenticated } }) => ({
		isAuthenticated
	}))(Wrapper)
}

export default withAuth
