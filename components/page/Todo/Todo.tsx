import React, { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import AddTodoCard from "../AddTodoCard/AddTodoCard";
import TodoCard from "../TodoCard/TodoCard";

import { PageContext } from "../../context/PageContext";
import { Todo as TodoInterface } from "../../../interfaces/todo";
import { TodoContext } from "../../context/TodoContext";

import styles from "./Todo.module.scss";

const Todo: React.FC = () => {
	const { todos, fetchTodos, setTodos, loading } = useContext(TodoContext);
	const { page } = useContext(PageContext);

	useEffect(() => {
		(async () => {
			await fetchTodos(page.id);
		})();
	}, []);

	const handleAddTodoBlock = (todo: TodoInterface) => {
		setTodos((oldTodoBlocks: TodoInterface[]) => [todo, ...oldTodoBlocks]);
	};

	return (
		<>
			{loading ? (
				<div className={styles.todo__loading}>
					<LoadingSpinner size="md" />
				</div>
			) : (
				<div className={styles.todo__container}>
					{!loading &&
						todos &&
						todos.map((todoBlock) => (
							<TodoCard
								key={todoBlock.id}
								todoBlock={todoBlock}
							/>
						))}
					<AddTodoCard todoBlockAdded={handleAddTodoBlock} />
				</div>
			)}
		</>
	);
};

export default Todo;
