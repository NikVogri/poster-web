import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { PageType } from "../../interfaces/page";
import useApi from "../../components/hooks/useApi";

import PageError from "../../components/page/PageError";

import styles from "../../styles/pages/Page.module.scss";

import PageLeftSide from "../../components/page/PageLeftSide/PageLeftSide";
import PageRightSide from "../../components/page/PageRightSide/PageRightSide";
import PageCenter from "../../components/page/PageCenter/PageCenter";
import { PageContext } from "../../components/context/PageContext";
import PageLoading from "../../components/UI/PageLoading/PageLoading";

const RootPage = () => {
	const { page, setCurrentPage, notebook, setCurrentNotebook } =
		useContext(PageContext);
	const router = useRouter();
	const { api, loading } = useApi();

	useEffect(() => {
		if (router.query.slug) {
			getPageData();
		}
	}, [router.query.slug]);

	const getPageData = async () => {
		const { slug } = router.query;
		setCurrentPage(null);
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
		return <PageLoading />;
	}

	return (
		<main className={styles.page}>
			<PageLeftSide />
			<PageCenter />
			<PageRightSide />
		</main>
	);
};

export default RootPage;
