import React, { useState } from "react";

import styled from "styled-components";

import { ITodo } from "../../interfaces";

interface IInputCheck {
  inputChecked: boolean;
}

interface ITodoItem {
  todo: ITodo;
  removeTodo(id: number): void;
  onToggle(id: number): void;
  onEdit(id: number, value: string): void;
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

export const TodoItemList: React.FC<ITodoItem> = (props) => {
  const [todoItemValue, setTodoItemValue] = useState<string>(props.todo.title);

  const handleRemove = (id: number) => {
    props.removeTodo(id);
  };

  const handleTodoItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setTodoItemValue(event.target.value);
  };

  const handleEditTodoItem = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault()
    props.onEdit(props.todo.id, todoItemValue);
  };
  return (
    <TodoListContainer inputChecked={props.todo.completed} key={props.todo.id}>
      <InputStyled
        type="checkbox"
        defaultChecked={props.todo.completed}
        onClick={() => {
          props.onToggle(props.todo.id);
        }}
      />
      <TitleStyled
        value={todoItemValue}
        type="text"
        onBlur={handleEditTodoItem}
        onChange={handleTodoItemChange}
      />
      <IconDeleteStyled
        onClick={handleRemove.bind(null, props.todo.id)}
        className="material-icons red-text"
      >
        delete
      </IconDeleteStyled>
    </TodoListContainer>
  );
};
