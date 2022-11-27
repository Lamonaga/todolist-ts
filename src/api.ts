import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "./firebase";
import { ITodo } from "./interfaces";

interface IQueryTodo {
  todos: ITodo[];
}

export const todosApi = createApi({
  reducerPath: "reqTodos",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["reqTodos"],
  endpoints: (builder) => ({
    fetchTodos: builder.query<IQueryTodo, void>({
      async queryFn() {
        try {
          const response = await db.collection("todoList").get();
          const dataTodos: IQueryTodo = { todos: [] };
          response.docs.forEach((doc) => {
            const item = doc.data() as ITodo;
            dataTodos.todos.push(item);
          });
          return { data: dataTodos };
        } catch (err) {
          return { error: err };
        }
      },
    }),
  }),
});

export const { useFetchTodosQuery } = todosApi;
