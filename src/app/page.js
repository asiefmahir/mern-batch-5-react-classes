import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";
import { getBaseUrl } from "./utils/api";

const getProducts = async (searchParams) => {
	const searchQuery = new URLSearchParams({
		page: searchParams.page,
	}).toString();
	console.log(searchQuery, "searchQuery");
	const baseUrl = getBaseUrl();

	const url = `${baseUrl}/api/product?${searchQuery}`;

	const res = await fetch(url);

	if (!res.ok) {
		throw new Error("Failed to Fetch Products");
	}
	const data = await res.json();

	return {
		products: data.products,
		success: data.success,
		currentPage: data.currentPage,
		totalPages: data.totalPages,
	};
};
// ssg, isr, ssr
const Shop = async ({ searchParams }) => {
	const params = await searchParams;
	const { products, success, currentPage, totalPages } =
		await getProducts(params);

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
			<Pagination pathname={"/"} totalPages={totalPages} />
		</>
	);
};

export default Shop;
