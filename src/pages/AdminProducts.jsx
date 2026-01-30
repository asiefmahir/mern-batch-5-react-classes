import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router";

const AdminProductList = () => {
	const navigate = useNavigate();

	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProductsAndCategories = async () => {
			setLoading(true);
			try {
				// Fetch products
				const prodSnap = await getDocs(collection(db, "products"));
				const prodData = prodSnap.docs.map((d) => ({
					id: d.id,
					...d.data(),
				}));
				setProducts(prodData);

				// Fetch categories
				const catSnap = await getDocs(collection(db, "categories"));
				const catData = catSnap.docs.map((d) => ({
					id: d.id,
					...d.data(),
				}));
				setCategories(catData);
			} catch (error) {
				console.error(error);
				alert("Failed to fetch products");
			} finally {
				setLoading(false);
			}
		};

		fetchProductsAndCategories();
	}, []);

	const getCategoryName = (categoryId) => {
		const cat = categories.find((c) => c.id === categoryId);
		return cat ? cat.name : "Uncategorized";
	};

	if (loading) return <p>Loading products...</p>;
	if (!products.length) return <p>No products found</p>;

	return (
		<div className="admin-product-list">
			<h2>All Products</h2>
			<table
				style={{
					width: "100%",
					borderCollapse: "collapse",
					marginTop: 20,
				}}
			>
				<thead>
					<tr>
						<th style={{ borderBottom: "1px solid #ccc" }}>
							Image
						</th>
						<th style={{ borderBottom: "1px solid #ccc" }}>
							Title
						</th>
						<th style={{ borderBottom: "1px solid #ccc" }}>
							Price
						</th>
						<th style={{ borderBottom: "1px solid #ccc" }}>
							Category
						</th>
						<th style={{ borderBottom: "1px solid #ccc" }}>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{products.map((prod) => (
						<tr key={prod.id}>
							<td style={{ padding: 8 }}>
								<img
									src={prod.image}
									alt={prod.title}
									width={80}
									style={{ borderRadius: 4 }}
								/>
							</td>
							<td style={{ padding: 8 }}>{prod.title}</td>
							<td style={{ padding: 8 }}>${prod.price}</td>
							<td style={{ padding: 8 }}>
								{getCategoryName(prod.categoryId)}
							</td>
							<td style={{ padding: 8 }}>
								<button
									onClick={() =>
										navigate(
											`/admin/edit-product/${prod.id}`,
										)
									}
									style={{
										padding: "4px 8px",
										backgroundColor: "#1d4ed8",
										color: "white",
										border: "none",
										borderRadius: 4,
										cursor: "pointer",
									}}
								>
									Edit
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AdminProductList;
