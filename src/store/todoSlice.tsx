import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { IDataEdit, ITodo } from "../interfaces";

interface TodosState {
  todos: ITodo[];
  loading: boolean;
}

const initialState: TodosState = {
  todos: [],
  loading: true,
};

export const fetchDataTodos = createAsyncThunk<ITodo[], void>(
  "todos/fetchDataTodos",
  async (_) => {
    const response: Promise<ITodo[]> = db
      .collection("todoList")
      .get()
      .then((querySnapshot) => {
        const data: ITodo[] = [];
        querySnapshot.forEach((doc) => {
          const item = doc.data() as ITodo;
          data.push(item);
        });
        return data;
      });
    const data = await response;
    console.log(data);
    return data;
  }
);

// const fetchRequestTodoItem = createAsyncThunk<ITodo, void>(
//   "todos/fetchRequestTodoItem",
//   async (_) => {
//     db.collection("todoList")
//       .add({
//         title: title,
//         id: Date.now(),
//         completed: false,
//       })
//       .then((docRef) => {
//         console.log("Document written with ID: ", docRef.id);
//       })
//       .catch((error) => {
//         console.error("Error adding document: ", error);
//       });
//   }
// );

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      db.collection("todoList")
        .add({
          title: action.payload,
          id: Date.now(),
          completed: false,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      state.todos.push({
        title: action.payload,
        id: Date.now(),
        completed: false,
      });
    },
    toggleComplete(state, action: PayloadAction<number>) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
      }
    },
    removeTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      db.collection("todoList")
        .get()
        .then((todos) => {
          todos.forEach((todoItem) => {
            todoItem.data() as ITodo;
            if (todoItem.data().id === action.payload) {
              todoItem.ref.delete();
            }
          });
        });
    },
    //ВОТ ТУТ НАДО ПОДУМАТЬ
    onEdit(state, action: PayloadAction<IDataEdit>) {
      state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.title = action.payload.value;
        }
        return todo;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataTodos.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchDataTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.loading = true;
    });
  },
});

export const { addTodo, toggleComplete, removeTodo, onEdit } =
  todoSlice.actions;

export default todoSlice.reducer;
