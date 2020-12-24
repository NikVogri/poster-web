import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import React, { useState } from "react";

const HEADERS = [
  {
    name: "H1",
    active: true,
  },
  {
    name: "H2",
    active: false,
  },
  {
    name: "H3",
    active: false,
  },
  {
    name: "H4",
    active: false,
  },
  {
    name: "H5",
    active: false,
  },
  {
    name: "H6",
    active: false,
  },
];

const HeaderDropdown = ({ onClick }) => {
  const [headersList, setHeadersList] = useState(HEADERS);

  const setActiveHeader = (activeHeaderName: string) => {
    setHeadersList((oldHeaders) =>
      oldHeaders.map((header) => {
        return {
          ...header,
          active: header.name == activeHeaderName ? true : false,
        };
      })
    );
  };

  return (
    <Menu>
      <Button
        p={0}
        borderRadius={0}
        fontSize="18px"
        fontWeight="bold"
        background="none"
        onClick={onClick}
      >
        {headersList.filter((header) => header.active)[0].name}
      </Button>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        background="none"
        borderRadius={0}
        minWidth={0}
        p="0 5px 0 0"
      ></MenuButton>
      <MenuList width="30px">
        {headersList.map((header) => (
          <MenuItem
            key={header.name}
            onClick={() => setActiveHeader(header.name)}
          >
            {header.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default HeaderDropdown;
