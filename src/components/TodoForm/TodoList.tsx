import React from "react";

import { useFetchTodosQuery } from "../../api";

import { ITodo } from "../../interfaces";
import { Spiner } from "../Spiner/Spiner";
import { TodoItemList } from "./TodoListItem";

export const TodoList: React.FC = () => {
  const { data } = useFetchTodosQuery();

  return (
    <ul>
      {data ? (
        data.todos.map((todo: ITodo) => {
          return <TodoItemList key={todo.id} todo={todo} />;
        })
      ) : (
        <Spiner width="48px" height="48px" />
      )}
    </ul>
  );
};
