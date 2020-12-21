import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

const PageSidebarRight = ({}) => {
  return (
    <Box
      left="0px"
      top="0px"
      border="none"
      borderLeft="solid"
      borderWidth={1}
      flex={1}
      p={3}
      borderColor="gray.200"
    >
      <Text
        border="solid"
        borderWidth={1}
        borderColor="red.200"
        color="red.300"
        borderRadius="5px"
        fontWeight="bold"
        px={2}
      >
        Last saved 10 minutes ago
      </Text>
    </Box>
  );
};

export default PageSidebarRight;
