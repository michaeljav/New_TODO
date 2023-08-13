import React from "react";
import {
    Routes,
    Route,
    Navigate,
    useNavigate,
    useLocation,
} from "react-router-dom";

import { history } from "./_helpers";
import { Nav, PrivateRoute } from "./_components";
import { HomePage } from "./home/HomePage";
import { Login } from "./login";
import "./App.css";
export { App };
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Archived } from "./_components/Archived";
function App() {
    // init custom history object to allow navigation from
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();

    // toast.error("ohh");
    // toast.success("Exitoso");
    // toast.info("Ha sido informado");

    // const successToast = () => {
    //     toast("success custom Toast", {
    //         className: "custom-Toast",
    //         draggable: true,
    //         position: toast.POSITION.BOTTOM_RIGHT,
    //     });
    // };
    return (
        <>
            <ToastContainer />
            {/* <ToastContainer
                draggable={false}
                transition={Zoom}
                autoClose={8000}
            /> */}
            {/* <ToastContainer draggable={false} transition={Zoom} /> */}
            {/* <button onClick={successToast}>TOAST</button> */}
            <div className="app-container bg-light">
                <Nav />
                <div className="container pt-4 pb-4">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <HomePage />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="archived"
                            element={
                                <PrivateRoute>
                                    <Archived />
                                </PrivateRoute>
                            }
                        />

                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}
