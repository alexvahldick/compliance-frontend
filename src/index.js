import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Debugging logs
console.log("✅ React is starting...");
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("❌ ERROR: No root element found! Check your index.html.");
} else {
  console.log("✅ Root element found:", rootElement);
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
