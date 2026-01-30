import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router";
import {
	useGetAllProductsQuery,
	useGetProductsByCategoryQuery,
} from "../features/api/product";
import { useGetCategoriesQuery } from "../features/api/category";
const Shop = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeSlug = searchParams.get("category");
	// get categories

	const { data: categories = [] } = useGetCategoriesQuery();

	const activeCategory = categories.find((cat) => cat.slug === activeSlug);
	const activeCategoryId = activeCategory?.id;

	const isCategoryActive = Boolean(activeCategoryId);

	// fetch products conditionally

	const { data: allProducts = [], isLoading: allLoading } =
		useGetAllProductsQuery(undefined, {
			skip: isCategoryActive,
		});

	const { data: categoryProducts = [], isLoading: categoryLoading } =
		useGetProductsByCategoryQuery(activeCategoryId, {
			skip: !isCategoryActive,
		});

	const products = isCategoryActive ? categoryProducts : allProducts;
	const isLoading = allLoading || categoryLoading;

	//handlers
	const handleCategoryChange = (category) => {
		setSearchParams({ category: category.slug });
	};

	const clearCategoryFilter = (category) => {
		searchParams.delete("category");
		setSearchParams(searchParams);
	};
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
					<div className="category-filter">
						<button onClick={clearCategoryFilter}>All</button>
						{categories.map((category) => (
							<button
								key={category.id}
								onClick={() => handleCategoryChange(category)}
							>
								{category.name}
							</button>
						))}
					</div>
					{isLoading ? (
						<p>Loading....</p>
					) : (
						products?.length > 0 && (
							<div className="section__content">
								<div className="grid three">
									{products?.map((product) => (
										<ProductCard
											key={product.id}
											product={product}
										/>
									))}
								</div>
							</div>
						)
					)}
				</div>
			</div>
		</>
	);
};

export default Shop;
