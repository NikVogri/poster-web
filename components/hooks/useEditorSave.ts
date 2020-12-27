import { convertToRaw } from "draft-js";
import { useRouter } from "next/router";
import { useState } from "react";
import createToast from "../../helpers/toast";
import useApi from "./useApi";

const useEditorSave = (editorState) => {
  const [saveIsAvailable, setSaveIsAvailable] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(new Date());
  const router = useRouter();
  const { api } = useApi();

  const saveEditorState = async () => {
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
      createToast("Save", "Data saved successfully", "success");
      setSaveIsAvailable(false);
      setLastSaveTime(new Date());
    } else {
      createToast("Save", "Data could not be saved", "warning");
    }
  };

  return { saveEditorState, saveIsAvailable, setSaveIsAvailable, lastSaveTime };
};

export default useEditorSave;
