import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
	{
		title: { type: String, required: true },
		price: { type: Number, required: true },
		image: { type: String, required: true },
	},
	{ timestamps: true },
);

export default mongoose.models.Product ||
	mongoose.model("Product", productSchema);
