import { Box, Button } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PostControlls({ author }) {
  const { user } = useContext(AuthContext);

  if (user && user.id == author.id) {
    return (
      <Box>
        <Button mr={2}>Edit</Button>
        <Button>Delete</Button>
      </Box>
    );
  } else {
    return <></>;
  }
}
