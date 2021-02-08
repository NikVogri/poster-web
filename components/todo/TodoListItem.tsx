import { ListItem, Flex, Checkbox, Text, Button } from "@chakra-ui/react";
import React from "react";
import { TodoItem } from "../../interfaces/todo";

interface TodoListItemProps extends TodoItem {
  removeItem: (removeItemId: string) => void;
  toggleCompleted: (toggleItemId: string) => void;
}

const TodoListItem = ({
  completed,
  completedOn,
  completedBy,
  content,
  endDate,
  id,
  toggleCompleted,
  removeItem,
}: TodoListItemProps) => {
  return (
    <ListItem>
      <Flex alignItems="start">
        <Checkbox
          mr={3}
          checked={completed}
          onChange={() => toggleCompleted(id)}
        />
        <Text>{content}</Text>
        <Button onClick={() => removeItem(id)}>remove</Button>
      </Flex>
    </ListItem>
  );
};

export default TodoListItem;
