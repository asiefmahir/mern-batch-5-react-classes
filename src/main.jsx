import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ourRouter } from "./router/router.jsx";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={ourRouter} />
	</StrictMode>,
);
