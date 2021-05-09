import React, { useContext } from "react";
import { PageType } from "../../../interfaces/page";
import { PageContext } from "../../context/PageContext";
import Banner from "../Banner/Banner";
import Notebook from "../Notebook/Notebook";
import Todo from "../Todo/Todo";

import styles from "./PageCenter.module.scss";

export const PageCenter: React.FC = () => {
	const { page } = useContext(PageContext);

	return (
		<main className={`${styles.page__center} card`}>
			{page?.banner?.active && <Banner />}
			{page.type === PageType.Todo && <Todo />}
			{page.type === PageType.Notebook && <Notebook />}
		</main>
	);
};

export default PageCenter;
