import React from "react";
import Link from "next/link";

const Nav = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/about">About</Link>
				</li>
				<li>
					<Link href="/add-product">Add product</Link>
				</li>
				<li>
					<Link href="/admin-products">Admin products</Link>
				</li>
				<li>
					<Link href="/post-list">PostList</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
