import { Avatar as UserAvatar, Text, Flex } from "@chakra-ui/react";
import React, { FC } from "react";

import styles from "./Avatar.module.scss";

interface AvatarProps {
	name: string;
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
	withUsername?: boolean;
	src?: string;
}

const Avatar: FC<AvatarProps> = ({
	name,
	size = "sm",
	withUsername = false,
	src,
}) => {
	return (
		<div className={styles.avatar}>
			{withUsername && <span>{name}</span>}
			<UserAvatar
				name={name}
				src={
					src ||
					`https://ui-avatars.com/api/?name=${name}&color=7F9CF5&background=EBF4FF`
				}
				size={size}
			/>
		</div>
	);
};

export default Avatar;
