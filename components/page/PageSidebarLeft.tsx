import { Box, Link as LinkStyle, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const PageSidebarLeft = () => {
  const [loading, setLoading] = useState(null);
  const [pagesList, setPagesList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchUserPages();
  }, []);

  const fetchUserPages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/all`,
        { withCredentials: true }
      );

      setPagesList(res.data.pages);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const isCurrentPage = (slug: string) => {
    return slug === router.query.slug;
  };

  return (
    <Box
      left="0px"
      top="0px"
      border="none"
      borderRight="solid"
      borderWidth={1}
      flex={1}
      p={3}
      borderColor="gray.200"
    >
      <Text fontWeight="bold" fontSize="lg" textAlign="right" mb={3}>
        Your Pages
      </Text>
      <hr />

      <Box textAlign="right" mt={3}>
        {loading && <Text textAlign="right">Loading..</Text>}
        {pagesList.map((page) => {
          if (isCurrentPage(page.slug)) {
            return (
              <Text px={5} py={1} bg="gray.200" borderRadius="5px" mb={1}>
                {page.title}
              </Text>
            );
          } else {
            return (
              <LinkStyle
                key={page.title}
                href={`/pages/${page.slug}`}
                border="solid"
                borderWidth={1}
                borderRadius="5px"
                px={5}
                py={1}
                display="block"
                mb={1}
                borderColor="gray.300"
              >
                {page.title}
              </LinkStyle>
            );
          }
        })}
      </Box>
    </Box>
  );
};

export default PageSidebarLeft;
