import { Box, Container } from "@chakra-ui/react";
import Navigation from "./Navigation";

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <Box position="relative">{children}</Box>
    </>
  );
}
