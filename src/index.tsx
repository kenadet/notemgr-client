import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fortawesome/fontawesome-free/js/all";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";
import { Provider } from "react-redux";
import { store } from "./services/redux/store";
import Header from "./components/Header";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
