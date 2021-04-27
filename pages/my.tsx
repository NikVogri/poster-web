import { Grid, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import withAuthentication from "../components/hoc/withAuthentication";
import useApi from "../components/hooks/useApi";
import PageCard from "../components/UI/PageCard/PageCard";
import Container from "../components/partials/Container/Container";

import styles from "../styles/pages/My.module.scss";
import AddPageCard from "../components/UI/AddPageCard/AddPageCard";

const plusIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="22"
		height="22"
		viewBox="0 0 448 512"
	>
		<title>Add new page</title>
		<g fill="#fff">
			<path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
		</g>
	</svg>
);

const Home = () => {
	const [pages, setPages] = useState([]);
	const { api } = useApi();

	useEffect(() => {
		fetchUserPages();
	}, []);

	const fetchUserPages = async () => {
		const res = await api(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/all`,
			"get",
			true
		);

		if (res) {
			setPages(res.pages);
		}
	};

	return (
		<Container>
			<h5 className={styles.heading}>My Pages</h5>
			{pages.length == 0 && (
				<p className={styles.no__found}>
					You don't have any pages yet, create one now!
				</p>
			)}
			<div className={styles.pages__container}>
				{pages
					.sort((a, b) => a.updatedAt - b.updatedAt)
					.map((page) => (
						<PageCard
							key={page.id}
							title={page.title}
							id={page.id}
							updatedAt={page.updatedAt}
							type={page.type}
							isPrivate={page.private}
							owner={page.owner}
							members={page.members}
						/>
					))}
				<AddPageCard />
			</div>
			<h5 className={styles.heading}>Pages you are member of</h5>
			{pages.length == 0 && (
				<p className={styles.no__found}>
					Pages that you are member of will show here.
				</p>
			)}
			<div className={styles.sticky__rb}>
				<Link href="/pages/new">{plusIcon}</Link>
			</div>
		</Container>
	);
};

export default withAuthentication(Home);
