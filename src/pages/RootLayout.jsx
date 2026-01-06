import Nav from "../components/Nav";
import { Outlet } from "react-router";
import About from "./About";

const RootLayout = () => {
	return (
		<>
			<div id="sidebar">
				<Nav />
			</div>
			<div id="detail">
				<Outlet />
				{/* <About /> */}
				{/* <Home /> */}
			</div>
		</>
	);
};

// function add(a, b) {
// 	return a + b;
// }

// add(10, 20);
// add(30, 50);

export default RootLayout;
