import { Button, Flex } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { RichUtils } from "draft-js";
import { richStyleWidgets, contentBlockWidgets } from "../libs/widgets";
import EditorTool from "./EditorTool";
import { EditorContext } from "./context/EditorContext";
import clearFormatting from "draft-js-clear-formatting";

interface EditorControllsProps {}

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

const clearIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <title>Clear Styles</title>
    <g fill="#303030">
      <path d="M14 11c0-3.33-5-9-5-9s-.85.97-1.85 2.33l6.83 6.83L14 11zM3.55 3.27L2.27 4.55l2.89 2.89C4.49 8.69 4 9.96 4 11c0 2.76 2.24 5 5 5 1.31 0 2.49-.52 3.39-1.34L14.73 17 16 15.73 3.55 3.27z"></path>
    </g>
  </svg>
);

const EditorControlls: React.FC<EditorControllsProps> = () => {
  const [isDraging, setIsDraging] = useState(false);
  const [currentlyActive, setCurrentlyActive] = useState(null);
  const { editorState, setEditorState, save } = useContext(EditorContext);

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

  const toggleStyle = (
    style: string,
    type: "richtext" | "block" | "link" | "code"
  ) => {
    switch (type) {
      case "richtext":
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
        break;
      case "block":
        setEditorState(RichUtils.toggleBlockType(editorState, style));
        break;
      // case "link":
      //   updateEditorState(
      //     RichUtils.toggleLink(editorState, "somethin", "www.google.com")
      //   );
      //   break;
      case "code":
        setEditorState(RichUtils.toggleCode(editorState));
        break;
    }
  };

  const clearStyles = () => {
    console.log("clearing styles");
    const options = {
      inline: true,
      entities: true,
      lists: true,
    };

    setEditorState(clearFormatting(editorState, options));
  };

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
            <EditorTool
              onClick={() => toggleStyle(widget.name, widget.type)}
              icon={widget.icon}
              isActive={currentlyActive?.has(widget.name)}
              key={widget.name}
            />
          ))}
          {contentBlockWidgets.map((widget) => (
            <EditorTool
              onClick={() => toggleStyle(widget.name, widget.type)}
              icon={widget.icon}
              isActive={getBlockType() == widget.name}
              key={widget.name}
            />
          ))}
          <EditorTool
            onClick={clearStyles}
            icon={clearIcon}
            key={"clear"}
            isActive={false}
          />
        </Flex>
        <Button
          px={5}
          borderRadius={0}
          onClick={save.saveEditorState}
          disabled={!save.saveIsAvailable}
        >
          Save
        </Button>
      </Flex>
    </Draggable>
  );
};

export default EditorControlls;
