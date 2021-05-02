import React, { useEffect, useState } from "react";
import { TodoItem } from "../../../interfaces/todo";

import styles from "./TodoCard.module.scss";

interface TodoCardProps {
	title: string;
	items: TodoItem[];
}

const TodoCard: React.FC<TodoCardProps> = ({ title, items }) => {
	const [completed, setCompleted] = useState(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		setTotal(items.length);
		setCompleted(items.filter((item: TodoItem) => item.completed).length);
	}, []);

	return (
		<div className={styles.todo__card}>
			<div className={styles.card__header}>
				<h3 className={styles.card__title}>{title}</h3>
				<span>
					{completed} / {total}
				</span>
			</div>
      <input placeholder="Add a task" />
			<ul>
				{items.map((item: TodoItem) => (
					<li key={item.id}>{item.text}</li>
				))}
			</ul>
		</div>
	);
};

export default TodoCard;
