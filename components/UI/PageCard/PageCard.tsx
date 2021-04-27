import Link from "next/link";
import React from "react";
import { PageType } from "../../../interfaces/page";

import InitTimeAgo from "javascript-time-ago";

import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";

InitTimeAgo.getDefaultLocale();
InitTimeAgo.addLocale(en);

import styles from "./PageCard.module.scss";
import { User } from "../../../interfaces/user";
import { shortenText } from "../../../libs/shortenText";

interface PageItemProps {
	title: string;
	id: string;
	updatedAt: Date;
	type: PageType;
	isPrivate: boolean;
	owner: User;
	members: User[];
}

const PageCard = ({
	title,
	id,
	updatedAt,
	type,
	isPrivate,
	owner,
	members,
}: PageItemProps): JSX.Element => {
	return (
		<Link href={`/pages/${id}`}>
			<a className={styles.page__card}>
				{type === PageType.Todo && (
					<svg
						className={styles.background__svg}
						xmlns="http://www.w3.org/2000/svg"
						width="145"
						height="145"
						viewBox="0 0 512 512"
					>
						<g>
							<path d="M149.333 216v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-80c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zM125.333 32H24C10.745 32 0 42.745 0 56v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zm80 448H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm-24-424v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24zm24 264H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24z"></path>
						</g>
					</svg>
				)}
				{type === PageType.Notebook && (
					<svg
						className={styles.background__svg__type}
						xmlns="http://www.w3.org/2000/svg"
						width="22"
						height="22"
						viewBox="0 0 576 512"
					>
						<g>
							<path d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z"></path>
						</g>
					</svg>
				)}
				{isPrivate && (
					<div className={styles.background__svg__accessiblity}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="22"
							height="22"
							viewBox="0 0 24 24"
						>
							<g>
								<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
							</g>
						</svg>
					</div>
				)}

				<div className={styles.card__text}>
					<h3>{shortenText(title, 25)}</h3>
					<ReactTimeAgo date={new Date(updatedAt)} locale="en-US" />
				</div>

				<div className={styles.members}>
					<img src={owner.avatar} alt={owner.username} />
				</div>
			</a>
		</Link>
	);
};

export default PageCard;
