import { useContext, useEffect, useState } from "react";
import useApi from "../../components/hooks/useApi";
import { AuthContext } from "../../components/context/AuthContext";
import { useRouter } from "next/router";
import createToast from "../../helpers/toast";

import { Editor, EditorState, Modifier } from "draft-js";
import "draft-js/dist/Draft.css";
import { Box } from "@chakra-ui/react";

function insertCharacter(characterToInsert: string, editorState: EditorState) {
  const currentContent = editorState.getCurrentContent(),
    currentSelection = editorState.getSelection();

  Modifier.insertText(currentContent, currentSelection, characterToInsert);
}

export default function page() {
  const { userLoading, user } = useContext(AuthContext);
  const [page, setPage] = useState(null);
  const { api } = useApi();
  const router = useRouter();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (user) {
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
    }
    insertCharacter(`### Welcome to your page`, editorState);
  };

  if (userLoading) {
    return <p>Loading...</p>;
  }

  if (!userLoading && !user) {
    return <p>Login to continue</p>;
  }

  return (
    <Box bg="red" minH="calc(100vh - 70px)" width="100%">
      <Box mt={4}>
        <Editor editorState={editorState} onChange={setEditorState} />
      </Box>
    </Box>
  );
}
