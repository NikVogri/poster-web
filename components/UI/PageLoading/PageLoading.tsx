import React from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import styles from "./PageLoading.module.scss";

interface PageLoadingProps {}

const PageLoading: React.FC<PageLoadingProps> = ({}) => {
	return (
		<div className={styles.page__loading}>
			<LoadingSpinner className={styles.page__spinner} size="xlg" />
		</div>
	);
};

export default PageLoading;
