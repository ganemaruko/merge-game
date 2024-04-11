import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from "~/app";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </RecoilRoot>
  </React.StrictMode>
);
