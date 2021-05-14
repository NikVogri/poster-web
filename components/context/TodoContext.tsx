import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Todo } from "../../interfaces/todo";
import useApi from "../hooks/useApi";

interface TodoContextInterface {
	todos: Todo[];
	fetchTodos: (pageId: string) => Promise<void>;
	setTodos: Dispatch<SetStateAction<Todo[]>>;
	fetchSingleTodo: (todoId: string) => Todo;
	updateSingleTodo: (todoId: string, updatedTodo: Todo) => void;
	loading: boolean;
}

export const TodoContext = createContext<TodoContextInterface>({
	todos: [],
	loading: false,
	fetchTodos: async (pageId: string) => {},
	fetchSingleTodo: (todoId: string) => {
		const todo: Todo = {
			headerColor: "#fff",
			items: [],
			id: "abc",
			title: "my first todo",
		};
		return todo;
	},
	updateSingleTodo: (todoId: string, updatedTodo: Todo) => {},
	setTodos: () => {},
});

const TodoProvider = ({ children }) => {
	const [todos, setTodos] = useState<Todo[]>(null);
	const { api, loading } = useApi();

	const fetchTodos = async (pageId: string) => {
		const res = await api(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/pages/${pageId}/todos`,
			"get",
			true
		);

		if (Array.isArray(res)) {
			setTodos(res);
		}
	};

	const fetchSingleTodo = (todoId: string) => {
		return todos.find((todo: Todo) => todo.id === todoId);
	};

	const updateSingleTodo = (todoId: string, updatedTodo: Todo) => {
		setTodos((oldTodos: Todo[]) => {
			return oldTodos.map((todo: Todo) =>
				todo.id === todoId ? updatedTodo : todo
			);
		});
	};

	return (
		<TodoContext.Provider
			value={{
				fetchTodos,
				loading,
				todos,
				setTodos,
				fetchSingleTodo,
				updateSingleTodo,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export default TodoProvider;
