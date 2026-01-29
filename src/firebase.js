// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCwLEcHfcsx4dDy7VYqjVzv7vPzfaCa6Do",
	authDomain: "react-simple-project-36f8f.firebaseapp.com",
	projectId: "react-simple-project-36f8f",
	storageBucket: "react-simple-project-36f8f.firebasestorage.app",
	messagingSenderId: "156134273705",
	appId: "1:156134273705:web:aac1f468f053b47e862fb8",
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
