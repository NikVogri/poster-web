export interface TodoItem {
	id: string;
	completed: boolean;
	completedOn: Date;
	completedBy: number;
	text: string;
	endDate: Date;
}

export interface Todo {
	id: string;
	title: string;
	headerColor: string;
	items: TodoItem[];
}
