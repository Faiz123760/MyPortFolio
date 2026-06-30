import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css';

// Filter out annoying Three.js deprecation warnings from external packages (e.g. react-three-fiber, drei)
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === "string" &&
    (args[0].includes("THREE.Clock") || args[0].includes("PCFSoftShadowMap"))
  ) {
    return;
  }
  originalWarn(...args);
};


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
