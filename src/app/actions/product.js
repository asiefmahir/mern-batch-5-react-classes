"use server";

//ssg -> isr -> time based isr
// on demand isr -> action based -> event based
import { updateTag } from "next/cache";

// server action
export const addProduct = async (product) => {
	await fetch(`http://localhost:3000/api/product`, {
		method: "POST",
		body: JSON.stringify(product),
		headers: {
			"Content-type": "application/json",
		},
	});
	updateTag("products");
};
