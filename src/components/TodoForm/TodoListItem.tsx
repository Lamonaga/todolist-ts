import React, { useState } from "react";

import styled, { keyframes } from "styled-components";

import { ITodo } from "../../interfaces";

import { useAppDispatch } from "../../hook";
import { onEdit, toggleComplete } from "../../store/todoSlice";
import { useFetchTodosQuery, useRemoveFetchTodosMutation } from "../../api";

interface IInputCheck {
  inputChecked: boolean;
  inputEditCheck: boolean;
  removeOpacityCheck: boolean;
}

interface ITodoItem {
  todo: ITodo;
}

const InputStyled = styled.input``;

const TodoListContainer = styled.li<IInputCheck>`
  display: ${(props) => (props.removeOpacityCheck === true ? "none" : "flex")};
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

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 1px solid grey;
  border-right: 1px solid grey;
  border-bottom: 1px solid grey;
  border-left: 1px solid black;
  background: transparent;
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;

export const TodoItemList: React.FC<ITodoItem> = (props) => {
  const dispatch = useAppDispatch();

  const [removeTodo, { isLoading }] = useRemoveFetchTodosMutation();

  const result = useFetchTodosQuery();

  const [todoItemValue, setTodoItemValue] = useState<string>(props.todo.title);

  const [inputEditCheck, setInputEditCheck] = useState<boolean>(false);

  const [removeOpacity, setRemoveOpacity] = useState<boolean>(false);

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
      removeOpacityCheck={removeOpacity}
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
        onClick={() =>
          removeTodo({
            id: props.todo.id,
          }).then(() => {
            setRemoveOpacity(true);
            result.refetch();
          })
        }
        className="material-icons red-text"
      >
        {isLoading ? <Spinner /> : <>delete</>}
      </IconDeleteStyled>
    </TodoListContainer>
  );
};
