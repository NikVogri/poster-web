import { Banner } from "./banner";

export interface Notebook {
	id: string;
	title: string;
	createdAt: Date;
	updatedAt: Date;
	banner: Banner;
}
