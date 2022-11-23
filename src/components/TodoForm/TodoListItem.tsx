import React, { useState } from "react";

import styled from "styled-components";

import { ITodo } from "../../interfaces";

import { useAppDispatch } from "../../hook";
import { onEdit, removeTodo, toggleComplete } from "../../store/todoSlice";

interface IInputCheck {
  inputChecked: boolean;
  inputEditCheck: boolean;
}

interface ITodoItem {
  todo: ITodo;
}

const InputStyled = styled.input``;

const TodoListContainer = styled.li<IInputCheck>`
  display: flex;
  justify-content: space-between;
  width: 500px;
  border: ${(props) =>
    props.inputEditCheck === true ? "2px black solid" : "1px grey solid"};
  border-radius: 10px;
  padding: 15px;
  margin-top: 10px;
  background: ${(props) => (props.inputChecked === true ? "green" : null)};
`;

const TitleInputStyled = styled.input`
  background: inherit;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;

const IconDeleteStyled = styled.i`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export const TodoItemList: React.FC<ITodoItem> = (props) => {
  const dispatch = useAppDispatch();

  const [todoItemValue, setTodoItemValue] = useState<string>(props.todo.title);

  const [inputEditCheck, setInputEditCheck] = useState<boolean>(false);

  const handleTodoItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTodoItemValue(event.target.value);
  };

  const handleEditTodoItem = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    const dataEdit = {
      id: props.todo.id,
      value: todoItemValue,
    };
    dispatch(onEdit(dataEdit));
    setInputEditCheck(false);
  };

  const func = (e: React.FocusEvent<HTMLInputElement>) => {
    setInputEditCheck(true);
  };
  return (
    <TodoListContainer
      inputEditCheck={inputEditCheck}
      inputChecked={props.todo.completed}
      key={props.todo.id}
    >
      <InputStyled
        type="checkbox"
        defaultChecked={props.todo.completed}
        onClick={() => {
          dispatch(toggleComplete(props.todo.id));
        }}
      />
      <TitleInputStyled
        onFocus={func}
        value={todoItemValue}
        type="text"
        onBlur={handleEditTodoItem}
        onChange={handleTodoItemChange}
      />
      <IconDeleteStyled
        onClick={() => dispatch(removeTodo(props.todo.id))}
        className="material-icons red-text"
      >
        delete
      </IconDeleteStyled>
    </TodoListContainer>
  );
};
