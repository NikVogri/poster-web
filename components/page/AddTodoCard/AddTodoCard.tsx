import React, { useState } from "react";
import { Todo } from "../../../interfaces/todo";
import CreateTodoCardModal from "../../modals/CreateTodoCardModal/CreateTodoCardModal";

import styles from "./AddTodoCard.module.scss";

interface AddTodoCardProps {
	todoBlockAdded: (todo: Todo) => void;
}

const AddTodoCard: React.FC<AddTodoCardProps> = ({ todoBlockAdded }) => {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<button
				className={styles.todo__card}
				title="Add a new todo list"
				onClick={() => setModalOpen(true)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					viewBox="0 0 448 512"
				>
					<g>
						<path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
					</g>
				</svg>
			</button>
			{modalOpen && (
				<CreateTodoCardModal
					openModal={modalOpen}
					setOpenModal={setModalOpen}
					todoBlockAdded={todoBlockAdded as any}
				/>
			)}
		</>
	);
};

export default AddTodoCard;
