import React, { useEffect, useRef, useState } from "react";
import { TodoItem } from "../../../interfaces/todo";
import TodoListItem from "../TodoListItem/TodoListItem";
import TodoCardEdit from "../../modals/TodoCardEdit/TodoCardEdit";

import styles from "./TodoCard.module.scss";

interface TodoCardProps {
	title: string;
	items: TodoItem[];
	id: string;
}

const checkmark = (
	<svg
		aria-hidden="true"
		focusable="false"
		data-prefix="fas"
		data-icon="check"
		className="svg-inline--fa fa-check fa-w-16"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
	>
		<path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
	</svg>
);

const TodoCard: React.FC<TodoCardProps> = ({ title, items, id }) => {
	const [completed, setCompleted] = useState(0);
	const [total, setTotal] = useState(0);
	const [input, setInput] = useState("");
	const [focused, setFocused] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const addInput = useRef(null);

	const handleFocusEvent = (isFocused: boolean) => {
		if (!isFocused) {
			setInput("");
		}

		setFocused(isFocused);
	};

	useEffect(() => {
		setTotal(items.length);
		setCompleted(items.filter((item: TodoItem) => item.completed).length);
	}, []);

	const handleAddTask = (e) => {
		e.preventDefault();
		setInput("");
		console.log("here");
		//TODO: add item to list
	};

	return (
		<>
			<div className={styles.todo__card}>
				<div className={styles.card__top}>
					<button
						title="Edit card"
						onClick={() => setModalOpen(true)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							enableBackground="new 0 0 24 24"
							height="20px"
							viewBox="0 0 24 24"
							width="20px"
							className={styles.card__edit}
						>
							<g>
								<rect fill="none" height="24" width="24" />
							</g>
							<g>
								<g>
									<g>
										<path d="M3,21l3.75,0L17.81,9.94l-3.75-3.75L3,17.25L3,21z M5,18.08l9.06-9.06l0.92,0.92L5.92,19L5,19L5,18.08z" />
									</g>
									<g>
										<path d="M18.37,3.29c-0.39-0.39-1.02-0.39-1.41,0l-1.83,1.83l3.75,3.75l1.83-1.83c0.39-0.39,0.39-1.02,0-1.41L18.37,3.29z" />
									</g>
								</g>
							</g>
						</svg>
					</button>
				</div>
				<div className={styles.card}>
					<div className={styles.card__header}>
						<h3 className={styles.card__title}>{title}</h3>
						<span>
							{completed} / {total}
						</span>
					</div>
					<div className={styles.card__input}>
						<form onSubmit={handleAddTask}>
							<input
								placeholder="Add a task"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								type="text"
								ref={addInput}
								onFocus={() => handleFocusEvent(true)}
								onBlur={() => handleFocusEvent(false)}
							/>
							<i
								className={`${
									input.length > 0 ? styles.valid : ""
								} ${focused ? styles.active : ""}`}
							>
								{checkmark}
							</i>
						</form>
					</div>
					<ul>
						{items.map((item: TodoItem) => (
							<TodoListItem key={item.id} todoItem={item} />
						))}
					</ul>
				</div>
			</div>
			<TodoCardEdit
				openModal={modalOpen}
				setOpenModal={setModalOpen}
				todoCard={{ items, id, title }}
			/>
		</>
	);
};

export default TodoCard;
