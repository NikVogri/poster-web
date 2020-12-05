import { Box, Button, Container, Flex, List, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CreatePostModal from "../CreatePostModal";

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
        <Container centerContent={false} maxW="1024px" py="15px">
          <Flex justifyContent="space-between" align="center">
            <Box>
              <Link href="/">
                <Text
                  fontWeight="bold"
                  fontSize="26px"
                  margin="0"
                  cursor="pointer"
                >
                  POSTER
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
              <Flex>
                <Button
                  colorScheme="green"
                  mr={2}
                  onClick={() => setOpenModal(true)}
                >
                  Create new post
                </Button>
                <Button colorScheme="red" onClick={logout}>
                  Log out
                </Button>
              </Flex>
            )}
          </Flex>
        </Container>
        <hr />
      </Box>
      <CreatePostModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </>
  );
};

export default Navigation;
