import React, { useEffect } from "react";

import { useAppSelector } from "../../hook";
import { ITodo } from "../../interfaces";
import { TodoItemList } from "./TodoListItem";

interface ITodos {
  todos: ITodo[];
}

export const TodoList: React.FC<ITodos> = (props) => {
  const isLoading = useAppSelector((state) => state.todos.todoReducer.loading);

  useEffect(() => {}, [props.todos]);
  return (
    <ul>
      {!isLoading ? <div> LOADING</div> : null}
      {props.todos.map((todo: ITodo) => {
        return <TodoItemList key={todo.id} todo={todo} />;
      })}
    </ul>
  );
};
