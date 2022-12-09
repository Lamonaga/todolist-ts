import React from "react";

import styled from "styled-components";

import { TodoForm } from "./components/TodoForm/TodoForm";
import { TodoList } from "./components/TodoForm/TodoList";

const AppContainerStyled = styled.div`
  align-items: center;
  width: 100%;
  margin: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const App: React.FC = () => {
  return (
    <AppContainerStyled>
      <TodoForm />
      <TodoList />
    </AppContainerStyled>
  );
};

export default App;
