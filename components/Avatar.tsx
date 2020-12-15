import { Avatar as UserAvatar, Text, Flex } from "@chakra-ui/react";
import React, { FC } from "react";

interface AvatarProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  withUsername?: boolean;
}

const Avatar: FC<AvatarProps> = ({
  name,
  size = "sm",
  withUsername = false,
}) => {
  return (
    <Flex alignItems="center">
      {withUsername && <Text mr={2}>{name}</Text>}
      <UserAvatar
        name={name}
        src={`https://ui-avatars.com/api/?name=${name}&color=7F9CF5&background=EBF4FF`}
        size={size}
      />
    </Flex>
  );
};

export default Avatar;
