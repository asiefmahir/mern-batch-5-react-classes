/* eslint-disable @next/next/no-img-element */

"use client";
import { useState } from "react";
import { addProduct } from "@/app/actions/product";

const AddProductForm = () => {
	const [product, setProduct] = useState({
		title: "",
		price: "",
		image: "",
	});

	const handleChange = (e) => {
		setProduct({
			...product,
			[e.target.name]:
				e.target.name === "price"
					? Number(e.target.value)
					: e.target.value,
		});
	};

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		console.log(file, "file");

		const data = new FormData();

		data.append("file", file);
		data.append("cloud_name", "dcdga3gke");
		data.append("upload_preset", "react-batch-5-project");

		const res = await fetch(
			`https://api.cloudinary.com/v1_1/dcdga3gke/image/upload`,
			{
				method: "POST",
				body: data,
			},
		);
		const result = await res.json();
		console.log(result, "result");
		setProduct({ ...product, image: result.secure_url });
	};

	// server action

	const handleSubmit = async (e) => {
		addProduct(product);
		//    await fetch(``)
	};
	return (
		<>
			<form
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
				}}
				onSubmit={handleSubmit}
			>
				<p>Title:</p>
				<input
					value={product.title}
					onChange={handleChange}
					name="title"
					style={{ display: "block", width: "80%" }}
					required
				/>
				<br />
				<p>Price:</p>

				<input
					value={product.price}
					onChange={handleChange}
					name="price"
					style={{ display: "block", width: "80%" }}
					type="number"
					required
				/>
				<br />
				{/* <select
					name="categoryId"
					value={product.categoryId}
					onChange={handleChange}
				>
					{categories.map((cat) => (
						<option key={cat.id} value={cat.id}>
							{cat.name}
						</option>
					))}
				</select> */}

				<p>Image URL:</p>

				<input
					name="image"
					onChange={handleImageChange}
					accept=".jpg, .jpeg, .png"
					style={{ display: "block", width: "80%" }}
					type="file"
					// required
				/>
				<br />
				{product.image && (
					<img
						src={product.image}
						alt=""
						style={{ width: "100px", height: "100px" }}
					/>
				)}
				<input type="submit" />
			</form>
		</>
	);
};

export default AddProductForm;
