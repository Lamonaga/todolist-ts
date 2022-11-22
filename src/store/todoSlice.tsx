import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../interfaces";

interface TodosState {
  todos: ITodo[];
}

interface IDataEdit {
  id: number;
  value: string;
}

const initialState: TodosState = {
  todos: [],
};

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
});

export const { addTodo, toggleComplete, removeTodo, onEdit } =
  todoSlice.actions;

export default todoSlice.reducer;
