import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "@/app/store/reducers/cart";
// import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
	reducer: {
		cart: cartSlice.reducer,
		// [apiSlice.reducerPath]: apiSlice.reducer,
	},
	// middleware: (gM) => gM().concat(apiSlice.middleware),
});

// tanstack query
