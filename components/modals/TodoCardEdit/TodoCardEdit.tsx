import React, { useEffect, useState } from "react";
import { Todo } from "../../../interfaces/todo";
import BaseModal from "../../UI/BaseModal/BaseModal";

import styles from "./TodoCardEdit.module.scss";

interface TodoCardEditProps {
	openModal: boolean;
	setOpenModal: (open: boolean) => void;
	todoCard: Todo;
}

const TodoCardEdit: React.FC<TodoCardEditProps> = ({
	openModal,
	setOpenModal,
	todoCard,
}) => {
	const [headerColor, setHeaderColor] = useState("#fff");
	const [title, setTitle] = useState("");

	useEffect(() => {
		setTitle(todoCard.title);
	}, []);

	return (
		<BaseModal open={openModal} toggleOpen={setOpenModal}>
			<div className={styles.edit__card}>
				<h3>Edit todo card</h3>
				<div className={styles.form__group}>
					<label>Title</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className={styles.color__edit}>
					<label>Change header color</label>
					<div className={styles.color__container}>
						<input
							type="color"
							onChange={(e) => setHeaderColor(e.target.value)}
						/>
						<div
							className={styles.color__example}
							style={{ backgroundColor: headerColor }}
						></div>
					</div>
				</div>
				<div>
					<label>Sort items list</label>
				</div>
				<button className={styles.save__button}>Save</button>
			</div>
		</BaseModal>
	);
};

export default TodoCardEdit;
