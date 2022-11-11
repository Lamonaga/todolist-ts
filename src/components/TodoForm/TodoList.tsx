import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { db } from "../../firebase";

import { ITodo } from "../../interfaces";
import { TodoItemList } from "./TodoListItem";

interface ITodos {
  todos: ITodo[];
  removeTodo(id: number): void;
  onToggle(id: number): void;
  onEdit(id: number, value: string): void;
}

export const TodoList: React.FC<ITodos> = (props) => {
  useEffect(() => {
    db.collection("todoList")
      .add({
        title: "Ada",
        id: 123,
        completed: true,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }, [props.todos]);

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
