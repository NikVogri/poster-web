import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import * as Yup from "yup";

import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import createToast from "../helpers/toast";

export default function register() {
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const signupValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a correct email address")
      .required("Email is required"),
    username: Yup.string()
      .min(5, "Username must be more than 5 characters long")
      .max(50, "Max 50 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be more than 6 characters long")
      .required("Password is required"),
    passwordConfirm: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords don't match"
    ),
  });

  const handleSubmit = async (e) => {
    setSubmitting(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
        { ...e }
      );

      router.push("/login");
      createToast(
        "User created successfully",
        "User created successfully, please log in now",
        "success"
      );
    } catch (err) {
      createToast("User cannot be created", err.response.data.error, "error");
    } finally {
      setSubmitting(false);
    }
  };

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
        Register new user
      </Text>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
        }}
        validationSchema={signupValidationSchema}
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

          <Field name="username">
            {({ field, form }) => (
              <FormControl
                isRequired
                mt={2}
                isInvalid={form.errors.username && form.touched.username}
              >
                <FormLabel>Username</FormLabel>
                <Input
                  {...field}
                  type="username"
                  required
                  placeholder="Username"
                />
                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
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

          <Field name="passwordConfirm">
            {({ field, form }) => (
              <FormControl
                isRequired
                mt={2}
                isInvalid={
                  form.errors.passwordConfirm && form.touched.passwordConfirm
                }
              >
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  {...field}
                  type="password"
                  required
                  placeholder="Confirm Password"
                />
                <FormErrorMessage>
                  {form.errors.passwordConfirm}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={6}
            colorScheme="teal"
            type="submit"
            width="100%"
            isLoading={submitting}
          >
            Submit
          </Button>
        </Form>
      </Formik>
    </Box>
  );
}
