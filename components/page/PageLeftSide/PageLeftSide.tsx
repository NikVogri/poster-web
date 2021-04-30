import React from "react";
import OtherPages from "../OtherPages/OtherPages";
import styles from "./PageLeftSide.module.scss";

export const PageLeftSide: React.FC = () => {
	return (
		<aside className={styles.left__side}>
			<OtherPages />
		</aside>
	);
};

export default PageLeftSide;
