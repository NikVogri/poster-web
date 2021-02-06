import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, Formik, Field, FormikValues, setIn } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import * as Yup from "yup";
import useApi from "./hooks/useApi";

interface InviteMembersProps {
  showModal: boolean;
  closeModal: () => void;
  pageSlug: string;
}

const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email"),
});

const InviteMembersModal: React.FC<InviteMembersProps> = ({
  showModal,
  closeModal,
  pageSlug,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { api, loading } = useApi();
  const [invitedSuccessfully, setInvitedSuccessfully] = useState(false);
  const router = useRouter();

  const closeModalHandler = () => {
    closeModal();
    onClose();
    router.reload();
  };

  useEffect(() => {
    if (showModal) {
      onOpen();
    } else {
      onClose();
      setInvitedSuccessfully(false);
    }
  }, [showModal]);

  const invitationHandler = async (e: FormikValues) => {
    const res = await api(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/${pageSlug}/members/add`,
      "post",
      true,
      true,
      e
    );
    if (res.success) {
      setInvitedSuccessfully(true);
    }
  };
  return (
    <Modal
      closeOnOverlayClick={true}
      isOpen={isOpen}
      onClose={closeModalHandler}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {loading && <p>loading</p>}
          {!loading && !invitedSuccessfully && (
            <Formik
              initialValues={{ email: "" }}
              onSubmit={invitationHandler}
              validationSchema={emailValidationSchema}
            >
              <Form>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel>Invite via Email</FormLabel>
                      <Input
                        type="email"
                        required
                        placeholder="Email"
                        {...field}
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Box mt={3}>
                  <Button type="submit" mr={3} colorScheme="green">
                    Invite
                  </Button>
                  <Button
                    onClick={closeModalHandler}
                    type="button"
                    colorScheme="red"
                  >
                    Cancel
                  </Button>
                </Box>
              </Form>
            </Formik>
          )}
          {invitedSuccessfully && (
            <Box textAlign="center">
              <Flex alignItems="center" justifyContent="center" mb={4}>
                {successIcon}{" "}
                <Text fontSize="2xl" ml={2}>
                  User added successfully
                </Text>
              </Flex>
              <Button
                size="sm"
                onClick={() => setInvitedSuccessfully(false)}
                colorScheme="blue"
              >
                Add another user
              </Button>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const successIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <title>check-circle-07</title>
    <g fill="#58c83c">
      <path d="M7.13 9.13c-0.5-0.5-1.25-0.5-1.75-0.01s-0.5 1.25 0 1.75l2.5 2.5c0.25 0.25 0.5 0.38 0.87 0.38s0.63-0.13 0.88-0.38l8.75-8.75c0.5-0.5 0.5-1.25 0-1.75s-1.25-0.5-1.75 0l-7.88 7.88-1.62-1.62z"></path>
      <path
        fill="#58c83c"
        d="M8.75 20c4.88 0 8.75-3.88 8.75-8.75 0-0.75-0.5-1.25-1.25-1.25s-1.25 0.5-1.25 1.25c0 3.5-2.75 6.25-6.25 6.25s-6.25-2.75-6.25-6.25 2.75-6.25 6.25-6.25c0.75 0 1.38 0.13 2.13 0.38 0.63 0.25 1.38-0.13 1.62-0.76 0.25-0.63-0.13-1.38-0.75-1.62-1-0.37-2-0.5-3-0.5-4.88 0-8.75 3.87-8.75 8.75s3.88 8.75 8.75 8.75z"
      ></path>
    </g>
  </svg>
);

export default InviteMembersModal;
