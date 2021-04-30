import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Page } from "../../interfaces/page";
import useApi from "../../components/hooks/useApi";
import withAuthentication from "../../components/hoc/withAuthentication";

import OtherPages from "../../components/page/OtherPages/OtherPages";

import Todo from "../../components/todo/Todo";
import Notebook from "../../components/page/Notebook/Notebook";
import PageError from "../../components/page/PageError";

import styles from "../../styles/pages/Page.module.scss";

import PageLeftSide from "../../components/page/PageLeftSide/PageLeftSide";
import PageRightSide from "../../components/page/PageRightSide/PageRightSide";
import PageCenter from "../../components/page/PageCenter/PageCenter";

const RootPage = () => {
	const [pageData, setPageData] = useState<Page | null>(null);
	const router = useRouter();
	const { api, loading } = useApi();

	useEffect(() => {
		if (router.query.slug) {
			getPageData();
		}
	}, [router.query.slug]);

	const getPageData = async () => {
		const { slug } = router.query;
		const data = await api(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/${slug}`,
			"get",
			true
		);

		if (data.page) {
			setPageData(data.page);
		} else {
			router.back();
		}
	};

	if (!pageData && !loading) {
		return <PageError />;
	}

	if (loading) {
		return <p>Page loading...</p>;
	}

	let editor: JSX.Element;
	switch (pageData.type) {
		case "notebook":
			editor = <Notebook data={pageData} />;
			break;
		case "todo":
			editor = <Todo data={pageData} />;
			break;
	}

	console.log(pageData);

	return (
		<main className={styles.page}>
			<PageLeftSide />
			<PageCenter />
			<PageRightSide />
		</main>
	);
};

export default RootPage;
