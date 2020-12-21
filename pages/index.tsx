import { Grid, Text } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";
import PageCard from "../components/PageCard";
import Container from "../components/partials/Container";

const Home = ({ pages }) => {
  const { userLoading, user } = useContext(AuthContext);

  if (userLoading) {
    return <p>Loading...</p>;
  }

  if (!userLoading && !user) {
    return <p>Login to continue...</p>;
  }

  return (
    <Container>
      <Text my="30px" fontWeight="bold" fontSize="3xl">
        My Pages
      </Text>
      <Grid gridTemplateColumns="repeat(4, minmax(100px, 1fr))" gap={3}>
        {pages.map((page) => (
          <PageCard
            key={page.id}
            title={page.title}
            slug={page.slug || ""}
            date={page.createdAt}
          />
        ))}
        {pages.length == 0 && <p>No pages found, create one now!</p>}
      </Grid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/all`,
      {
        withCredentials: true,
        headers: {
          cookie: req.headers.cookie,
        },
      }
    );
    return {
      props: {
        pages: res.data.pages,
      },
    };
  } catch (err) {
    return {
      props: {
        pages: [],
      },
    };
  }
};

export default Home;
