import { EditorState } from "draft-js";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import useEditorSave from "../hooks/useEditorSave";

interface EditorContextInterface {
  editorState: EditorState;
  setEditorState: (newState: EditorState) => void;
  save: {
    saveEditorState: () => Promise<void>;
    saveIsAvailable: boolean;
    setSaveIsAvailable: Dispatch<SetStateAction<boolean>>;
    lastSaveTime: Date;
  };
}

export const EditorContext = createContext<EditorContextInterface>({
  editorState: EditorState.createEmpty(),
  setEditorState: (newState: EditorState) => {},
  save: {
    saveEditorState: async () => {},
    saveIsAvailable: false,
    setSaveIsAvailable: () => {},
    lastSaveTime: new Date(),
  },
});

const EditorProvider = ({ children }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  console.log(editorState);
  const save = useEditorSave(editorState);

  return (
    <EditorContext.Provider value={{ editorState, setEditorState, save }}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
