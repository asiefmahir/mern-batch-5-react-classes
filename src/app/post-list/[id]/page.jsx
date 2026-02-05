import React from "react";

// server component
// pre-rendered

// 1.html
// 2.html

// 5

// cron job

const PostDetails = async ({ params }) => {
	const { id } = await params;
	const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
	const post = await res.json();
	return (
		<div>
			<h2>I am postdetails page of {post?.id}</h2>
			<p>Title - {post.title}</p>
		</div>
	);
};

export const generateStaticParams = async () => {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts?_limit=5`,
	);
	const posts = await res.json();
	return posts.map((post) => ({
		id: String(post.id),
	}));

	// [{id: '1'}, {id: '2'}, {}, {}, {}, {}]
};

export default PostDetails;
