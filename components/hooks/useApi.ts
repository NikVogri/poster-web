import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { responseErrorHandler } from "../../helpers/responseErrorHandler";
import { rejects } from "assert";

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
				setLoading(false);
				setData(res.data);
				resolve(res.data);
			} catch (err) {
				setLoading(false);
				setData(null);
				responseErrorHandler(err);
				resolve(err);
			}
		});
	};

	return { data, loading, api };
};

export default useApi;
