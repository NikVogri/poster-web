import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

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
    <Flex
      alignItems="center"
      flexDir="column"
      onClick={handleClick}
      bg={isActive ? "gray.300" : ""}
      cursor="pointer"
      p={5}
      m={3}
      border="solid 3px gray"
      rounded="5px"
      width="300px"
      maxWidth="45vw"
    >
      {children}
    </Flex>
  );
};

export default SelectCard;
