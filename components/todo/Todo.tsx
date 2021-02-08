import { Container, Box, Text, Button, Flex, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Todo, TodoItem } from "../../interfaces/todo";
import TodoCard from "./TodoCard";
import { v4 as uuid } from "uuid";

interface TodoPageProps {
  data: any;
}

const TodoPage = ({ data }: TodoPageProps) => {
  const [todoCards, setTodoCards] = useState<Todo[]>([]);
  // const [titleInput, setTitleInput] = useState(""); // add later

  useEffect(() => {
    if (data.content) {
      setTodoCards(data.content);
    }
  }, [data]);

  console.log(todoCards);

  const addTodoCardHandler = () => {
    const newTodoCard: Todo = {
      id: uuid(),
      title: "",
      items: [],
    };

    const updatedTodoCardsList = [...todoCards, newTodoCard] as Todo[];
    // send api request to add another card to list
    setTodoCards(updatedTodoCardsList);
  };

  const addTodoItemHandler = (id: string, newTodoListItem: TodoItem) => {
    const updatedTodoCardsList = todoCards.map((card: Todo) => {
      if (card.id === id) {
        return {
          ...card,
          items: [...card.items, newTodoListItem],
        };
      } else {
        return card;
      }
    });

    setTodoCards(updatedTodoCardsList);
    // send api request to add another item to card
  };

  const removeTodoItemHandler = (id: string, removeItemId: string) => {
    const updatedTodoCardsList = todoCards.map((card: Todo) => {
      if (card.id === id) {
        return {
          ...card,
          items: card.items.filter(
            (todoItem: TodoItem) => todoItem.id !== removeItemId
          ),
        };
      } else {
        return card;
      }
    });

    setTodoCards(updatedTodoCardsList);
    // send api request to add another item to card
  };

  const toggleTodoItemHandler = (id: string, toggleItemId: string) => {
    const updatedTodoCardsList = todoCards.map((card: Todo) => {
      if (card.id === id) {
        return {
          ...card,
          items: card.items.map((todoItem: TodoItem) => {
            if (todoItem.id === toggleItemId) {
              todoItem.completed = !todoItem.completed;
            }
            return todoItem;
          }),
        };
      } else {
        return card;
      }
    });

    setTodoCards(updatedTodoCardsList);
    // send api request to add another item to card
  };

  console.log(todoCards);

  return (
    <Container maxWidth="55vw" width="100%">
      <Box bg="red" width="100%">
        <Box p={10}>
          <Flex position="relative" alignItems="center" pb={10}>
            <Button onClick={addTodoCardHandler} mr={3}>
              +
            </Button>
            <Text>Add a todo card</Text>
          </Flex>
          <Grid gridTemplateColumns="repeat(4, minmax(100px, 1fr))" gap={3}>
            {todoCards.map((card: Todo) => (
              <TodoCard
                items={card.items}
                key={card.id}
                id={card.id}
                addItem={addTodoItemHandler}
                removeItem={removeTodoItemHandler}
                toggleComplete={toggleTodoItemHandler}
              />
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
