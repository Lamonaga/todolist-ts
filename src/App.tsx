import React, { useEffect } from "react";
import styled from "styled-components";
import { TodoForm } from "./components/TodoForm/TodoForm";
import { TodoList } from "./components/TodoForm/TodoList";
import { useAppSelector, useAppDispatch } from "./hook";
import { fetchDataTodos } from "./store/todoSlice";

import { useFetchTodosQuery } from "./api";

const AppContainerStyled = styled.div`
  align-items: center;
  width: 100%;
  margin: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const App: React.FC = () => {
  const todos = useAppSelector((state) => state.todos.todoReducer.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDataTodos());
  }, [dispatch]);

  const { data } = useFetchTodosQuery();
  console.log(data);

  return (
    <AppContainerStyled>
      <TodoForm />
      <TodoList todos={todos} />
    </AppContainerStyled>
  );
};

export default App;
