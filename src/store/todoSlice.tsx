import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { IDataEdit, ITodo, TodosState } from "../interfaces";

const initialState: TodosState = {
  todos: [],
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

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
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
    builder.addCase(fetchDataTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
  },
});

export const { addTodo, toggleComplete, removeTodo, onEdit } =
  todoSlice.actions;

export default todoSlice.reducer;
