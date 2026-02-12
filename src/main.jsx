import React from "react";
import ReactDOM from "react-dom/client"; // Perhatikan /client ini
import App from "./App.jsx";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
