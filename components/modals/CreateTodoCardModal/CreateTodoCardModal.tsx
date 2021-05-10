import React, {
	ChangeEvent,
	FormEvent,
	useContext,
	useEffect,
	useState,
} from "react";
import BaseModal from "../../UI/BaseModal/BaseModal";
import LoadingButton from "../../UI/LoadingButton/LoadingButton";

import styles from "./CreateTodoCardModal.module.scss";
import ColorSelect from "../../form/ColorSelect/ColorSelect";
import useApi from "../../hooks/useApi";
import { PageContext } from "../../context/PageContext";

interface CreateTodoCardModalProps {
	openModal: boolean;
	setOpenModal: (open: boolean) => void;
	todoBlockAdded: (todo: Todo) => void;
}

interface Todo {
	id: string;
	text: string;
}

const CreateTodoCardModal: React.FC<CreateTodoCardModalProps> = ({
	openModal,
	setOpenModal,
	todoBlockAdded,
}) => {
	const [titleInput, setTitleInput] = useState("");
	const [headerColor, setHeaderColor] = useState("#fa5e5e");
	const { page } = useContext(PageContext);

	const { api, loading } = useApi();

	const handleCreateTodoList = async () => {
		const res = await api(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/${page.id}/todo/add-todo-block`,
			"post",
			true,
			{
				title: titleInput,
				headerColor: headerColor,
			}
		);

		const newTodoItem: Todo = res.todo;
		todoBlockAdded(newTodoItem);
		setOpenModal(false);
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
						onClick={handleCreateTodoList}
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
				<div className={styles.form__group}>
					<label>Header Color</label>
					<ColorSelect
						color={headerColor}
						defaultColor={"#fa5e5e"}
						onChange={(e) => setHeaderColor(e.target.value)}
					/>
				</div>
			</div>
		</BaseModal>
	);
};

export default CreateTodoCardModal;
