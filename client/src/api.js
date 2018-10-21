import axios from "axios"

let instance = axios.create({
	baseURL: "http://localhost:4000",
	timeout: 1000
})

export const setAPIHeader = (token) => {
	if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
	else delete axios.defaults.headers.common["Authorization"]
}

export default instance
