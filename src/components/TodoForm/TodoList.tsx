import React, { useEffect } from "react";
import { useFetchTodosQuery } from "../../api";

import { ITodo } from "../../interfaces";
import { TodoItemList } from "./TodoListItem";

export const TodoList: React.FC = () => {
  const { data } = useFetchTodosQuery();

  useEffect(() => {
  }, [data]);
  return (
    <ul>
      {data !== undefined ? (
        data.todos.map((todo: ITodo) => {
          return <TodoItemList key={todo.id} todo={todo} />;
        })
      ) : (
        <div> LOADING</div>
      )}
    </ul>
  );
};
