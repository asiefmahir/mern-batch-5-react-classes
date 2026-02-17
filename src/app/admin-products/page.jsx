/* eslint-disable @next/next/no-img-element */
const AdminProductList = async () => {
	const res = await fetch(`http://localhost:3000/api/product`, {
		next: { tags: ["products"] },
	});
	const { success, products } = await res.json();
	console.log("I am being rendered");

	// backend -> microservice
	// daraz -> order, inventory, crm, vendor-management // microservice
	// api -> event broker -> kafka, rabbitmq, bullmq

	// next js fullstack

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
						<tr key={prod._id}>
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
							{/* <td style={{ padding: 8 }}>
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
							</td> */}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AdminProductList;
