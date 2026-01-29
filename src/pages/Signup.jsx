import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router";

import classes from "./form.module.css";

const SignupForm = () => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	const handleChange = (e) => {
		console.log(e.target.name);

		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await createUserWithEmailAndPassword(
				auth,
				user.email,
				user.password,
			);
			// Todo: we need to create a user in firestore also with the auth db id
			await setDoc(doc(db, "users", auth.currentUser.uid), {
				email: user.email,
				role: "user",
			});
			setIsLoading(false);
			setErrorMessage("");
			navigate("/login");
		} catch (error) {
			setIsLoading(false);
			setErrorMessage(error.message);
		}
	};

	// Error()
	return (
		<main>
			<section className={classes.auth}>
				<h1>Please Register</h1>
				<form onSubmit={submitHandler}>
					<div className={classes.control}>
						<label htmlFor="email">Your Email</label>
						<input
							type="email"
							name="email"
							value={user.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor="password">Your Password</label>
						<input
							type="password"
							name="password"
							value={user.password}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={classes.actions}>
						{!isLoading && <button>Register</button>}
						{isLoading && <p>Creating New User</p>}
						{errorMessage && (
							<p style={{ color: "red" }}>{errorMessage}</p>
						)}
					</div>
				</form>
			</section>
		</main>
	);
};

export default SignupForm;
