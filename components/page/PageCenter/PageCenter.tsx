import React, { useContext } from "react";
import { PageType } from "../../../interfaces/page";
import { PageContext } from "../../context/PageContext";
import TodoProvider from "../../context/TodoContext";
import Banner from "../Banner/Banner";
import Notebook from "../Notebook/Notebook";
import Todo from "../Todo/Todo";

import styles from "./PageCenter.module.scss";

export const PageCenter: React.FC = () => {
	const { page } = useContext(PageContext);

	return (
		<main className={`${styles.page__center} card`}>
			{/* {page?.banner?.active && <Banner />} TODO: uncomment this and remove below line*/}
			<Banner />
			{page.type === PageType.Todo && (
				<TodoProvider>
					<Todo />
				</TodoProvider>
			)}
			{page.type === PageType.Notebook && <Notebook />}
		</main>
	);
};

export default PageCenter;
