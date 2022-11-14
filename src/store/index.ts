import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  reducers: {
    dataTodoList: todoReducers,
  },
});
export const store = configureStore(rootReducer);
