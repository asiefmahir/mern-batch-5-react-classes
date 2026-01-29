import { Link } from "react-router";
import { useAuth } from "../contexts/Auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
const Nav = () => {
	const { userLoggedIn, role } = useAuth();
	return (
		<div>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>

				{userLoggedIn && role === "admin" && (
					<li>
						<Link to="/add-product">Add Product</Link>
					</li>
				)}
				{!userLoggedIn && (
					<>
						<li>
							<Link to="/signup">Sign Up</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
					</>
				)}
				{userLoggedIn && (
					<li>
						<Link to="/cart">Cart</Link>
					</li>
				)}
				{userLoggedIn && (
					<li>
						<button onClick={() => signOut(auth)}>Log Out</button>
					</li>
				)}
			</ul>
		</div>
	);
};

export default Nav;
