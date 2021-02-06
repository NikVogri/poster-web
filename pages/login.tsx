import { Formik, Field, Form, FormikValues } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

import { AuthContext } from "../components/context/AuthContext";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email needs to be an email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const forgotPassValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email needs to be an email address")
    .required("Email is required"),
});

const login = () => {
  const { login, userLoading, forgotPassword } = useContext(AuthContext);
  const [loadingForgotPass, setLoadingForgotPass] = useState(false);

  const [showForgotPasswordForm, setForgotPasswordForm] = useState(false);

  const handleSubmit = async (e: FormikValues) => {
    login(e.email, e.password);
  };

  const handleForgotPassSubmit = async (e: FormikValues) => {
    setLoadingForgotPass(true);
    await forgotPassword(e.email);
    setLoadingForgotPass(false);
  };

  if (showForgotPasswordForm) {
    return (
      <Box
        maxW="340px"
        mx="auto"
        mt="100px"
        boxShadow="md"
        p="30px"
        borderRadius="lg"
      >
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={forgotPassValidationSchema}
          onSubmit={handleForgotPassSubmit}
        >
          <Form>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isRequired
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel>Email</FormLabel>
                  <Input type="email" required placeholder="Email" {...field} />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={6}
              colorScheme="teal"
              type="submit"
              width="100%"
              isLoading={loadingForgotPass}
            >
              Send Email
            </Button>
          </Form>
        </Formik>
      </Box>
    );
  } else {
    return (
      <Box
        maxW="340px"
        mx="auto"
        mt="100px"
        boxShadow="md"
        p="30px"
        borderRadius="lg"
      >
        <Text fontWeight="bold" fontSize="2xl" textAlign="center" mb={6}>
          Log in
        </Text>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isRequired
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel>Email</FormLabel>
                  <Input type="email" required placeholder="Email" {...field} />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  isRequired
                  mt={2}
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel>Password</FormLabel>
                  <Input
                    {...field}
                    type="password"
                    required
                    placeholder="Password"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={6}
              colorScheme="teal"
              type="submit"
              width="100%"
              isLoading={userLoading}
            >
              Submit
            </Button>
          </Form>
        </Formik>
        <Button
          mt={3}
          background="none"
          onClick={() => setForgotPasswordForm(true)}
        >
          Forgot password?
        </Button>
      </Box>
    );
  }
};

export default login;
