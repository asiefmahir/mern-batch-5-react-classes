import { NextResponse } from "next/server";
import connectDb from "@/app/utils/db";
import Product from "@/app/models/product";

// serverless function
// product get request
// 1000
// per_page = 10
// app.com?page=9
// 981-990
// 980 // skip
// limit

// middleware -> authorization
// server action ->

// app.com?page=9
export async function GET(req) {
	await connectDb();
	const { searchParams } = new URL(req.url);
	// console.log(obj);
	const page = searchParams.get("page") || {};

	console.log(page, "page");

	const pageSize = 2;

	try {
		// const products = await Product.find({}).sort({ createdAt: -1 });
		// return NextResponse.json({
		// 	success: true,
		// 	products,
		// });

		const currentPage = Number(page) || 1;

		// calculating the skip number
		// 4
		// per_page = 2
		// app.com?page=2
		// 3-4
		// 2 // skip
		const skip = (currentPage - 1) * pageSize;
		// (2 - 1) * 2 = 1 * 2 = 2
		const totalProducts = await Product.countDocuments();

		const products = await Product.find({})
			.skip(skip)
			.limit(pageSize)
			.sort({ createdAt: -1 });
		// 15 / 2 = 8

		return NextResponse.json({
			success: true,
			products,
			currentPage,
			totalPages: Math.ceil(totalProducts / pageSize),
		});
	} catch (error) {
		return NextResponse.json({
			success: false,
			err: error.message,
		});
	}
}

// server compo // client compo // isr // ssg

// body =
// 404 -> not found
export async function POST(request) {
	await connectDb();

	const body = await request.json();

	try {
		const newProduct = await Product.create(body);
		return NextResponse.json(newProduct, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: `Failed to Create Product` });
	}
}

// 403 -> Authorization Denied

// Error()
