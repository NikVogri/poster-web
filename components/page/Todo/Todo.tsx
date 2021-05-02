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

	const temp = [
		{
			title: "My firs ttodo list",
			updatedAt: "2021-05-02T12:21:22.172Z",
			completed: false,
			createdAt: "2021-05-02T12:21:22.150Z",
			id: "b5ea88d0-9828-4ff4-afce-3b098757fad4",
			items: [
				{
					completed: false,
					createdAt: "2021-05-02T12:55:16.371Z",
					id: "fake-id-here",
					text: "cook chicken for guests",
					updatedAt: "2021-05-02T12:55:16.371Z",
				},
			],
		},
		{
			title: "My second todo list",
			updatedAt: "2021-05-02T12:21:22.172Z",
			completed: false,
			createdAt: "2021-05-02T12:21:22.150Z",
			id: "b5ea88d0-9828-4ff4-afce-3b098757fad4",
			items: [
				{
					completed: false,
					createdAt: "2021-05-02T12:55:16.371Z",
					id: "fake-id-here",
					text: "cook chicken for guests",
					updatedAt: "2021-05-02T12:55:16.371Z",
				},
			],
		},
		{
			title: "My third",
			updatedAt: "2021-05-02T12:21:22.172Z",
			completed: false,
			createdAt: "2021-05-02T12:21:22.150Z",
			id: "b5ea88d0-9828-4ff4-afce-3b098757fad4",
			items: [
				{
					completed: false,
					createdAt: "2021-05-02T12:55:16.371Z",
					id: "fake-id-here",
					text: "cook chicken for guests",
					updatedAt: "2021-05-02T12:55:16.371Z",
				},
			],
		},
		{
			title: "My third",
			updatedAt: "2021-05-02T12:21:22.172Z",
			completed: false,
			createdAt: "2021-05-02T12:21:22.150Z",
			id: "b5ea88d0-9828-4ff4-afce-3b098757fad4",
			items: [
				{
					completed: false,
					createdAt: "2021-05-02T12:55:16.371Z",
					id: "fake-id-here",
					text: "cook chicken for guests",
					updatedAt: "2021-05-02T12:55:16.371Z",
				},
			],
		},
		{
			title: "My third something wsomewher somebody is not good",
			updatedAt: "2021-05-02T12:21:22.172Z",
			completed: false,
			createdAt: "2021-05-02T12:21:22.150Z",
			id: "b5ea88d0-9828-4ff4-afce-3b098757fad4",
			items: [
				{
					completed: false,
					createdAt: "2021-05-02T12:55:16.371Z",
					id: "fake-id-here",
					text: "cook chicken for guests",
					updatedAt: "2021-05-02T12:55:16.371Z",
				},
			],
		},
	];

	useEffect(() => {
		// getTodoBlocks();
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
					{temp.map((todoBlock) => (
						<TodoCard
							key={todoBlock.id}
							items={todoBlock.items}
							title={todoBlock.title}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default Todo;
