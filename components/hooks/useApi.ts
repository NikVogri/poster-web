import { useState } from "react";
import axios from "axios";
import createToast from "../../helpers/toast";

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const api = async (
    url: string,
    method: "post" | "put" | "get" | "delete",
    useCredentials: boolean,
    data?: object
  ) => {
    setLoading(true);
    try {
      const res = await axios({
        method,
        url,
        data,
        withCredentials: useCredentials,
      });
      setData(res.data);
      return res.data;
    } catch (err) {
      setData(null);
      console.log("error fetching", err);
      if (err.response.data?.error) {
        createToast("Something went wrong", err.response.data.error, "error");
      } else {
        createToast(
          "Something went wrong",
          "Could not complete your request at this time",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, api };
};

export default useApi;
