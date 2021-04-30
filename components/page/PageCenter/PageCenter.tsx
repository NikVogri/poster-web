import React from "react";
import Banner from "../Banner/Banner";
import Notebook from "../Notebook/Notebook";

import styles from "./PageCenter.module.scss";

export const PageCenter: React.FC = () => {
	return (
		<main className={`${styles.page__center} card`}>
			<Banner />
			<Notebook />
		</main>
	);
};

export default PageCenter;
