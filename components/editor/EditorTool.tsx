import { Button } from "@chakra-ui/react";
import React from "react";

const EditorTool = ({ isActive, onClick, icon }) => {
  return (
    <Button
      _hover={{ background: "gray.200" }}
      p={1}
      background={isActive ? "blue.300" : ""}
      borderRadius={0}
      onClick={onClick}
      border="none"
      borderRight="solid"
      borderWidth={1}
      borderColor="gray.300"
    >
      {icon}
    </Button>
  );
};

export default EditorTool;
