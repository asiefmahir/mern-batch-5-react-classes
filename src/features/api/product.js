import { apiSlice } from "./apiSlice";
import {
	collection,
	getDocs,
	doc,
	addDoc,
	query,
	where,
	updateDoc,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

export const productApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllProducts: builder.query({
			async queryFn() {
				try {
					const productCollectionRef = collection(db, "products");
					const data = await getDocs(productCollectionRef);
					const filteredData = data.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));
					return { data: filteredData, error: null };
				} catch (_err) {
					return { error: "Failed to fetch Products form db" };
				}
			},
			providesTags: ["products"],
		}),
		updateProduct: builder.mutation({
			async queryFn({ id, updates }) {
				try {
					const ref = doc(db, "products", id);
					await updateDoc(ref, {
						...updates,
						updatedAt: serverTimestamp(),
					});
					return { data: true };
				} catch (error) {
					return { error };
				}
			},
			invalidatesTags: ["products"],
		}),
		getProductsByCategory: builder.query({
			async queryFn(categoryId) {
				try {
					const q = query(
						collection(db, "products"),
						where("categoryId", "==", categoryId),
					);
					const snapshot = await getDocs(q);
					return {
						data: snapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						})),
					};
				} catch (error) {
					return { error };
				}
			},
		}),

		addProduct: builder.mutation({
			queryFn: async (product) => {
				try {
					await addDoc(collection(db, "products"), product);
					return { data: product };
				} catch (error) {
					return { error };
				}
			},
			invalidatesTags: ["products"],
		}),
	}),
});

export const {
	useGetAllProductsQuery,
	useAddProductMutation,
	useGetProductsByCategoryQuery,
	useUpdateProductMutation,
} = productApi;

// getCategories: builder.query({
// 			async queryFn() {
// 				try {
// 					const snapshot = await getDocs(
// 						query(
// 							collection(db, "categories"),
// 							where("isActive", "==", true),
// 						),
// 					);
// 					const categories = snapshot.docs.map((doc) => ({
// 						id: doc.id,
// 						...doc.data(),
// 					}));
// 					return { data: categories };
// 				} catch (error) {
// 					return { error: error };
// 				}
// 			},
// 		}),
