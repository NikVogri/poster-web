import { Button, Flex } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { EditorState } from "draft-js";
import { richStyleWidgets, contentBlockWidgets } from "../libs/widgets";

interface EditorControllsProps {
  savePage: () => void;
  saveAvailable: boolean;
  toggleStyle: (
    style: string,
    type: "richtext" | "block" | "link" | "code"
  ) => void;
  editorState: EditorState;
}

const dragIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
  >
    <title>ic_drag_handle_24px</title>
    <g fill="#303030">
      <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path>
    </g>
  </svg>
);

const EditorControlls: React.FC<EditorControllsProps> = ({
  savePage,
  saveAvailable,
  toggleStyle,
  editorState,
}) => {
  const [isDraging, setIsDraging] = useState(false);
  const [currentlyActive, setCurrentlyActive] = useState(null);

  useEffect(() => {
    setCurrentlyActive(editorState.getCurrentInlineStyle());
  }, [editorState]);

  const getBlockType = useCallback(() => {
    const selection = editorState.getSelection();
    return editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
  }, [editorState]);

  return (
    <Draggable
      handle=".drag-handler"
      onMouseDown={() => setIsDraging(true)}
      onStop={() => setIsDraging(false)}
    >
      <Flex
        position="relative"
        background="#fff"
        zIndex={2}
        shadow="lg"
        borderColor="gray.200"
        borderWidth={1}
        borderStyle="solid"
        alignItems="center"
        justify="space-between"
        borderRadius="5px"
      >
        <Flex>
          <Flex
            alignItems="center"
            pl={2}
            mr={3}
            cursor={isDraging ? "grabbing" : "grab"}
            className="drag-handler"
          >
            {dragIcon}
          </Flex>
          {richStyleWidgets.map((widget) => (
            <Button
              onDragEnter={() => setIsDraging(true)}
              onDragLeave={() => setIsDraging(false)}
              _hover={{ background: "gray.200" }}
              p={1}
              key={widget.name}
              background={currentlyActive?.has(widget.name) ? "gray.300" : ""}
              borderRadius={0}
              onClick={() => toggleStyle(widget.name, widget.type)}
              border="none"
              borderRight="solid"
              borderWidth={1}
              borderColor="gray.300"
            >
              {widget.icon}
            </Button>
          ))}
          {contentBlockWidgets.map((widget) => (
            <Button
              onDragEnter={() => setIsDraging(true)}
              onDragLeave={() => setIsDraging(false)}
              _hover={{ background: "gray.200" }}
              p={1}
              key={widget.name}
              background={getBlockType() == widget.name ? "gray.300" : ""}
              borderRadius={0}
              onClick={() => toggleStyle(widget.name, widget.type)}
              border="none"
              borderRight="solid"
              borderWidth={1}
              borderColor="gray.300"
            >
              {widget.icon}
            </Button>
          ))}
        </Flex>
        <Button
          px={5}
          borderRadius={0}
          onClick={savePage}
          disabled={!saveAvailable}
        >
          Save
        </Button>
      </Flex>
    </Draggable>
  );
};

export default EditorControlls;
