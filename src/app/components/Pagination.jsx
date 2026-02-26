"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

//ssr -> comparatively slow
const Pagination = ({ totalPages, pathname }) => {
	const params = useSearchParams();
	const router = useRouter();

	const createQueryString = (paramName, value) => {
		let newParams = new URLSearchParams(params.toString());
		newParams.set(paramName, value);

		const queryString = newParams.toString();

		const newUrl = `${pathname}?${queryString}`;
		console.log(newUrl);

		router.push(newUrl);

		// "?page=2"
	};

	// 3 // length = 3
	return (
		<div className="text-center">
			<div>
				<nav>
					<ul className="flex justify-center">
						{Array.from({ length: totalPages }, (_, index) => {
							const page = index + 1;

							return (
								<li
									style={{
										marginRight: "10px",
										padding: "5px",
									}}
									key={page}
									className="mr-2.5 gap-1 border-blue-300 p-1.25 bg-[aqua]"
								>
									<button
										onClick={() =>
											createQueryString("page", page)
										}
									>
										{page}
									</button>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Pagination;
