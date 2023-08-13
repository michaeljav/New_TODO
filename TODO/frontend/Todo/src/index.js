import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { store } from "./_store/store";
import { App } from "./App";
// import "./index.css";
// import "./App.css";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
