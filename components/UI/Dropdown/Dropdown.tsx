import React, { useEffect } from "react";

import styles from "./Dropdown.module.scss";

export const DropdownButton = ({ children, toggleDropdown, show }) => {
	return (
		<button type="button" onClick={() => toggleDropdown(!show)}>
			{children}
		</button>
	);
};

export const DropdownList = ({ children, show, toggleDropdown }) => {
	const handleKeyboardPress = (event) => {
		if (event.key === "Escape") toggleDropdown(false);
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyboardPress, false);
		return () => {
			document.removeEventListener("keydown", handleKeyboardPress, false);
		};
	}, []);

	return (
		<div
			className={`${styles.dropdown} ${show ? styles.show : styles.hide}`}
		>
			{children}
		</div>
	);
};
