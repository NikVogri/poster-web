import { convertFromRaw, EditorState } from "draft-js";
import { useRouter } from "next/router";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import createToast from "../../helpers/toast";
import useApi from "../hooks/useApi";
import useEditorSave from "../hooks/useEditorSave";

interface EditorContextInterface {
  editorState: EditorState;
  setEditorState: (newState: EditorState) => void;
  fetchEditorState: () => Promise<void>;
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
  fetchEditorState: async () => {},
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
  const save = useEditorSave(editorState);
  const { api } = useApi();
  const router = useRouter();

  const fetchEditorState = async () => {
    const { slug } = router.query;

    console.log("here trying to fetch");

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
      console.log(content);
      setEditorState(EditorState.createWithContent(convertFromRaw(content)));
    }
  };

  console.log(editorState);

  return (
    <EditorContext.Provider
      value={{ editorState, setEditorState, save, fetchEditorState }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
