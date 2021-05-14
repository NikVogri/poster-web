import React from "react";
import BaseModal from "../../UI/BaseModal/BaseModal";

import styles from "./ConfirmationPrompt.module.scss";

interface ConfirmationPromptProps {
	open: boolean;
	toggleOpen: (status: boolean) => void;
	onConfirmation: () => void;
	onDecline: () => void;
	warning: string;
}

const ConfirmationPrompt: React.FC<ConfirmationPromptProps> = ({
	open,
	toggleOpen,
	onConfirmation,
	onDecline,
	warning,
}) => {
	return (
		<BaseModal open={open} toggleOpen={toggleOpen}>
			<div className={styles.confirmation__prompt}>
				<p>{warning}</p>
				<button
					onClick={() => onConfirmation()}
					className={styles.confirm}
				>
					Confirm
				</button>
				<button onClick={() => onDecline()} className={styles.cancel}>
					Cancel
				</button>
			</div>
		</BaseModal>
	);
};

export default ConfirmationPrompt;
