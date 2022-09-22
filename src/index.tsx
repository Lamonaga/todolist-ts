import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import { myTheme } from "./my-them";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={myTheme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);
reportWebVitals();
