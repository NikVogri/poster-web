import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { Formik, Form, Field, FormikValues } from "formik";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import { useRouter } from "next/router";

const resetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords don't match"
  ),
});

const ResetPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetPasswordHandler = async (e: FormikValues) => {
    const token = router.query.token as string;

    setLoading(true);
    const res = resetPassword(e.password, token);
    setLoading(false);

    if (res) {
      router.push("/login");
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
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={resetPasswordValidationSchema}
        onSubmit={resetPasswordHandler}
      >
        <Form>
          <Field name="password">
            {({ field, form }) => (
              <FormControl
                isRequired
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  required
                  placeholder="New password"
                  {...field}
                />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Box mt={3}>
            <Field name="passwordConfirm">
              {({ field, form }) => (
                <FormControl
                  isRequired
                  isInvalid={
                    form.errors.passwordConfirm && form.touched.passwordConfirm
                  }
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    required
                    placeholder="Confirm password"
                    {...field}
                  />
                  <FormErrorMessage>
                    {form.errors.passwordConfirm}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Box>
          <Button
            mt={6}
            colorScheme="teal"
            type="submit"
            width="100%"
            isLoading={loading}
          >
            Reset Password
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default ResetPassword;
