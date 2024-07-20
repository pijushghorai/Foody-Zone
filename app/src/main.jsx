import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createGlobalStyle } from "styled-components";

const GlobalStyled = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #323334;
    color: #ffffff;
    min-height: 100vh;
    font-family: "Inter", sans-serif;
  }
`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyled />
    <App />
  </React.StrictMode>
);

