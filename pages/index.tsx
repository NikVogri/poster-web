import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import PageCard from "../components/PageCard";

const Home = ({ pages }) => {
  return (
    <>
      <Text my="30px" fontWeight="bold" fontSize="3xl">
        My Pages
      </Text>
      <Box>
        {pages.map((page) => (
          <PageCard
            key={page.id}
            excerpt={page.content.slice(0, 100)}
            title={page.title}
            slug={page.slug || ""}
          />
        ))}
      </Box>
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const user = (await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/me`
    )) as any;

    if (!user) {
      throw new Error();
    }

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/${user.id}`
    );

    return {
      props: { pages: res.data.pages },
      revalidate: 1,
    };
  } catch (err) {
    return { props: { pages: [] } };
  }
};

export default Home;
