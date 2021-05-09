import React from "react";
import { TodoItem } from "../../../interfaces/todo";

import styles from "./TodoListItem.module.scss";

interface TodoListItemProps {
	todoItem: TodoItem;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todoItem }) => {
	return (
		<li className={styles.todo__card}>
			<button
				className={styles.todo__content}
				title={`Mark as ${
					todoItem.completed ? "uncomplete" : "complete"
				}`}
			>
				<svg
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					data-icon="check"
					className={`svg-inline--fa fa-check fa-w-16 ${
						styles.checkmark
					} ${todoItem.completed ? styles.active : ""}`}
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
				</svg>
				<span>{todoItem.text}</span>
			</button>

			<button title="Remove" className={styles.todo__remove}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="26"
					height="26"
					viewBox="0 0 18 18"
				>
					<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
				</svg>
			</button>
		</li>
	);
};

export default TodoListItem;
