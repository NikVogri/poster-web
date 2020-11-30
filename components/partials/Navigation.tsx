import { Box, Container, Flex, List, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

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
  return (
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
          <List display="flex">
            <NavItem to="/login" name="Login" />
            <NavItem to="/register" name="Register" />
          </List>
        </Flex>
      </Container>
      <hr />
    </Box>
  );
};

export default Navigation;
