import React from "react"

const Landing = ({ history }) => {
	return (
		<div>
			Welcome to Zenio
			<button onClick={history.push("/home")}>Get started</button>
		</div>
	)
}

export default Landing
