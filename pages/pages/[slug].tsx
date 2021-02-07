import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Editor from "../../components/Editor";
import "draft-js/dist/Draft.css";
import { Box } from "@chakra-ui/react";
import EditorToolbar from "../../components/EditorToolbar";
import PageSidebarLeft from "../../components/page/PageSidebarLeft";
import PageSidebarRight from "../../components/page/PageSidebarRight";
import Container from "../../components/partials/Container";
import { EditorContext } from "../../components/context/EditorContext";
import useApi from "../../components/hooks/useApi";
import { convertFromRaw, EditorState } from "draft-js";
import { Page } from "../../interfaces/page";
import withAuthentication from "../../components/hoc/withAuthentication";

const EditorPage = ({ user }) => {
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const { setEditorState, save } = useContext(EditorContext);
  const [page, setPage] = useState<Page | null>(null);
  const router = useRouter();
  const { api } = useApi();

  useEffect(() => {
    if (router.query.slug) {
      getPageData();
    }
  }, [router.query.slug]);

  useEffect(() => {
    window.onbeforeunload = function () {
      if (save.saveIsAvailable) {
        return "Please save before leaving the page.";
      }
      return undefined;
    };
  }, []);

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
        setPage(data.page);

        if (data.page.content) {
          // or else it's a new page
          const state = JSON.parse(data.page.content);
          setEditorState(EditorState.createWithContent(convertFromRaw(state)));
        }
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
  switch (page.type) {
    case "notebook":
      editor = (
        <Container>
          <Box bg="red" width="100%">
            <Box position="relative">
              <EditorToolbar />
              <Editor />
            </Box>
          </Box>
        </Container>
      );
      break;
    case "todo":
      editor = (
        <Container>
          <Box bg="red" width="100%">
            <Box position="relative">todo list</Box>
          </Box>
        </Container>
      );
      break;
  }

  return (
    <Box display="flex" minH="calc(100vh - 71px)">
      <PageSidebarLeft />
      {editor}
      <PageSidebarRight
        members={page.members}
        pageSlug={page.slug}
        isOwner={user.id === page.owner.id}
        pageOwner={page.owner}
      />
    </Box>
  );
};

export default withAuthentication(EditorPage);
