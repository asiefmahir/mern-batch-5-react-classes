import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		addToCart(state, action) {
			const product = state.find((item) => item.id === action.payload.id);
			product
				? product.quantity++
				: state.push({ ...action.payload, quantity: 1 });
		},

		removeItemFromCart(state, action) {
			// 2
			// state= [{id: 1}, {id: 2}, {id: 3}]
			return state.filter((item) => item.id !== action.payload);
			//                           2 !== 2
		},

		modifyQuantityOfAnItem(state, action) {
			// {id: 2, quantity: 5}
			const productIndex = state.findIndex(
				(item) => item.id === action.payload.id,
			);
			state[productIndex].quantity = action.payload.quantity;
		},

		clearCart() {
			return [];
		},
	},
});

export const {
	addToCart,
	clearCart,
	modifyQuantityOfAnItem,
	removeItemFromCart,
} = cartSlice.actions;
