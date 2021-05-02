import React, { useEffect, useState } from "react";

import axios from "axios";

import styles from "./PexelImageList.module.scss";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Image } from "../../../interfaces/image";

interface PexelImageListProps {
	onImageSelect: (image: Image) => void;
}

const PexelImageList: React.FC<PexelImageListProps> = ({ onImageSelect }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [imageList, setImageList] = useState<Image[]>([]);

	useEffect(() => {
		fetchImages();
	}, []);

	const fetchImages = async () => {
		try {
			setLoading(true);
			setError(null);

			const res = await axios.get(`https://api.pexels.com/v1/curated`, {
				headers: {
					Authorization:
						"Bearer " + process.env.NEXT_PUBLIC_PEXELS_KEY,
				},
			});

			const images = res.data.photos.map((image: any) => ({
				landscape: image.src.landscape,
				tiny: image.src.tiny,
				id: image.id,
				photographer: image.photographer,
			}));
			setImageList(images);
		} catch (err) {
			setError("Could not load images");
		} finally {
			setLoading(false);
		}
	};

	if (error) {
		return (
			<div className={styles.image__list}>
				<div className={styles.main__container}>
					<p>{error}</p>
					<button onClick={() => fetchImages()}>Retry</button>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.image__list}>
			{loading ? (
				<div className={styles.main__container}>
					<LoadingSpinner size="xlg" />
				</div>
			) : (
				<ul className={styles.image__container}>
					{imageList.map((image: Image) => (
						<li key={image.id}>
							<button onClick={() => onImageSelect(image)}>
								<img
									src={image.tiny}
									alt={image.photographer}
								/>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default PexelImageList;
