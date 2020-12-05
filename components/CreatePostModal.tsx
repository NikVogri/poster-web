import { Field, Form, Formik, FormikValues } from "formik";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";

const postValidationSchema = Yup.object().shape({
  title: Yup.string()
    .max(255, "Title can't be longer than 255 characters")
    .required("Title is required"),
  content: Yup.string().required("Content is required"),
});

const CreatePostModal = ({ openModal, closeModal }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!isOpen && openModal) {
      onOpen();
    } else {
      onClose();
    }
  }, [openModal]);

  const closeModalHandler = () => {
    onClose();
    closeModal();
  };

  const handlePostSubmit = async (e: FormikValues) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/posts`,
      { ...e },
      { withCredentials: true }
    );
    console.log(res);
  };

  return (
    <>
      <Modal
        closeOnOverlayClick={true}
        isOpen={isOpen}
        onClose={closeModalHandler}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={{ title: "", content: "" }}
              validationSchema={postValidationSchema}
              onSubmit={handlePostSubmit}
            >
              <Form>
                <Field name="title">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.title && form.touched.title}
                    >
                      <FormLabel>Title</FormLabel>
                      <Input
                        type="title"
                        required
                        placeholder="title"
                        {...field}
                      />
                      <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="content">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.content && form.touched.content}
                    >
                      <FormLabel>content</FormLabel>
                      <Textarea
                        type="content"
                        required
                        placeholder="content"
                        {...field}
                      />
                      <FormErrorMessage>{form.errors.content}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button colorScheme="blue" mr={3} type="submit">
                  Create
                </Button>
              </Form>
            </Formik>
          </ModalBody>

          <ModalFooter>
            <Button onClick={closeModalHandler}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostModal;
