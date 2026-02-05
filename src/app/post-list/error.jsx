"use client"; // Error boundaries must be Client Components
// pre-generated html/ pre-rendered
// static page

// route group
import { useEffect } from "react";

export default function Error({ error, reset }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div>
			<h2>Post Page Error. Please try to navigate the other pages</h2>
		</div>
	);
}

// route specific error / global
