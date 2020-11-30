import { Container } from "@chakra-ui/react";
import React from "react";
import Navigation from "./Navigation";

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <Container maxW="1024px" mx="auto" bg="red">
        {children}
      </Container>
    </>
  );
}
