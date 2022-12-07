import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { ITodo } from "../../interfaces";

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

const InputStyled = styled.i`
  min-width: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodoListContainer = styled.li<IInputCheck>`
  min-height: 30px;
  display: ${(props) => (props.removeOpacityCheck === true ? "none" : "flex")};
  justify-content: space-between;
  width: 500px;
  border: ${(props) =>
    props.inputEditCheck ? "1px black solid" : "1px grey solid"};
  border-radius: 10px;
  padding: 15px;
  margin-top: 10px;
  background: ${(props) => (props.inputChecked ? "green" : null)};
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
  const [editTodo] = useEditFetchTodosMutation();

  const ref = useFetchTodosQuery();
  const [removeTodo, { isLoading: removeLoading }] =
    useRemoveFetchTodosMutation();

  const [completedTodo, { isLoading: completedLoading, status }] =
    useCompletedFetchTodosMutation();

  const [todoItemValue, setTodoItemValue] = useState<string>(props.todo.title);

  const [removeOpacity, setRemoveOpacity] = useState<boolean>(false);

  const handleTodoItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTodoItemValue(event.target.value);
  };

  const handleEditTodoItem = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    editTodo({ title: todoItemValue, id: props.todo.id });
  };
  return (
    <TodoListContainer
      inputEditCheck={props.todo.completed}
      removeOpacityCheck={removeOpacity}
      inputChecked={props.todo.completed}
      key={props.todo.id}
    >
      <InputStyled
        className="material-icons"
        onClick={async () => {
          console.log(!props.todo.completed);

          await completedTodo({
            id: props.todo.id,
            completed: !props.todo.completed,
          });
        }}
      >
        {completedLoading ? (
          <Spiner />
        ) : props.todo.completed && !completedLoading ? (
          <>check</>
        ) : (
          <>close</>
        )}
      </InputStyled>
      <TitleInputStyled
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
        {removeLoading ? <Spiner /> : <>delete</>}
      </IconDeleteStyled>
    </TodoListContainer>
  );
};
