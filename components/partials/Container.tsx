import { Container as ContainerWrapper } from "@chakra-ui/react";
import React from "react";

const Container = ({ children }) => {
  return (
    <ContainerWrapper centerContent={false} maxW="1024px" py="15px">
      {children}
    </ContainerWrapper>
  );
};

export default Container;
