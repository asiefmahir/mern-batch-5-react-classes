import React from "react";

const PostListLayout = ({ children }) => {
	return (
		<>
			{children}
			<footer>
				<ul>
					<li>Footer 1</li>
					<li>Footer 2</li>
				</ul>
			</footer>
		</>
	);
};

export default PostListLayout;

{
	/* <PostListLayout>
    <PostList />
</PostListLayout> */
}
