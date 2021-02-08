import { Box, List, Flex, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { TodoItem } from "../../interfaces/todo";
import { v4 as uuid } from "uuid";

import TodoListItem from "./TodoListItem";

interface TodoCardProps {
  items: TodoItem[];
  id: string;
  addItem: (id: string, newTodoListItem: TodoItem) => void;
  removeItem: (id: string, removeItemId: string) => void;
  toggleComplete: (id: string, toggleItemId: string) => void;
}

const TodoCard = ({
  items,
  id,
  addItem,
  removeItem,
  toggleComplete,
}: TodoCardProps) => {
  const [inputContent, setInputContent] = useState("");
  const [endDate, setEndDate] = useState(new Date());

  const addTodoItemHandler = () => {
    const todoListItem: TodoItem = {
      id: uuid(),
      completedBy: null,
      completed: false,
      completedOn: null,
      content: inputContent,
      endDate: endDate,
    };

    addItem(id, todoListItem);
  };

  const removeItemHandler = (removeItemId: string) => {
    removeItem(id, removeItemId);
  };

  const toggleCompletedHandler = (toggleItemId: string) => {
    toggleComplete(id, toggleItemId);
  };

  return (
    <Box border="solid 1px #cecece" borderRadius={3} p={4}>
      <Box>
        <Flex pb={4}>
          <Input
            type="text"
            placeholder="Add Item"
            onChange={(e) => setInputContent(e.target.value)}
            value={inputContent}
          />
          {/* add select date here */}
          <Button ml={3} onClick={addTodoItemHandler}>
            Add
          </Button>
        </Flex>
        <List>
          {items.map((item: TodoItem) => (
            <TodoListItem
              key={item.id}
              id={item.id}
              completed={item.completed}
              completedBy={item.completedBy}
              completedOn={item.completedOn}
              content={item.content}
              endDate={item.endDate}
              removeItem={removeItemHandler}
              toggleCompleted={toggleCompletedHandler}
            />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default TodoCard;
