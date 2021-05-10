import React, { ChangeEvent } from "react";

import styles from "./ColorSelect.module.scss";

interface ColorSelectProps {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	color: string;
	defaultColor?: string;
}

const ColorSelect: React.FC<ColorSelectProps> = ({
	onChange,
	color,
	defaultColor,
}) => {
	return (
		<div className={styles.color__container}>
			<input type="color" onChange={onChange} />
			<div
				className={styles.color__example}
				style={{ backgroundColor: color ? color : defaultColor }}
			></div>
		</div>
	);
};

export default ColorSelect;
