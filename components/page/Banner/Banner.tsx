import React, { useState } from "react";

import ImageListModal from "../../modals/ImageListModal/ImageListModal";
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

	const handleBannerSelect = async (image) => {
		setBackgroundImage(image.landscape);
		setOpenModal(false);

		// TODO: save banner decision to BE
	};

	return (
		<>
			<div
				className={styles.page__banner}
				style={{ backgroundImage: `url(${backgroundImage})` }}
			>
				<button
					className={styles.edit}
					onClick={() => setOpenModal(true)}
				>
					{editSvg}
				</button>
			</div>
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
