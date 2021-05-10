import React, { useEffect } from "react";
import Portal from "../../Portal/Portal";

import styles from "./BaseModal.module.scss";

import { createPortal } from "react-dom";
interface BaseModalInterface {
	children: any;
	open: boolean;
	toggleOpen: (status: boolean) => void;
	footer?: JSX.Element;
	header?: JSX.Element;
}

const BaseModal: React.FC<BaseModalInterface> = ({
	children,
	open,
	header,
	footer,
}) => {
	if (!open) return <></>;

	return createPortal(
		<dialog
			open={open}
			className={`${styles.base__modal} ${
				open ? styles.open : styles.closed
			}`}
		>
			{header && <div className={styles.modal__header}>{header}</div>}
			<div className={styles.modal__content}>{children}</div>
			{footer && <div className={styles.modal__footer}>{footer}</div>}
		</dialog>,
		document.getElementById("modal")
	);
};

export default BaseModal;
