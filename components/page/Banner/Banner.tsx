import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Image } from "../../../interfaces/image";
import { PageType } from "../../../interfaces/page";
import { PageContext } from "../../context/PageContext";
import useApi from "../../hooks/useApi";

import ImageListModal from "../../modals/ImageListModal/ImageListModal";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import styles from "./Banner.module.scss";

const editSvg = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
	>
		<title>Edit</title>
		<g fill="none">
			<path
				d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
				opacity="1"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</g>
	</svg>
);

const Banner: React.FC = () => {
	const [openModal, setOpenModal] = useState(false);
	const [backgroundImage, setBackgroundImage] = useState(null);
	const { page, notebook } = useContext(PageContext);
	const { api, loading } = useApi();

	useEffect(() => {
		console.log(page);
		if (page.type === PageType.Notebook) {
			if (notebook.banner.url) {
				setBackgroundImage(notebook.banner.url);
			}
		} else if (page.type === PageType.Todo) {
			if (page.banner.url) {
				setBackgroundImage(page.banner.url);
			}
		}
	}, [page]);

	const handleBannerSelect = async (image: Image) => {
		setBackgroundImage(image.landscape);
		setOpenModal(false);

		// TODO: save banner decision to BE
		const params = {
			url: image.landscape,
		};

		if (page.type === PageType.Notebook) {
			params["notebookId"] = notebook.id;
		}

		await api(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/${page.id}/update-banner`,
			"put",
			true,
			params
		);
	};

	return (
		<>
			{loading ? (
				<div
					className={`${styles.page__banner} ${
						loading ? styles.loading : ""
					}`}
					style={{
						backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75),  rgba(0, 0, 0, 0.75)), url(${backgroundImage})`,
					}}
				>
					<LoadingSpinner size="md" />
				</div>
			) : (
				<div
					className={`${styles.page__banner} ${loading}`}
					style={{ backgroundImage: `url(${backgroundImage})` }}
				>
					<button
						className={styles.edit}
						onClick={() => setOpenModal(true)}
					>
						{editSvg}
					</button>
				</div>
			)}
			{openModal && (
				<ImageListModal
					handleImageSelect={handleBannerSelect}
					openModal={openModal}
					setOpenModal={setOpenModal}
				/>
			)}
		</>
	);
};

export default Banner;
