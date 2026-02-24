import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { StoreProvider } from "./app/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/*
    The BrowserRouter is a Provider itself
    It must be at the top because it provides the "Navigation Context.  (like your Navbar, Link tags, or useNavigate hooks) */}
    <BrowserRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
