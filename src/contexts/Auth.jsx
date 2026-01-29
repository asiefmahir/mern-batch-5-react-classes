/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const [role, setRole] = useState(""); // admin / user / editor

	const [loading, setLoading] = useState(true);
	const initializeUser = async (authUser) => {
		if (authUser) {
			setCurrentUser({ ...authUser });
			const docRef = doc(db, "users", authUser.uid);
			const docSnap = await getDoc(docRef);
			const role = docSnap.data().role;
			setRole(role);
			setUserLoggedIn(true);
		} else {
			setCurrentUser(null);
			setUserLoggedIn(false);
			setRole("");
		}
		setLoading(false);
	};

	useEffect(() => {
		const unSubscribeFunction = onAuthStateChanged(auth, initializeUser);

		return unSubscribeFunction;
	}, []);

	const value = {
		currentUser,
		userLoggedIn,
		role,
		loading,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
