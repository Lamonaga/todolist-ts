import React, { useEffect } from "react";

import { ITodo } from "../../interfaces";
import { TodoItemList } from "./TodoListItem";

interface ITodos {
  todos: ITodo[];
}

export const TodoList: React.FC<ITodos> = (props) => {
  useEffect(() => {}, [props.todos]);
  return (
    <ul>
      {props.todos.map((todo: ITodo) => {
        return <TodoItemList key={todo.id} todo={todo} />;
      })}
    </ul>
  );
};
