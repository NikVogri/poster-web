import { Box, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/AuthContext";
import useApi from "../components/hooks/useApi";
import PageCard from "../components/PageCard";

const Home = () => {
  const [pages, setPages] = useState([]);
  const { userLoading, user } = useContext(AuthContext);
  const { api } = useApi();

  useEffect(() => {
    if (user) {
      fetchUserPages();
    }
  }, [user]);

  const fetchUserPages = async () => {
    const data = await api(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/all/${user.id}`,
      "get",
      true
    );
    setPages(data.pages);
  };

  if (userLoading) {
    return <p>Loading...</p>;
  }

  if (!userLoading && !user) {
    return <p>Login to continue...</p>;
  }

  return (
    <>
      <Text my="30px" fontWeight="bold" fontSize="3xl">
        My Pages
      </Text>
      <Box>
        {pages.map((page) => (
          <PageCard key={page.id} title={page.title} slug={page.slug || ""} />
        ))}
        {pages.length == 0 && <p>No pages found, create one now!</p>}
      </Box>
    </>
  );
};

export default Home;
