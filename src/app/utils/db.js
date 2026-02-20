// Product, User, Order, Category // Collection // NoSql // Schema

import mongoose from "mongoose";

const getMongoURI = () => {
	if (process.env.NODE_ENV === "development") {
		return (
			process.env.MONGO_DEV_URI ||
			`mongodb://localhost:27017/simple-e-com-db`
		);
	}

	return process.env.MONGODB_URI;
};

const MONGODB_URI = getMongoURI();

if (!MONGODB_URI) {
	throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 5000, // 5s
			socketTimeoutMs: 45000, // 45s
		};

		cached.promise = mongoose
			.connect(MONGODB_URI, opts)
			.then((mongoose) => {
				console.log("Successfully Connected to Mongodb");
				return mongoose;
			});
	}

	try {
		cached.conn = await cached.promise;
	} catch (error) {
		cached.promise = null;
		console.error(`Mongodb COnnection Failed`);
		throw error;
	}

	return cached.conn;
};

export default connectDb;
