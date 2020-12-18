import { Button, Flex, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { bold, italic } from "../icons/icons";

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

const EditorControlls = () => {
  const [widgetItems, setWidgetItems] = useState(WIDGETS);

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
    <Flex
      position="fixed"
      bottom="50vh"
      right="20vw"
      shadow="lg"
      borderColor="gray.200"
      borderWidth={1}
      borderStyle="solid"
    >
      {widgetItems.map((widget) => (
        <Button
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
  );
};

export default EditorControlls;
