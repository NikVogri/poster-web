import React, { useEffect, useState } from "react";
import { Todo } from "../../../interfaces/todo";
import BaseModal from "../../UI/BaseModal/BaseModal";
import LoadingButton from "../../UI/LoadingButton/LoadingButton";

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
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setTitle(todoCard.title);
	}, []);

	return (
		<BaseModal
			open={openModal}
			toggleOpen={setOpenModal}
			header={<h3>Edit todo card</h3>}
			footer={
				<>
					<LoadingButton
						isLoading={loading}
						className={styles.confirm__button}
					>
						Save
					</LoadingButton>
					<button
						className={styles.cancel__button}
						onClick={() => setOpenModal(false)}
					>
						Close
					</button>
				</>
			}
		>
			<div className={styles.edit__card}>
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
			</div>
		</BaseModal>
	);
};

export default TodoCardEdit;
