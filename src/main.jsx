import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { rootRouter } from "./router/router.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { AuthProvider } from "./contexts/Auth.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<Provider store={store}>
				<RouterProvider router={rootRouter} />
			</Provider>
		</AuthProvider>
	</StrictMode>,
);
