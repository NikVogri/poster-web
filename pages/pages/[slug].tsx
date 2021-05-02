import { Box } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Page, PageType } from "../../interfaces/page";
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
import { PageContext } from "../../components/context/PageContext";

const RootPage = () => {
	const { page, setCurrentPage, notebook, setCurrentNotebook } = useContext(
		PageContext
	);
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
			if (data.page.type === PageType.Notebook && !notebook) {
				setCurrentNotebook(data.page.notebooks[0]);
			}

			setCurrentPage(data.page);
		} else {
			router.back();
		}
	};

	if (!page && !loading) {
		return <PageError />;
	}

	if (loading) {
		return <p>Page loading...</p>;
	}

	let editor: JSX.Element;
	switch (page.type) {
		case "notebook":
			editor = <Notebook />;
			break;
		case "todo":
			editor = <Todo data={page} />;
			break;
	}

	console.log(page);
	console.log(notebook);

	return (
		<main className={styles.page}>
			<PageLeftSide />
			<PageCenter />
			<PageRightSide />
		</main>
	);
};

export default RootPage;
