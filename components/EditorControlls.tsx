import { Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { bold, italic } from "../icons/icons";
import Draggable from "react-draggable";
import HeaderDropdown from "./HeaderDropdown";

interface widgets {
  name: string;
  icon: JSX.Element;
  active: boolean;
}

const WIDGETS: widgets[] = [
  {
    name: "bold",
    active: false,
    icon: bold,
  },
  {
    name: "italic",
    active: false,
    icon: italic,
  },
];

const dragIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <title>ic_drag_handle_24px</title>
    <g fill="#303030">
      <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path>
    </g>
  </svg>
);

const EditorControlls = ({ savePage }) => {
  const [widgetItems, setWidgetItems] = useState(WIDGETS);
  const [isDraging, setIsDraging] = useState(false);

  const setActiveWidget = (clickedWidgetName: string) => {
    setWidgetItems((oldWidgets) =>
      oldWidgets.map((widget) => {
        return {
          ...widget,
          active: widget.name == clickedWidgetName ? true : false,
        };
      })
    );
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
        zIndex={9999999}
        shadow="lg"
        borderColor="gray.200"
        borderWidth={1}
        borderStyle="solid"
        alignItems="center"
        justify="space-between"
      >
        <Flex>
          <Flex
            alignItems="center"
            pl={1}
            cursor={isDraging ? "grabbing" : "grab"}
            className="drag-handler"
          >
            {dragIcon}
          </Flex>
          {widgetItems.map((widget) => (
            <Button
              onDragEnter={() => setIsDraging(true)}
              onDragLeave={() => setIsDraging(false)}
              _hover={{ background: "gray.200" }}
              p={2}
              borderRadius={0}
              bg={widget.active ? "gray.200" : "none"}
              onClick={() => setActiveWidget(widget.name)}
            >
              {widget.icon}
            </Button>
          ))}
          <HeaderDropdown widgetActive={false} />
        </Flex>
        <Button px={5} borderRadius={0} onClick={savePage}>
          Save
        </Button>
      </Flex>
    </Draggable>
  );
};

export default EditorControlls;
