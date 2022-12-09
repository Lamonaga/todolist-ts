import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { myTheme } from "./my-them";

import App from "./App";

import "firebase/firestore";

import store from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={myTheme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>
);
reportWebVitals();
