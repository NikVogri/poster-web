import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../../context/PageContext";
import useApi from "../../hooks/useApi";
import TodoCard from "../TodoCard/TodoCard";
import AddTodoCard from "../AddTodoCard/AddTodoCard";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";

import styles from "./Todo.module.scss";
import { Todo as TodoInterface } from "../../../interfaces/todo";

const Todo: React.FC = () => {
	const { page } = useContext(PageContext);
	const [todoBlocks, setTodoBlocks] = useState<TodoInterface[]>([]);
	const { api, loading } = useApi();

	useEffect(() => {
		getTodoBlocks();
	}, []);

	const getTodoBlocks = async () => {
		const res = await api(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/${page.id}/todos`,
			"get",
			true
		);

		setTodoBlocks(res);
	};

	const handleAddTodoBlock = (todo: TodoInterface) => {
		setTodoBlocks((oldTodoBlocks: TodoInterface[]) => [
			todo,
			...oldTodoBlocks,
		]);
	};

	return (
		<>
			{loading ? (
				<div className={styles.todo__loading}>
					<LoadingSpinner size="md" />
				</div>
			) : (
				<div className={styles.todo__container}>
					{todoBlocks.map((todoBlock) => (
						<TodoCard key={todoBlock.id} todoBlock={todoBlock} />
					))}
					<AddTodoCard todoBlockAdded={handleAddTodoBlock} />
				</div>
			)}
		</>
	);
};

export default Todo;
