import { Box } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Navigation from "./Navigation/Navigation";

const Layout = ({ children, currentUser }) => {
  const { setAuthenticatedUser } = useContext(AuthContext);

  useEffect(() => {
    setAuthenticatedUser(currentUser);
  }, []);

  return (
    <>
      <Navigation />
      <Box position="relative">{children}</Box>
    </>
  );
};

export default Layout;
