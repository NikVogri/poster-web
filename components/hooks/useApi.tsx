import { useState } from "react";
import axios from "axios";
import createToast from "../../helpers/toast";

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (url: string, useCredentials: boolean) => {
    setLoading(true);
    try {
      const res = await axios.post(url, { withCredentials: useCredentials });
      setData(res.data);
      return res;
    } catch (err) {
      setData(null);
      console.log("error fetching", err);
      createToast(
        "Something went wrong",
        "Could not complete your request, please try again later",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const postData = async (
    url: string,
    data: object,
    useCredentials: boolean
  ) => {
    setLoading(true);
    try {
      const res = await axios.post(url, data, {
        withCredentials: useCredentials,
      });
      setData(res.data);

      return res;
    } catch (err) {
      setData(null);
      console.log("error posting", err);
      createToast(
        "Something went wrong",
        "Could not complete your request, please try again later",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, fetchData, postData };
};

export default useApi;
