import React, { useState } from "react";
import styled from "styled-components";
import { TodoForm } from "./components/TodoForm/TodoForm";
import { TodoList } from "./components/TodoForm/TodoList";
import { ITodo } from "./interfaces";

const AppContainerStyled = styled.div`
  align-items: center;
  width: 100%;
  margin: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);



  const addTodo = (title: string) => {
    const newTodo: ITodo = {
      title: title,
      id: Date.now(),
      completed: false,
    };
    setTodos((prev: ITodo[]) => [newTodo, ...prev]);
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onToggle = (id: number) => {
    todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
  };

  return (
    <AppContainerStyled>
      <TodoForm addTodo={addTodo} />
      <TodoList onToggle={onToggle} todos={todos} removeTodo={removeTodo} />
    </AppContainerStyled>
  );
};

export default App;
