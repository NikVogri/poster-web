import { Box } from "@chakra-ui/react";
import {
  EditorState,
  DraftEditorCommand,
  RichUtils,
  ContentBlock,
} from "draft-js";
import { Editor as DraftEditor } from "draft-js";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import CodeBlock from "./CodeBlock";
import { EditorContext } from "./context/EditorContext";

const Editor = () => {
  const { editorState, setEditorState, save } = useContext(EditorContext);

  const editorChangeHandler = (newState: EditorState) => {
    save.setSaveIsAvailable(true);
    setEditorState(newState);
  };

  const handleKeyCommand = (
    command: DraftEditorCommand,
    editorState: EditorState
  ) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  };

  const myBlockRenderer = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    if (type === "code-block") {
      return {
        component: CodeBlock,
        editable: false,
        props: {
          foo: "bar",
        },
      };
    }
  };

  return (
    <Box mt={3}>
      <DraftEditor
        blockRendererFn={myBlockRenderer}
        handleKeyCommand={handleKeyCommand}
        editorState={editorState}
        onChange={editorChangeHandler}
        placeholder="Your page, your words."
      />
    </Box>
  );
};

export default Editor;
