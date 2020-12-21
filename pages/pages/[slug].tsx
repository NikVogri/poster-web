import { useContext, useEffect, useState } from "react";
import useApi from "../../components/hooks/useApi";
import { AuthContext } from "../../components/context/AuthContext";
import { useRouter } from "next/router";
import createToast from "../../helpers/toast";
import useEditorAutosave from "../../components/hooks/useEditorAutosave";

import { Editor, EditorState, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { Box } from "@chakra-ui/react";
import EditorControlls from "../../components/EditorControlls";
import PageSidebar from "../../components/page/PageSidebar";
import Container from "../../components/partials/Container";

export default function page() {
  const { userLoading, user } = useContext(AuthContext);
  const [editorState, setEditorState] = useEditorAutosave();
  const { api } = useApi();
  const router = useRouter();

  useEffect(() => {
    console.log("here");
    if (user && router.query.slug) {
      fetchPage();
    }
  }, [user]);

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

    console.log(data);

    if (data?.page?.content) {
      const content = JSON.parse(data.page.content);
      setEditorState(EditorState.createWithContent(convertFromRaw(content)));
    }
  };

  if (userLoading) {
    return <p>Loading...</p>;
  }

  if (!userLoading && !user) {
    return <p>Login to continue</p>;
  }

  return (
    <Box display="flex" minH="calc(100vh - 71px)">
      <PageSidebar
        pagesList={[
          { title: "my first page", slug: "20b34feba445adf5ef34e41f" },
        ]}
      />
      <Container>
        <Box bg="red" width="100%">
          <Box mt={5} position="relative">
            <EditorControlls />
            <Box mt={3}>
              <Editor
                editorState={editorState}
                onChange={setEditorState}
                placeholder="Your page, your words."
              />
            </Box>
          </Box>
        </Box>
      </Container>
      <Box flex={1}></Box>
    </Box>
  );
}
