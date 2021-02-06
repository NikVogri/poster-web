import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { responseErrorHandler } from "../../helpers/responseErrorHandler";

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const api = async (
    url: string,
    method: "post" | "put" | "get" | "delete",
    useCredentials: boolean,
    data?: object
  ): Promise<any> => {
    return new Promise(async (resolve) => {
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
        responseErrorHandler(err);
        return null;
      } finally {
        setLoading(false);
      }
    });
  };

  return { data, loading, api };
};

export default useApi;
