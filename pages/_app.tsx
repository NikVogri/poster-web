import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "../components/context/AuthContext";
import Layout from "../components/partials/Layout";
import "../styles/globals.css";
import "../styles/editor.css";
import axios, { AxiosResponse } from "axios";
import EditorProvider from "../components/context/EditorContext";

function MyApp({ Component, pageProps, user }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Layout currentUser={user}>
          <EditorProvider>
            <Component {...pageProps} />
          </EditorProvider>
        </Layout>
      </ChakraProvider>
    </AuthProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  if (!ctx.req || !ctx.req.headers.cookie) {
    return {};
  }

  let user = null;
  let res: AxiosResponse;

  try {
    res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/me`,
      {
        withCredentials: true,
        headers: {
          cookie: ctx.req.headers?.cookie,
        },
      }
    );
    user = res.data.user;
  } catch (err) {}

  return {
    user,
  };
};

export default MyApp;
