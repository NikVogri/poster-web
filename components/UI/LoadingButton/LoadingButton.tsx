import React from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface LoadingButtonProps {
	children: any;
	isLoading: boolean;
    [props: string]: any;
}

const LoadingButton = ({
	children,
	isLoading,
	...props
}: LoadingButtonProps): JSX.Element => {
	if (isLoading) {
		return (
			<button {...props}>
				<LoadingSpinner size="sm" />
			</button>
		);
	}
	return <button {...props}>{children}</button>;
};

export default LoadingButton;
