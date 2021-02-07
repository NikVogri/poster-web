import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import TimeAgo from "./TimeAgo";

interface PageItemProps {
  title: string;
  slug: string;
  updatedAt: Date;
  type: "notebook" | "todo";
  isPrivate: boolean;
}

const PageCard = ({
  title,
  slug,
  updatedAt,
  type,
  isPrivate,
}: PageItemProps): JSX.Element => {
  const hoverStyle = {
    bg: "gray.50",
  };
  return (
    <Link href={`/pages/${slug}`}>
      <a>
        <Box
          mb="10px"
          borderWidth="1px"
          borderRadius="lg"
          px="20px"
          py="10px"
          _hover={hoverStyle}
        >
          <Text fontWeight="bold" fontSize="xl">
            {title}
          </Text>
          <hr />
          <TimeAgo type="updated" date={new Date(updatedAt)} />
          <hr />
          <Text>Type: {type}</Text>
          <Text>Private: {isPrivate ? "Private" : "Public"}</Text>
        </Box>
      </a>
    </Link>
  );
};

export default PageCard;
