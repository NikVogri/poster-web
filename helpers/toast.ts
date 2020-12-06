import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast();

const createToast = (
  title: string,
  description: string,
  status: "error" | "success" | "info" | "warning"
) => {
  toast({
    position: "bottom-left",
    title,
    description,
    status,
    duration: 9000,
    isClosable: true,
  });
};

export default createToast;
