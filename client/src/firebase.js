import firebase from "firebase"

const config = {
	apiKey: "AIzaSyBTuDUBUWYrBsP-T_4PDRN1wC18kAmePAo",
	authDomain: "zenio-51c61.firebaseapp.com",
	databaseURL: "https://zenio-51c61.firebaseio.com",
	projectId: "zenio-51c61",
	storageBucket: "zenio-51c61.appspot.com",
	messagingSenderId: "928072014871"
}

firebase.initializeApp(config)

export default firebase
