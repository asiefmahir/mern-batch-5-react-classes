import Image from "next/image";
import styles from "./page.module.css";

// page size
// less resource download
// faster response

// pre-rendered html pages // !client rendered
// pre-rendering vs client-side rendering
// routable component

// layout -> page.js er jsx/html

// next js internally -> source code

export default function Home() {
	console.log("Where Am I???!!");

	return (
		<div>
			<h1>Hello Next</h1>
			<h2>Some change</h2>
		</div>
	);
}
