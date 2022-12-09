import React, { useState } from "react";
import styled from "styled-components";

import { ITodo } from "../../interfaces";

import {
  useCompletedFetchTodosMutation,
  useEditFetchTodosMutation,
  useRemoveFetchTodosMutation,
} from "../../api";

import { Spiner } from "../Spiner/Spiner";

interface IInputCheck {
  inputChecked: boolean;
  inputEditCheck: boolean;
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
  display: flex;
  justify-content: space-between;
  width: 500px;
  border: ${(props) =>
    props.inputEditCheck ? "1px black solid" : "1px grey solid"};
  border-radius: 10px;
  padding: 15px;
  margin-top: 10px;
  background: ${(props) => (props.inputChecked ? "green" : "#fff")};
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

  const [removeTodo, { isLoading: removeLoading }] =
    useRemoveFetchTodosMutation();

  const [completedTodo, { isLoading: completedLoading }] =
    useCompletedFetchTodosMutation();

  const [todoItemValue, setTodoItemValue] = useState<string>(props.todo.title);

  const handleTodoItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTodoItemValue(event.target.value);
  };

  const handleEditTodoItem = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    editTodo({ title: todoItemValue, id: props.todo.id });
  };
  console.log("props. :>> ", props.todo.completed);
  return (
    <TodoListContainer
      inputEditCheck={props.todo.completed}
      inputChecked={
        props.todo.completed
          ? !completedLoading && true
          : !completedLoading && false
      }
      key={props.todo.id}
    >
      <InputStyled
        className="material-icons"
        onClick={() => {
          completedTodo({
            id: props.todo.id,
            completed: !props.todo.completed,
          });
        }}
      >
        {completedLoading ? (
          <Spiner />
        ) : props.todo.completed ? (
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
          })
        }
        className="material-icons red-text"
      >
        {removeLoading ? <Spiner /> : <>delete</>}
      </IconDeleteStyled>
    </TodoListContainer>
  );
};
