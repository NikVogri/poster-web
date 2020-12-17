import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import createToast from "../../helpers/toast";
import { AuthContext } from "../context/AuthContext";
import useApi from "../hooks/useApi";

export default function PageControlls({ author, title, slug }) {
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { api } = useApi();

  const router = useRouter();

  const deleteModalHandler = () => {
    onOpen();
  };

  const deleteHandler = async () => {
    const res = await api(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/${slug}`,
      "delete",
      true
    );

    if (res.success) {
      createToast(
        "Successfully deleted your page",
        "Your page is now removed",
        "success"
      );
      router.push("/");
    }
    onClose();
  };

  if (user && user.id == author.id) {
    return (
      <Box>
        <Button mr={2}>Edit</Button>
        <Button onClick={deleteModalHandler}>Delete</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete your page?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to delete '{title}'? </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={deleteHandler}>
                Yes, I'm sure.
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  } else {
    return <></>;
  }
}
