import { Box, Flex, Text, Link as LinkUI, Image } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import Link from "next/link";
import PostControlls from "../../components/post/PostControlls";
import ReactHtmlParser from "react-html-parser";
import Avatar from "../../components/Avatar";

export default function post({ post }) {
  return (
    <Box mt={4} shadow="lg" py={8} px={5}>
      <Flex align="center">
        <Text fontSize="4xl" fontWeight="bold" mr={3}>
          {post.title}
        </Text>
        <PostControlls author={post.User} title={post.title} slug={post.slug} />
      </Flex>
      <Box mt={4} mb={8}>
        {ReactHtmlParser(post.content)}
      </Box>

      <Flex justify="space-between">
        <Box>rating</Box>
        <Link href={`/users/${post.User.slug}`}>
          <LinkUI>
            <Avatar name={post.User.username} size="sm" withUsername />
          </LinkUI>
        </Link>
      </Flex>
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/posts`
  );

  const paths = posts.data.posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/posts/${params.slug}`
  );
  console.log(post);

  return {
    props: { post: post.data.post },
    revalidate: 1,
  };
};
