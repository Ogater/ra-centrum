import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { TranslationProvider } from "./i18n/TranslationProvider.jsx";
import "./styles/index.scss";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </React.StrictMode>
);
