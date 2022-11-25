import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todosApi } from "../api";
import todoReducer from "./todoSlice";

const rootReducer = combineReducers({
  todoReducer,
  [todosApi.reducerPath]: todosApi.reducer,
});

const store = configureStore({
  reducer: {
    todos: rootReducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
