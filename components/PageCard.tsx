import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import TimeAgo from "./TimeAgo";

export default function PageItem({ title, slug, updatedAt }) {
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
          <TimeAgo type="updated" date={new Date(updatedAt)} />
        </Box>
      </a>
    </Link>
  );
}
