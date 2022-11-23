import React, { useEffect } from "react";
import styled from "styled-components";
import { TodoForm } from "./components/TodoForm/TodoForm";
import { TodoList } from "./components/TodoForm/TodoList";
import { useAppSelector, useAppDispatch } from "./hook";
import { fetchDataTodos } from "./store/todoSlice";

const AppContainerStyled = styled.div`
  align-items: center;
  width: 100%;
  margin: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const App: React.FC = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();
  // const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    dispatch(fetchDataTodos());
  }, [dispatch]);

  // const addTodo = (title: string) => {
  //   const newTodo: ITodo = {
  //     title: title,
  //     id: Date.now(),
  //     completed: false,
  //   };
  //   setTodos((prev: ITodo[]) => [newTodo, ...prev]);

  //   db.collection("todoList")
  //     .add({
  //       title: title,
  //       id: Date.now(),
  //       completed: false,
  //     })
  //     .then((docRef) => {
  //       console.log("Document written with ID: ", docRef.id);
  //     })
  //     .catch((error) => {
  //       console.error("Error adding document: ", error);
  //     });
  // };

  // const onToggle = (id: number) => {
  //   setTodos(
  //     todos.map((todo) => {
  //       if (todo.id === id) {
  //         todo.completed = !todo.completed;
  //       }
  //       return todo;
  //     })
  //   );
  // };

  // const onEdit = (id: number, value: string) => {
  //   setTodos(
  //     todos.map((todo) => {
  //       if (todo.id === id) {
  //         todo.title = value;
  //       }
  //       return todo;
  //     })
  //   );
  // };

  return (
    <AppContainerStyled>
      <TodoForm />
      <TodoList todos={todos} />
    </AppContainerStyled>
  );
};

export default App;
