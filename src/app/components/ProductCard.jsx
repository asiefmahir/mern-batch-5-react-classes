/* eslint-disable @next/next/no-img-element */
"use client";

import { useCart } from "../contexts/Cart";

// interactivity -> next

// fresher/ junior/ intern

// sass app () -> builder wp -> builder -> 5%

// google form -> seo
// google classroom ->

function ProductCard({ product }) {
	const { addToCart } = useCart();
	return (
		<div className="ingredient">
			<div className="ingredient__image">
				<figure>
					<img src={product.image} alt={product.title} />
				</figure>
			</div>
			<div className="ingredient__title">
				<h3>{product.title}</h3>
			</div>
			<div className="ingredient__content">
				<p>
					<span>${product.price}</span>
				</p>
			</div>
			<div className="ingredient__btn">
				<button
					onClick={(e) => addToCart(product)}
					className="btn-white"
				>
					ADD TO CART
				</button>
			</div>
		</div>
	);
}

export default ProductCard;
