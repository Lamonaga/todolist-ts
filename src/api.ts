import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "./firebase";
import { ITodo } from "./interfaces";

interface IQueryTodo {
  todos: ITodo[];
}

export const todosApi = createApi({
  reducerPath: "todos",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["todos"],
  endpoints: (builder) => ({
    fetchTodos: builder.query<IQueryTodo, void>({
      queryFn() {
        try {
          console.log("asdasdasdasdasd");
          const response: Promise<IQueryTodo> = db
            .collection("todoList")
            .get()
            .then((querySnapshot) => {
              const dataTodos: IQueryTodo = { todos: [] };
              querySnapshot.forEach((doc) => {
                const item = doc.data() as ITodo;
                dataTodos.todos.push(item);
              });
              return dataTodos;
            });
          const dataTodos = response;
          return { data: dataTodos };
        } catch (err) {
          return { error: err };
        }
      },
    }),
  }),
});

export const { useFetchTodosQuery } = todosApi;
