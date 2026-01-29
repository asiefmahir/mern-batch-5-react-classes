import { createBrowserRouter } from "react-router";
import RootLayout from "../pages/RootLayout";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import SignupForm from "../pages/Signup";
import Login from "../pages/Login";
import AddProduct from "../pages/AddProduct";
import PrivateAdminRoute from "../components/PrivateAdminRoute";
import PrivateLoggedInRoute from "../components/PrivateLoggedInRoute";

export const rootRouter = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{ path: "/", index: true, element: <Shop /> },
			{
				path: "/cart",
				element: (
					<PrivateLoggedInRoute>
						<Cart />
					</PrivateLoggedInRoute>
				),
			},
			{ path: "/signup", element: <SignupForm /> },
			{ path: "/login", element: <Login /> },
			{
				path: "/add-product",
				element: (
					<PrivateAdminRoute>
						<AddProduct />
					</PrivateAdminRoute>
				),
			},
		],
	},
]);
