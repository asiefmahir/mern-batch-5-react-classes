import { Navigate } from "react-router";
import { useAuth } from "../contexts/Auth";

const PrivateLoggedInRoute = ({ children }) => {
	const { userLoggedIn } = useAuth();
	return userLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateLoggedInRoute;
