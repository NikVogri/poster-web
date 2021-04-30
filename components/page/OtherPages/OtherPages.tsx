import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./OtherPages.module.scss";
import Link from "next/link";

const OtherPages: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [pagesList, setPagesList] = useState([]);
	const router = useRouter();

	useEffect(() => {
		fetchUserPages();
	}, []);

	const fetchUserPages = async () => {
		try {
			setLoading(true);
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/all`,
				{ withCredentials: true }
			);

			setPagesList(res.data.pages);
		} catch (err) {
		} finally {
			setLoading(false);
		}
	};

	const isCurrentPage = (id: string) => {
		return id === router.query.id;
	};

	return (
		<aside className={`card ${styles.other__pages}`}>
			{loading ? (
				<p>loading</p>
			) : (
				<>
					<h3>Other Pages</h3>
					<ul>
						{pagesList.map((page) => {
							return isCurrentPage(page.id) ? (
								<li key={page.id}>{page.title}</li>
							) : (
								<li key={page.id}>
									<Link href={`/pages/${page.id}`}>
										<a>{page.title}</a>
									</Link>
								</li>
							);
						})}
					</ul>
				</>
			)}
		</aside>
	);
};

export default OtherPages;
