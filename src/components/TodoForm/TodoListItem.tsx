import React, { useState } from "react";

import styled, { keyframes } from "styled-components";

import { ITodo } from "../../interfaces";

import { useAppDispatch } from "../../hook";
import { onEdit, toggleComplete } from "../../store/todoSlice";
import {
  useCompletedFetchTodosMutation,
  useEditFetchTodosMutation,
  useFetchTodosQuery,
  useRemoveFetchTodosMutation,
} from "../../api";
import { Spiner } from "../Spiner/Spiner";

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
  min-height: 30px;
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
  width: 100%;
  text-align: center;
  background: inherit;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;

const IconDeleteStyled = styled.i`
  min-width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export const TodoItemList: React.FC<ITodoItem> = (props) => {
  const dispatch = useAppDispatch();

  const [editTodo] = useEditFetchTodosMutation();

  const [removeTodo, { isLoading }] = useRemoveFetchTodosMutation();

  const [completedTodo] = useCompletedFetchTodosMutation();

  const [todoItemValue, setTodoItemValue] = useState<string>(props.todo.title);

  const [inputEditCheck, setInputEditCheck] = useState<boolean>(false);

  const [removeOpacity, setRemoveOpacity] = useState<boolean>(false);

  const handleTodoItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTodoItemValue(event.target.value);
  };

  const handleEditTodoItem = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    editTodo({ title: todoItemValue, id: props.todo.id });
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
          completedTodo({
            id: props.todo.id,
            completed: !props.todo.completed,
          });
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
          })
        }
        className="material-icons red-text"
      >
        {isLoading ? <Spiner /> : <>delete</>}
      </IconDeleteStyled>
    </TodoListContainer>
  );
};
