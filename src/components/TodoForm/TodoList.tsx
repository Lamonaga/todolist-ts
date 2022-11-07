import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { ITodo } from "../../interfaces";
import { TodoItemList } from "./TodoListItem";

interface ITodos {
  todos: ITodo[];
  removeTodo(id: number): void;
  onToggle(id: number): void;
  onEdit(id: number, value: string): void;
}

export const TodoList: React.FC<ITodos> = (props) => {
  useEffect(() => {}, [props.todos]);

  return (
    <ul>
      {props.todos.map((todo) => {
        return (
          <TodoItemList
            key={todo.id}
            todo={todo}
            onToggle={props.onToggle}
            removeTodo={props.removeTodo}
            onEdit={props.onEdit}
          />
        );
      })}
    </ul>
  );
};
