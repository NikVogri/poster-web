import "draft-js/dist/Draft.css";
import { Container, Box } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { EditorContext } from "../context/EditorContext";
import Editor from "./Editor";
import EditorToolbar from "./EditorToolbar";
import { convertFromRaw, EditorState } from "draft-js";

interface EditorPageProps {
  data: any;
}

const EditorPage = ({ data }: EditorPageProps) => {
  const { setEditorState, save } = useContext(EditorContext);

  useEffect(() => {
    window.onbeforeunload = function () {
      if (save.saveIsAvailable) {
        return "Please save before leaving the page.";
      }
      return undefined;
    };
  }, []);

  useEffect(() => {
    if (data.content) {
      // or else it's a new page
      const state = JSON.parse(data.content);
      setEditorState(EditorState.createWithContent(convertFromRaw(state)));
    }
  }, [data]);

  return (
    <Container maxWidth="55vw" width="100%">
      <Box bg="red" width="100%">
        <Box position="relative">
          <EditorToolbar />
          <Editor />
        </Box>
      </Box>
    </Container>
  );
};

export default EditorPage;
