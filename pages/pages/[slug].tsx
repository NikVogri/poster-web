import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Page } from "../../interfaces/page";
import useApi from "../../components/hooks/useApi";
import withAuthentication from "../../components/hoc/withAuthentication";

import PageSidebarLeft from "../../components/page/PageSidebarLeft";
import PageSidebarRight from "../../components/page/PageSidebarRight";
import Todo from "../../components/todo/Todo";
import Notebook from "../../components/editor/Notebook";

const RootPage = ({ user }) => {
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const [pageData, setPageData] = useState<Page | null>(null);
  const router = useRouter();
  const { api } = useApi();

  useEffect(() => {
    if (router.query.slug) {
      getPageData();
    }
  }, [router.query.slug]);

  const getPageData = async () => {
    const { slug } = router.query;
    setPageLoading(true);
    try {
      const data = await api(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/${slug}`,
        "get",
        true
      );

      if (data.page) {
        setPageData(data.page);
      } else {
        router.back();
      }
    } catch (err) {
      setPageError(true);
    } finally {
      setPageLoading(false);
    }
  };

  if (pageLoading) {
    return <p>Page loading...</p>;
  }

  if (pageError) {
    return (
      <p>
        You are not allowed on this page, please ask the owner to add you as a
        member.
      </p>
    );
  }

  let editor: JSX.Element;
  switch (pageData.type) {
    case "notebook":
      editor = <Notebook data={pageData} />;
      break;
    case "todo":
      editor = <Todo data={pageData} />;
      break;
  }

  return (
    <Box display="flex" minH="calc(100vh - 71px)">
      <PageSidebarLeft />
      {editor}
      <PageSidebarRight
        members={pageData.members}
        pageSlug={pageData.slug}
        isOwner={user.id === pageData.owner.id}
        pageOwner={pageData.owner}
      />
    </Box>
  );
};

export default withAuthentication(RootPage);
