import { Outlet } from "react-router";
import Nav from "../components/Nav";

const RootLayout = () => {
	return (
		<>
			<Nav />
			<Outlet />
		</>
	);
};

export default RootLayout;
