import { Field, Form, Formik, FormikValues } from "formik";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

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
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useApi from "./hooks/useApi";
import createToast from "../helpers/toast";
import { useRouter } from "next/router";

const postValidationSchema = Yup.object().shape({
  title: Yup.string()
    .max(255, "Title can't be longer than 255 characters")
    .required("Title is required"),
});

const CreatePostModal = ({ openModal, closeModal }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState("");
  const { loading, api } = useApi();
  const router = useRouter();

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
    const res = await api(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/posts`,
      "post",
      true,
      { ...e, content }
    );

    if (res.success) {
      onClose();
      createToast(
        "Post created",
        "Your post has been successfully created",
        "success"
      );

      router.push(`/posts/${res.post.slug}`);
    }
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
          <ModalHeader>Create a new post</ModalHeader>
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
                      <SunEditor
                        onAudioUpload={() => {}}
                        onVideoUpload={() => {}}
                        onImageUpload={() => {}}
                        name="content"
                        onChange={(val) => setContent(val)}
                      />
                      <FormErrorMessage>{form.errors.content}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  colorScheme="blue"
                  mr={3}
                  mt={4}
                  type="submit"
                  isLoading={loading}
                >
                  Create Post
                </Button>
              </Form>
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostModal;
