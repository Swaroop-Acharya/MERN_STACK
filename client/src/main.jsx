import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "../node_modules/modern-normalize/modern-normalize.css";
import { BrowserRouter } from "react-router-dom";
import {AuthProvider} from "./store/auth.jsx";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
        <ToastContainer/>
      </React.StrictMode>
    </BrowserRouter>
  </AuthProvider>
);
