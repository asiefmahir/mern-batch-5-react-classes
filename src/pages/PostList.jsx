import { useState, useEffect } from "react";
import { Link } from "react-router";

const PostList = () => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const getAllPosts = async () => {
			const res = await fetch(
				`https://jsonplaceholder.typicode.com/posts?_limit=5`,
			);

			const data = await res.json();
			setPosts(data);
		};

		getAllPosts();
	}, []);
	return (
		<div>
			<h2>All Posts</h2>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<Link to={`/posts/${post.id}`}>{post.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PostList;
