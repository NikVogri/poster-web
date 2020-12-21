import {
  Box,
  Button,
  Flex,
  List,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CreatePageModal from "../CreatePageModal";
import {} from "@chakra-ui/icons";
import Avatar from "../Avatar";
import Container from "./Container";

const UserIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 31 31"
  >
    <g fill="#303030">
      <path d="M15.36 17.28c4.77 0 8.64-3.87 8.64-8.64s-3.87-8.64-8.64-8.64-8.64 3.87-8.64 8.64 3.87 8.64 8.64 8.64z m7.68 1.92h-3.31c-1.33 0.61-2.81 0.96-4.37 0.96s-3.04-0.35-4.37-0.96h-3.31c-4.24 0-7.68 3.44-7.68 7.68v0.96c0 1.59 1.29 2.88 2.88 2.88h24.96c1.59 0 2.88-1.29 2.88-2.88v-0.96c0-4.24-3.44-7.68-7.68-7.68z"></path>
    </g>
  </svg>
);

const NewPageIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 20 20"
  >
    <title>plus-circle</title>
    <g fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-11a1 1 0 1 0-2 0v2H7a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2V7z"
        fill="#303030"
      ></path>
    </g>
  </svg>
);

const LogoutIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
  >
    <title>logout</title>
    <g fill="none">
      <path
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </g>
  </svg>
);

const NavItem = ({ name, to }) => {
  return (
    <li style={{ marginLeft: "10px" }}>
      <Link href={to}>
        <a>{name}</a>
      </Link>
    </li>
  );
};

const Navigation = () => {
  const { user, logout } = useContext(AuthContext) as any;
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Box>
        <Container>
          <Flex justifyContent="space-between" align="center">
            <Box>
              <Link href="/">
                <Text
                  fontWeight="bold"
                  fontSize="26px"
                  margin="0"
                  cursor="pointer"
                >
                  PAGER
                </Text>
              </Link>
            </Box>
            {!user && (
              <List display="flex">
                <NavItem to="/login" name="Login" />
                <NavItem to="/register" name="Register" />
              </List>
            )}

            {user && (
              <Menu>
                <MenuButton as={Button} background="#fff">
                  <Avatar name={user.username} size="sm" withUsername />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <i>{UserIcon}</i>
                    <Text ml={2}>Profile</Text>
                  </MenuItem>
                  <MenuItem onClick={() => setOpenModal(true)}>
                    <i>{NewPageIcon}</i>
                    <Text ml={2}>Create new page</Text>
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <i>{LogoutIcon}</i>
                    <Text ml={2}>Logout</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Container>
        <hr />
      </Box>
      <CreatePageModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </>
  );
};

export default Navigation;
