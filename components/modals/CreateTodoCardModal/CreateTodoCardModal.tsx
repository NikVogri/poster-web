import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import BaseModal from "../../UI/BaseModal/BaseModal";
import LoadingButton from "../../UI/LoadingButton/LoadingButton";

import { v4 as uuid } from "uuid";

import styles from "./CreateTodoCardModal.module.scss";

interface CreateTodoCardModalProps {
	openModal: boolean;
	setOpenModal: (open: boolean) => void;
}

interface Todo {
	id: string;
	text: string;
}

const CreateTodoCardModal: React.FC<CreateTodoCardModalProps> = ({
	openModal,
	setOpenModal,
}) => {
	const [tasks, setTasks] = useState<Todo[]>([]);
	const [titleInput, setTitleInput] = useState("");
	const [taskInput, setTaskInput] = useState("");
	const [loading, setLoading] = useState(false);

	const handleAddTask = (e: FormEvent) => {
		e.preventDefault();

		const task = {
			id: uuid(),
			text: taskInput,
		};

		setTasks((oldTasks: Todo[]) => [...oldTasks, task]);
		setTaskInput("");
	};

	return (
		<BaseModal
			open={openModal}
			toggleOpen={setOpenModal}
			footer={
				<>
					<LoadingButton
						isLoading={loading}
						className={styles.confirm__button}
					>
						Create
					</LoadingButton>
					<button
						className={styles.cancel__button}
						onClick={() => setOpenModal(false)}
					>
						Close
					</button>
				</>
			}
			header={<h3>Create a new todo block</h3>}
		>
			<div className={styles.create__todo}>
				<div className={styles.form__group}>
					<label>Title</label>
					<input
						type="text"
						className={styles.form__control}
						value={titleInput}
						onChange={(e) => setTitleInput(e.target.value)}
					/>
				</div>
			</div>
		</BaseModal>
	);
};

export default CreateTodoCardModal;
