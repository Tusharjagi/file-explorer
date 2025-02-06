import React from "react";
import ReactDOM from "react-dom/client";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import "./styles/index.css";
import App from "./components/App";
import ReduxProvider from "./store/providers/reduxProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </DndProvider>
  </React.StrictMode>
);
