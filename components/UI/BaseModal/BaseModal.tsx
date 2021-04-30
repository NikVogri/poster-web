import React from "react";
import Portal from "../../Portal/Portal";

import styles from "./BaseModal.module.scss";

interface BaseModalInterface {
	children: any;
	open: boolean;
	toggleOpen: (status: boolean) => void;
}

const BaseModal: React.FC<BaseModalInterface> = ({
	children,
	open,
	toggleOpen,
}) => {
	return (
		<Portal>
			<div
				className={`${styles.base__modal} ${
					open ? styles.open : styles.closed
				}`}
			>
				{children}
				<button onClick={() => toggleOpen(false)}>close</button>
			</div>
		</Portal>
	);
};

export default BaseModal;
