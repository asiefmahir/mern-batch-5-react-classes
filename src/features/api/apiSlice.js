import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

// apiSlice.injectEndpoints()

// apiSlice.reducer

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fakeBaseQuery(),
	tagTypes: ["products", "categories"],
	endpoints: () => ({}),
});

// export const {
// 	useGetAllProductsQuery,
// 	useAddProductMutation,
// 	useGetCategoriesQuery,
// 	useGetProductsByCategoryQuery,
// 	useUpdateProductMutation,
// } = apiSlice;
