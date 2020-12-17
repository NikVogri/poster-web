import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "../components/context/AuthContext";
import Layout from "../components/partials/Layout";
import "../styles/globals.css";
import "../styles/editor.css";
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
