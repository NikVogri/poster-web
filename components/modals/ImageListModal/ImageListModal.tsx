import React from "react";
import BaseModal from "../../UI/BaseModal/BaseModal";
import PexelImageList from "../../UI/PexelImageList/PexelImageList";

import styles from "./ImageListModal.module.scss";

interface ImageListModalProps {
	openModal: boolean;
	setOpenModal: (open: boolean) => void;
	handleImageSelect: (image: any) => void;
}

const ImageListModal: React.FC<ImageListModalProps> = ({
	openModal,
	setOpenModal,
	handleImageSelect,
}) => {
	return (
		<BaseModal
			open={openModal}
			toggleOpen={setOpenModal}
			header={<h2>Select your banner image</h2>}
		>
			<div className={styles.image__list}>
				<p>
					Images provided by{" "}
					<a href="https://www.pexels.com">pexels</a>
				</p>
				<PexelImageList onImageSelect={handleImageSelect} />
			</div>
		</BaseModal>
	);
};

export default ImageListModal;
