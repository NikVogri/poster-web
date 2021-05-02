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
				console.log(res)
				setLoading(false);
				setData(res.data);
				resolve(res.data);
			} catch (err) {
				setLoading(false);
				setData(null);
				responseErrorHandler(err);
			}
		});
	};

	console.log(loading);
	return { data, loading, api };
};

export default useApi;
