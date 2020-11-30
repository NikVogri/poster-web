import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import PostItem from "../components/PostItem";

const Home = ({ posts }) => {
  console.log(posts);
  return (
    <>
      <Text my="30px" fontWeight="bold" fontSize="3xl">
        Posts
      </Text>
      <Box>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            excerpt={post.content.slice(0, 100)}
            title={post.title}
            slug={post.slug || ""}
          />
        ))}
      </Box>
    </>
  );
};

export const getStaticProps = async () => {
  const posts = await axios.get("http://localhost:5000/api/v1/posts");
  return {
    props: { posts: posts.data.posts },
    revalidate: 1,
  };
};

export default Home;
