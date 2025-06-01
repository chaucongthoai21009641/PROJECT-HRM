import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import reportWebVitals from "./reportWebVitals";
import { App as AntdApp } from "antd"; // 👈 Ant Design App wrapper

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AntdApp>
      <App />
    </AntdApp>
  </StrictMode>
);
// reportWebVitals();
