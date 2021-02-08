export interface TodoItem {
  id: string;
  completed: boolean;
  completedOn: Date;
  completedBy: number;
  content: string;
  endDate: Date;
}

export interface Todo {
  id: string;
  title: string;
  items: TodoItem[];
}
