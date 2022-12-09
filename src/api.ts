import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { db } from "./firebase";

import { ITodo } from "./interfaces";

interface IQueryTodo {
  todos: ITodo[];
}

interface IFetchTodo {
  id?: number;
  title?: string;
  completed?: boolean;
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
      providesTags: ["reqTodos"],
    }),

    removeFetchTodos: builder.mutation<{}, IFetchTodo>({
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
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData("fetchTodos", undefined, (draft) => {
            draft.todos = draft.todos.filter((element) => element.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
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
      invalidatesTags: ["reqTodos"],
    }),
    editFetchTodos: builder.mutation<{}, IFetchTodo>({
      async queryFn(todo) {
        try {
          const response = await db.collection("todoList").get();
          response.docs.forEach((doc) => {
            if (doc.data().id === todo.id) {
              doc.ref.update({
                title: todo.title,
              });
            }
          });
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["reqTodos"],
    }),
    completedFetchTodos: builder.mutation<{}, IFetchTodo>({
      async queryFn(todo) {
        let isCheckedResponse = true;
        try {
          const response = await db.collection("todoList").get();
          response.docs.forEach((doc) => {
            if (doc.data().id === todo.id) {
              doc.ref.update({
                completed: todo.completed,
              });
            }
          });

          return { data: isCheckedResponse };
        } catch (err) {
          return { error: err };
        }
      },
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData("fetchTodos", undefined, (draft) => {
            const item = draft.todos.find((element) => element.id === id);
            if (item) {
              item.completed = !item.completed;
              console.log("asdasd");
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useFetchTodosQuery,
  useRemoveFetchTodosMutation,
  useAddFetchTodosMutation,
  useEditFetchTodosMutation,
  useCompletedFetchTodosMutation,
  useLazyFetchTodosQuery,
} = todosApi;
