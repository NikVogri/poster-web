import { Box, Link as LinkStyle, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const PageSidebar = ({ pagesList }) => {
  const router = useRouter();
  return (
    <Box
      left="0px"
      top="0px"
      border="none"
      borderRight="solid"
      borderWidth={1}
      flex={1}
      p={3}
      borderColor="gray.200"
    >
      <Text fontWeight="bold" fontSize="lg" textAlign="right" mb={3}>
        Your Pages
      </Text>
      <hr />

      <Box textAlign="right" mt={3}>
        {pagesList.map((page) => (
          <LinkStyle
            key={page.title}
            href={`/pages/${page.slug}`}
            border="solid"
            borderWidth={1}
            borderRadius="5px"
            px={5}
            py={1}
            borderColor="gray.300"
          >
            {page.title}
          </LinkStyle>
        ))}
      </Box>
    </Box>
  );
};

export default PageSidebar;
