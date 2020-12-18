import { EditorState, convertToRaw } from "draft-js";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import createToast from "../../helpers/toast";
import useApi from "./useApi";

let autoSaveTimer;

const useEditorAutosave = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const router = useRouter();
  const { api } = useApi();

  useEffect(() => {
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }

    autoSaveTimer = setTimeout(saveData, 10000);
  }, [editorState]);

  const saveData = async () => {
    const { slug } = router.query;
    const jsonData = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    const res = await api(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/${slug}`,
      "put",
      true,
      { data: jsonData }
    );

    if (res?.success) {
      createToast("Autosave", "Data autosaved successfully", "success");
    }
  };

  return [editorState, setEditorState as any];
};

export default useEditorAutosave;
