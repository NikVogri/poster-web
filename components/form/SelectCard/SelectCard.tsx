import React from "react";

import styles from "./SelectCard.module.scss";

interface SelectCardProps {
	children: any;
	id: any;
	isActive: boolean;
	onSelect: (
		selection: "notebook" | "todo" | boolean,
		type: "page" | "availability"
	) => void;
	type: "page" | "availability";
}

const SelectCard = ({
	children,
	id,
	isActive,
	onSelect,
	type,
}: SelectCardProps): JSX.Element => {
	const handleClick = () => onSelect(id, type);

	return (
		<button
			className={`${styles.select__card} ${
				isActive ? styles.active : ""
			}`}
			type="button"
			onClick={handleClick}
		>
			{children}
		</button>
	);
};

export default SelectCard;
