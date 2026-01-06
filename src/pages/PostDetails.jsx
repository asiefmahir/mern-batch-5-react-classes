import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const PostDetails = () => {
	const { postId } = useParams();

	const [post, setPost] = useState(null);

	useEffect(() => {
		const getSinglePost = async () => {
			const res = await fetch(
				`https://jsonplaceholder.typicode.com/posts/${postId}`,
			);

			const data = await res.json();
			setPost(data);
		};
		getSinglePost();
	}, []);

	return (
		<div>
			<h2>PostDetails of {post?.id}</h2>
			<hr />
			<h3>Post Title - {post?.title}</h3>
			<h4>Post Details - {post?.body}</h4>
		</div>
	);
};

export default PostDetails;
