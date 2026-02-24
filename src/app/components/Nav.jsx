"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

import { useSession } from "next-auth/react";

// middleware -> req -> page, api -> middleware -> response
// add-product
//

const Nav = () => {
	const { data, status } = useSession();
	console.log(data, "data");
	console.log(status, "status");

	return (
		<nav>
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>
				{status !== "authenticated" && (
					<>
						<li>
							<Link href="/register">Register</Link>
						</li>
						<li>
							<Link href="/login">Login</Link>
						</li>
					</>
				)}
				<li>
					<Link href="/about">About</Link>
				</li>
				{data?.user?.role === "admin" && (
					<>
						<li>
							<Link href="/dashboard/admin/add-product">
								Add product
							</Link>
						</li>
						<li>
							<Link href="/dashboard/admin/admin-products">
								Admin products
							</Link>
						</li>
					</>
				)}
				<li>
					<Link href="/post-list">PostList</Link>
				</li>
				{status === "authenticated" && (
					<li>
						<button onClick={() => signOut()}>SignOut</button>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Nav;
