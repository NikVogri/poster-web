import { Container, Box } from "@chakra-ui/react";
import React from "react";

const TodoPage = ({ data }) => {
  return (
    <Container maxWidth="55vw" width="100%">
      <Box bg="red" width="100%">
        <Box position="relative">todo list</Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
