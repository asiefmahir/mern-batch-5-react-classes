import { useState, useEffect, useRef } from "react";

const App = () => {
	console.log("i am being rerendered");

	const [todoList, setTodoList] = useState([]);
	const [currentFilter, setCurrentFilter] = useState("all");
	const inputRef = useRef(null);
	// {current: null}
	// inputRef.current.focus();

	// const intervalId = setInterval(() => {});
	// console.log(ref);

	const getAllTodos = async () => {
		const API = `http://localhost:4000/todo`;
		let url = API;

		if (currentFilter === "active") {
			url += `?isCompleted=false`;
			// url = `http://localhost:4000/todo?isCompleted=false`;
		} else if (currentFilter === "completed") {
			url += `?isCompleted=true`;
			// url = `http://localhost:4000/todo?isCompleted=true`
		}

		const res = await fetch(url);
		const data = await res.json();
		console.log(data, "data");
		setTodoList(data);
	};
	useEffect(() => {
		console.log(inputRef, "ref");
		inputRef.current.focus();
		// eslint-disable-next-line react-hooks/set-state-in-effect
		getAllTodos();
	}, [currentFilter]);

	const submitHandler = async (e) => {
		const todoTitle = inputRef.current.value;
		e.preventDefault();
		if (!todoTitle.trim())
			return alert(`Please provide a valid todo title`);

		const newTodo = {
			title: todoTitle,
			isCompleted: false,
		};

		await fetch(`http://localhost:4000/todo`, {
			method: "POST",
			body: JSON.stringify(newTodo),
			headers: {
				"Content-type": "application/json",
			},
		});

		// Refetch
		getAllTodos();
		// setTodoTitle("");

		// refetch

		// setTodoList([...todoList, newTodo]);
	};

	const toggleIsCompleted = async (todo) => {
		// update / delete
		await fetch(`http://localhost:4000/todo/${todo.id}`, {
			method: "PATCH",
			body: JSON.stringify({ isCompleted: !todo.isCompleted }),
			headers: {
				"Content-type": "application/json",
			},
		});
		// refetch
		getAllTodos();
	};

	const removeHandler = async (todoId) => {
		// delete
		await fetch(`http://localhost:4000/todo/${todoId}`, {
			method: "DELETE",
		});
		// refetch
		getAllTodos();
	};
	// 'all' || 'completed' || 'active'
	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
			<h2 className="text-2xl font-semibold text-center mb-6">
				Connecting APIS with our components
			</h2>
			<form onSubmit={submitHandler} className="flex gap-2 mb-4">
				<input
					ref={inputRef}
					type="text"
					// value={todoTitle}
					// onChange={(e) => setTodoTitle(e.target.value)}
					placeholder="Enter Todo Title..."
					className="flex-1 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
				/>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
				>
					Create Todo
				</button>
			</form>
			<select
				className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				value={currentFilter}
				onChange={(e) => setCurrentFilter(e.target.value)}
			>
				<option value="all">All</option>
				<option value="completed">Completed</option>
				<option value="active">Active</option>
			</select>

			<ul className="space-y-2">
				{todoList.map((todo) => (
					<li
						key={todo.id}
						className="flex items-center justify-between p-3 border rounded-md"
					>
						<div>
							<input
								type="checkbox"
								checked={todo.isCompleted}
								onChange={() => toggleIsCompleted(todo)}
								className="h-4 w-4"
							/>
							<span
								className={`${
									todo.isCompleted
										? "line-through text-gray-400"
										: "text-gray-800"
								}`}
							>
								{todo.title}
							</span>
							<button className="text-sm text-red-600 hover:text-red-800">
								Edit
							</button>
							<button
								className="text-sm text-red-600 hover:text-red-800"
								onClick={() => removeHandler(todo.id)}
							>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
