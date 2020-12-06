import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "../components/context/AuthContext";
import NotificationProvider from "../components/context/NotificationContext";
import Layout from "../components/partials/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <NotificationProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NotificationProvider>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
