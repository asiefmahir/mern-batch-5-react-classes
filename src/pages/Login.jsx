import classes from "./form.module.css";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();
	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await signInWithEmailAndPassword(
				auth,
				user.email,
				user.password,
			);
			if (res.user) {
				setIsLoading(false);
				setErrorMessage("");
				navigate("/");
			}
		} catch (error) {
			setIsLoading(false);
			setErrorMessage(error.message);
		}
	};
	return (
		<section className={classes.auth}>
			<h1>Login</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor="email">Your Email</label>
					<input
						type="email"
						id="email"
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
						id="password"
						name="password"
						value={user.password}
						onChange={handleChange}
						required
					/>
				</div>
				<div className={classes.actions}>
					{!isLoading && <button>Login</button>}
					{isLoading && <p>Sending request...</p>}
					{errorMessage && (
						<h3 style={{ color: "red" }}>{errorMessage}</h3>
					)}
				</div>
			</form>
		</section>
	);
};

export default Login;
