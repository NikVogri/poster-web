import { Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import withAuthentication from "../components/hoc/withAuthentication";
import useApi from "../components/hooks/useApi";
import PageCard from "../components/PageCard";
import Container from "../components/partials/Container/Container";

const Home = () => {
  const [pages, setPages] = useState([]);
  const { api } = useApi();

  useEffect(() => {
    fetchUserPages();
  }, []);

  const fetchUserPages = async () => {
    const res = await api(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/all`,
      "get",
      true
    );

    if (res) {
      setPages(res.pages);
    }
  };

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
            id={page.id}
            updatedAt={page.updatedAt}
            type={page.type}
            isPrivate={page.private}
          />
        ))}
        {pages.length == 0 && <p>No pages found, create one now!</p>}
      </Grid>
    </Container>
  );
};

export default withAuthentication(Home);
