import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { ITodo } from "../../interfaces";

interface ITodos {
  todos: ITodo[];
  removeTodo(id: number): void;
  onToggle(id: number): void;
}

interface IInputCheck {
  inputChecked: boolean;
}

const InputStyled = styled.input``;

const TodoListContainer = styled.li<IInputCheck>`
  display: flex;
  justify-content: space-between;
  width: 500px;
  border: 1px grey solid;
  border-radius: 10px;
  padding: 15px;
  margin-top: 10px;
  background: ${(props) => (props.inputChecked === true ? "green" : null)};
`;

const TitleStyled = styled.input``;

const IconDeleteStyled = styled.i`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export const TodoList: React.FC<ITodos> = (props) => {
  useEffect(() => {}, [props.todos]);

  const handleRemove = (id: number) => {
    props.removeTodo(id);
  };
  return (
    <ul>
      {props.todos.map((todo) => {
        return (
          <TodoListContainer inputChecked={todo.completed} key={todo.id}>
            <InputStyled
              type="checkbox"
              defaultChecked={todo.completed}
              onClick={() => {
                props.onToggle(todo.id);
              }}
            />
            <TitleStyled value={todo.title} readOnly={true} />
            <IconDeleteStyled
              onClick={handleRemove.bind(null, todo.id)}
              className="material-icons red-text"
            >
              delete
            </IconDeleteStyled>
          </TodoListContainer>
        );
      })}
    </ul>
  );
};
