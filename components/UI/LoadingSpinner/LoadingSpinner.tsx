import React from "react";

interface LoadingSpinnerProps {
	size: "sm" | "md" | "lg" | "xlg";
	className?: string;
}

const LoadingSpinner = ({
	size,
	className,
}: LoadingSpinnerProps): JSX.Element => {
	let height, width;

	switch (size) {
		case "sm":
			height = 20;
			width = 20;
			break;
		case "md":
			height = 30;
			width = 30;
			break;
		case "lg":
			height = 50;
			width = 50;
			break;
		case "xlg":
			height = 60;
			width = 60;
			break;

		default:
			break;
	}

	return (
		<div
			className={`sk-cube-grid ${className}`}
			style={{ height: `${height}px`, width: `${width}px` }}
		>
			<div className="sk-cube sk-cube1"></div>
			<div className="sk-cube sk-cube2"></div>
			<div className="sk-cube sk-cube3"></div>
			<div className="sk-cube sk-cube4"></div>
			<div className="sk-cube sk-cube5"></div>
			<div className="sk-cube sk-cube6"></div>
			<div className="sk-cube sk-cube7"></div>
			<div className="sk-cube sk-cube8"></div>
			<div className="sk-cube sk-cube9"></div>
		</div>
	);
};

export default LoadingSpinner;
