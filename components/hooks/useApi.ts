import { useState } from "react";
import axios from "axios";
import createToast from "../../helpers/toast";
import { useRouter } from "next/router";

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const api = async (
    url: string,
    method: "post" | "put" | "get" | "delete",
    useCredentials: boolean,
    handleError: boolean,
    data?: object
  ): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      try {
        const res = await axios({
          method,
          url,
          data,
          withCredentials: useCredentials,
        });
        setData(res.data);
        resolve(res.data);
      } catch (err) {
        setData(null);
        if (handleError) {
          if (err.response.data?.error) {
            createToast(
              "Something went wrong",
              err.response.data.error,
              "error"
            );
          } else {
            createToast(
              "Something went wrong",
              "Could not complete your request at this time",
              "error"
            );
          }
        } else {
          reject(err);
        }
      } finally {
        setLoading(false);
      }
    });
  };

  return { data, loading, api };
};

export default useApi;
