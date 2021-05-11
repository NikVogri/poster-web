export interface TodoItem {
	id: string;
	completed: boolean;
	updatedAt: Date;
	createdAt: Date;
	text: string;
	endDate: Date;
}

export interface Todo {
	id: string;
	title: string;
	headerColor: string;
	items: TodoItem[];
}

export enum TodoItemUpdate {
	REMOVE = "remove",
	COMPLETE = "complete",
	UNCOMPLETE = "uncomplete",
}
