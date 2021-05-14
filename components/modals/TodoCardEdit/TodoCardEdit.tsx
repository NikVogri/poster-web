import React, { ChangeEvent, useEffect, useState } from "react";
import { Page } from "../../../interfaces/page";
import { Todo } from "../../../interfaces/todo";
import ColorSelect from "../../form/ColorSelect/ColorSelect";
import useApi from "../../hooks/useApi";
import BaseModal from "../../UI/BaseModal/BaseModal";
import LoadingButton from "../../UI/LoadingButton/LoadingButton";
import ConfirmationPrompt from "../ConfirmationPrompt/ConfirmationPrompt";

import styles from "./TodoCardEdit.module.scss";

interface TodoCardEditProps {
	openModal: boolean;
	setOpenModal: (open: boolean) => void;
	handleCardUpdate: (todoCard?: Todo) => void;
	todoCard: Todo;
	page: Page;
}

const TodoCardEdit: React.FC<TodoCardEditProps> = ({
	openModal,
	setOpenModal,
	handleCardUpdate,
	todoCard,
	page,
}) => {
	const [selectedHeaderColor, setSelectedHeaderColor] = useState(
		todoCard.headerColor
	);
	const [title, setTitle] = useState("");
	const [openPrompt, setOpenPrompt] = useState(false);

	const { api, loading } = useApi();

	useEffect(() => {
		setTitle(todoCard.title);
	}, []);

	const handleUpdate = async () => {
		const res = await api(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/${page.id}/todos/${todoCard.id}`,
			"put",
			true,
			{
				title,
				headerColor: selectedHeaderColor,
			}
		);

		if (res.success) {
			handleCardUpdate(res.todoBlock);
		}

		setOpenModal(false);
	};

	const handleDelete = async () => {
		const res = await api(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/${page.id}/todos/${todoCard.id}`,
			"delete",
			true
		);

		if (res.success) {
			handleCardUpdate(null);
		}

		setOpenModal(false);
	};

	return (
		<>
			<BaseModal
				open={openModal}
				toggleOpen={setOpenModal}
				header={<h3>Edit todo card</h3>}
				footer={
					<>
						<LoadingButton
							isLoading={loading}
							className={styles.confirm__button}
							onClick={handleUpdate}
							disabled={loading}
						>
							Save
						</LoadingButton>
						<button
							className={styles.cancel__button}
							onClick={() => setOpenModal(false)}
							disabled={loading}
						>
							Close
						</button>
					</>
				}
				loading={loading}
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
						<label>Header Color</label>
						<ColorSelect
							onChange={(e) =>
								setSelectedHeaderColor(e.target.value)
							}
							color={selectedHeaderColor}
						/>
					</div>

					<div>
						<label>Delete todo</label>
						<button
							className={styles.todo__delete}
							type="button"
							onClick={() => setOpenPrompt(true)}
						>
							Delete
						</button>
					</div>
				</div>
			</BaseModal>
			<ConfirmationPrompt
				open={openPrompt}
				toggleOpen={setOpenPrompt}
				onConfirmation={handleDelete}
				onDecline={() => setOpenPrompt(false)}
				warning={`Are you sure you want to delete todo "${title}"? `}
			/>
		</>
	);
};

export default TodoCardEdit;
