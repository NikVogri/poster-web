import React, { useEffect } from "react";
import Portal from "../../Portal/Portal";

import styles from "./BaseModal.module.scss";

import { createPortal } from "react-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
interface BaseModalInterface {
	children: any;
	open: boolean;
	toggleOpen: (status: boolean) => void;
	footer?: JSX.Element;
	header?: JSX.Element;
	loading?: boolean;
}

const BaseModal: React.FC<BaseModalInterface> = ({
	children,
	open,
	header,
	footer,
	loading = false,
}) => {
	if (!open) return <></>;

	return createPortal(
		<dialog
			open={open}
			className={`${styles.base__modal} ${
				open ? styles.open : styles.closed
			} ${loading ? styles.loading : ""}`}
		>
			{loading && (
				<LoadingSpinner size="lg" className={styles.modal__spinner} />
			)}
			{header && <div className={styles.modal__header}>{header}</div>}
			<div className={styles.modal__content}>{children}</div>
			{footer && <div className={styles.modal__footer}>{footer}</div>}
		</dialog>,
		document.getElementById("modal")
	);
};

export default BaseModal;
