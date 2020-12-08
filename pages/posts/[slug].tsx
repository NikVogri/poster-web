import { Box, Flex, Text, Link as LinkUI, Image } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import PostControlls from "../../components/post/PostControlls";

export default function post({ post }) {
  const { user } = useContext(AuthContext);
  console.log(user);
  console.log(post);
  return (
    <Box mt={4} shadow="lg" py={8} px={5}>
      <Flex align="center">
        <Text fontSize="4xl" fontWeight="bold" mr={3}>
          {post.title}
        </Text>
        <PostControlls author={post.User} />
      </Flex>
      <Text mt={4} mb={8}>
        {post.content}
      </Text>

      <Flex justify="space-between">
        <Box>rating</Box>
        <Link href={`/users/${post.User.slug}`}>
          <LinkUI>
            <Flex align="center">
              <Image
                height={30}
                width={30}
                rounded="full"
                mr={2}
                src={
                  post.User.avatar ||
                  `https://ui-avatars.com/api/?name=${post.User.username}&color=7F9CF5&background=EBF4FF`
                }
                alt={post.User.username}
              />

              {post.User.username}
            </Flex>
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
