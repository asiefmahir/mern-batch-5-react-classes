import { apiSlice } from "./apiSlice";
import { getDocs, where, collection, query } from "firebase/firestore";
import { db } from "../../firebase";

export const categoryApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCategories: builder.query({
			async queryFn() {
				try {
					const snapshot = await getDocs(
						query(
							collection(db, "categories"),
							where("isActive", "==", true),
						),
					);
					const categories = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));
					return { data: categories };
				} catch (error) {
					return { error: error };
				}
			},
		}),
	}),
});

export const { useGetCategoriesQuery } = categoryApi;
