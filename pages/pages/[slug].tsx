import { Box, Flex, Text, Link as LinkUI, Image } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import Link from "next/link";
import PageControlls from "../../components/page/PageControlls";
import ReactHtmlParser from "react-html-parser";
import Avatar from "../../components/Avatar";

export default function page({ page }) {
  return (
    <Box mt={4} shadow="lg" py={8} px={5}>
      <Flex align="center">
        <Text fontSize="4xl" fontWeight="bold" mr={3}>
          {page.title}
        </Text>
        <PageControlls author={page.User} title={page.title} slug={page.slug} />
      </Flex>
      <Box mt={4} mb={8}>
        {ReactHtmlParser(page.content)}
      </Box>

      <Flex justify="space-between">
        <Box>rating</Box>
        <Link href={`/users/${page.User.slug}`}>
          <LinkUI>
            <Avatar name={page.User.username} size="sm" withUsername />
          </LinkUI>
        </Link>
      </Flex>
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages`
  );

  const paths = pages.data.pages.map((page) => ({
    params: {
      slug: page.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/${params.slug}`
  );

  return {
    props: { page: res.data.page },
    revalidate: 1,
  };
};
