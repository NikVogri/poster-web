import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import { useRouter } from "next/router";

// import { Editor, EditorState, convertFromRaw } from "draft-js";
import Editor from "../../components/Editor";
import "draft-js/dist/Draft.css";
import { Box } from "@chakra-ui/react";
import EditorToolbar from "../../components/EditorToolbar";
import PageSidebarLeft from "../../components/page/PageSidebarLeft";
import PageSidebarRight from "../../components/page/PageSidebarRight";
import Container from "../../components/partials/Container";
import { EditorContext } from "../../components/context/EditorContext";

const EditorPage = () => {
  const { userLoading, user } = useContext(AuthContext);
  const { fetchEditorState, save } = useContext(EditorContext);
  const router = useRouter();

  useEffect(() => {
    if (user && router.query.slug) {
      console.log("fetch");
      fetchEditorState();
    }
  }, [user]);

  useEffect(() => {
    window.onbeforeunload = function () {
      if (save.saveIsAvailable) {
        return "Please save before leaving the page.";
      }
      return undefined;
    };
  }, []);

  if (userLoading) {
    return <p>Loading...</p>;
  }

  if (!userLoading && !user) {
    return <p>Login to continue</p>;
  }

  return (
    <Box display="flex" minH="calc(100vh - 71px)">
      <PageSidebarLeft />
      <Container>
        <Box bg="red" width="100%">
          <Box position="relative">
            <EditorToolbar />
            <Editor />
          </Box>
        </Box>
      </Container>
      <PageSidebarRight />
    </Box>
  );
};

export default EditorPage;
