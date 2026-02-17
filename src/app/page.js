import ProductCard from "./components/ProductCard";

// ssg, isr, ssr
const Shop = async () => {
	const res = await fetch(`http://localhost:3000/api/product`, {
		next: { tags: ["products"] },
	});
	const { success, products } = await res.json();
	console.log("I am being rendered");

	return (
		<>
			<div className="page-banner">
				<div className="page-banner__details">
					<div className="page-banner__details__title">
						<h1>Our E-commerce Website</h1>
					</div>
				</div>
			</div>
			<div className="section">
				<div className="container">
					<div className="section__head">
						<div className="product__details__title">
							<h2>All Products</h2>
						</div>
					</div>
					{/* Category Filter */}
					{/* <div className="category-filter">
						<button onClick={clearCategoryFilter}>All</button>
						{categories.map((category) => (
							<button
								key={category.id}
								onClick={() => handleCategoryChange(category)}
							>
								{category.name}
							</button>
						))}
					</div> */}

					<div className="section__content">
						<div className="grid three">
							{products.length > 0 ? (
								products?.map((product) => (
									<ProductCard
										key={product._id}
										product={product}
									/>
								))
							) : (
								<h2>No products found</h2>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Shop;
