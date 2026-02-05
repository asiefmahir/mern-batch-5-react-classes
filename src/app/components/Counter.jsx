"use client";
// client component
// not-only client component

// client only component

// pre-rendering vs server component vs client component

import { useState } from "react";

const Counter = () => {
	console.log("I am where??");

	const [counter, setCounter] = useState(100);
	return (
		<div>
			<p>The value of the counter is {counter}</p>
			<button onClick={() => setCounter(counter + 1)}>
				Increase By 1
			</button>
		</div>
	);
};

export default Counter;
