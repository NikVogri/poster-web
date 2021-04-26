import { User } from "./user";

export enum PageType {
  Todo = "todo",
  Notebook = "notebook",
}; 
export interface Page {
  content: JSON;
  private: boolean;
  slug: string;
  updatedAt: Date;
  owner: User;
  members: User[];
  deleted: boolean;
  createdAt: Date;
  type: "notebook" | "todo";
}
