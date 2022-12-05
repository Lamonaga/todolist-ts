import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "./firebase";
import { ITodo } from "./interfaces";

interface IQueryTodo {
  todos: ITodo[];
}

interface IRemoveTodo {
  id: number;
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
    removeFetchTodos: builder.mutation<{}, IRemoveTodo>({
      async queryFn(todo) {
        try {
          const response = await db.collection("todoList").get();
          response.docs.forEach((doc) => {
            if (doc.data().id === todo.id) {
              doc.ref.delete();
            }
          });
          return { data: response };
        } catch (err) {
          return { error: err };
        }
      },
    }),
    addFetchTodos: builder.mutation<{}, ITodo>({
      queryFn(todo) {
        try {
          db.collection("todoList")
            .add({
              title: todo.title,
              id: Date.now(),
              completed: false,
            })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });

          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
    }),
  }),
});

export const {
  useFetchTodosQuery,
  useRemoveFetchTodosMutation,
  useAddFetchTodosMutation,
} = todosApi;
