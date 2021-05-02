import { Banner } from "./banner";
import { User } from "./user";

export enum PageType {
	Todo = "todo",
	Notebook = "notebook",
}
export interface Page {
	id: string;
	title: string;
	banner: Banner;
	content: JSON;
	private: boolean;
	owner: User;
	members: User[];
	deleted: boolean;
	updatedAt: Date;
	createdAt: Date;
	type: PageType;
}
