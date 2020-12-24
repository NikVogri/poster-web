import React, { useContext, useEffect, useState } from "react";
import useApi from "../../components/hooks/useApi";
import { AuthContext } from "../../components/context/AuthContext";
import { useRouter } from "next/router";
import createToast from "../../helpers/toast";
import useEditorSave from "../../components/hooks/useEditorSave";

import { Editor, EditorState, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { Box } from "@chakra-ui/react";
import EditorControlls from "../../components/EditorControlls";
import PageSidebarLeft from "../../components/page/PageSidebarLeft";
import PageSidebarRight from "../../components/page/PageSidebarRight";
import Container from "../../components/partials/Container";

export default function page() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const {
    saveEditorState,
    saveIsAvailable,
    lastSaveTime,
    setSaveIsAvailable,
  } = useEditorSave(editorState);
  const { userLoading, user } = useContext(AuthContext);
  const { api } = useApi();

  const router = useRouter();

  useEffect(() => {
    if (user && router.query.slug) {
      fetchPage();
    }
  }, [user]);

  useEffect(() => {
    window.onbeforeunload = function () {
      if (saveIsAvailable) {
        return "Please save before leaving the page.";
      }
      return undefined;
    };
  }, []);

  const fetchPage = async () => {
    const { slug } = router.query;

    const data = await api(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/${slug}`,
      "get",
      true
    );

    if (!data) {
      router.push("/");
      createToast(
        "Does not exist",
        "This page does not exist, if it should please contact the administrators",
        "error"
      );
      return;
    }

    if (data?.page?.content) {
      const content = JSON.parse(data.page.content);
      setEditorState(EditorState.createWithContent(convertFromRaw(content)));
    }
  };

  const editorChangeHandler = (e: EditorState) => {
    setSaveIsAvailable(true);
    setEditorState(e);
  };

  if (userLoading) {
    return <p>Loading...</p>;
  }

  if (!userLoading && !user) {
    return <p>Login to continue</p>;
  }

  return (
    <>
      <Box display="flex" minH="calc(100vh - 71px)">
        <PageSidebarLeft />
        <Container>
          <Box bg="red" width="100%">
            <Box position="relative">
              <EditorControlls
                savePage={saveEditorState}
                saveAvailable={saveIsAvailable}
              />
              <Box mt={3}>
                <Editor
                  editorState={editorState}
                  onChange={editorChangeHandler}
                  placeholder="Your page, your words."
                />
              </Box>
            </Box>
          </Box>
        </Container>
        <PageSidebarRight
          lastSave={lastSaveTime}
          saveIsAvailable={saveIsAvailable}
        />
      </Box>
    </>
  );
}
