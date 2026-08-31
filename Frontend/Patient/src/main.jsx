import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

registerSW({
  onRegistered() {
    console.log("HealthVault PWA service worker registered");
  },
  onRegisterError(error) {
    console.error("PWA service worker registration failed:", error);
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);