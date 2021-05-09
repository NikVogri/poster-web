import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../../context/PageContext";
import useApi from "../../hooks/useApi";
import TodoCard from "../TodoCard/TodoCard";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";

import styles from "./Todo.module.scss";

const Todo: React.FC = () => {
	const { page } = useContext(PageContext);
	const [todoBlocks, setTodoBlocks] = useState([]);
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

	return (
		<>
			{loading ? (
				<div className={styles.todo__loading}>
					<LoadingSpinner size="md" />
				</div>
			) : (
				<div className={styles.todo__container}>
					{todoBlocks.map((todoBlock) => (
						<TodoCard
							key={todoBlock.id}
							items={todoBlock.items}
							title={todoBlock.title}
							id={todoBlock.id}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default Todo;
