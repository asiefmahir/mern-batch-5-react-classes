"use server";

//ssg -> isr -> time based isr
// on demand isr -> action based -> event based
import { updateTag } from "next/cache";
import { getBaseUrl } from "../utils/api";

// server action
export const addProduct = async (product) => {
	const baseUrl = getBaseUrl();
	await fetch(`${baseUrl}/api/product`, {
		method: "POST",
		body: JSON.stringify(product),
		headers: {
			"Content-type": "application/json",
		},
	});
	updateTag("products");
};
