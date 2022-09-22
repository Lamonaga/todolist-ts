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

const TodoListContainer = styled.ul<IInputCheck>`
  display: flex;
  justify-content: space-between;
  width: 500px;
  border: 1px grey solid;
  border-radius: 10px;
  padding: 15px;
  background: ${(props) => (props.inputChecked === true ? "red" : null)};
`;
const LiStyled = styled.li`
  list-style-type: none;
`;

const IconDeleteStyled = styled.i`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export const TodoList: React.FC<ITodos> = (props) => {
  const [inputChecked, setInputChecked] = useState<boolean>(false);

  const handleRemove = (id: number) => {
    props.removeTodo(id);
  };
  return (
    <div>
      {props.todos.map((todo) => {
        return (
          <TodoListContainer inputChecked={inputChecked} key={todo.id}>
            <InputStyled
              type="checkbox"
              defaultChecked={todo.completed}
              onClick={() => {
                props.onToggle(todo.id);
                setInputChecked(!inputChecked);
              }}
            />
            <LiStyled>{todo.title}</LiStyled>
            <IconDeleteStyled
              onClick={handleRemove.bind(null, todo.id)}
              className="material-icons red-text"
            >
              delete
            </IconDeleteStyled>
          </TodoListContainer>
        );
      })}
    </div>
  );
};
