import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { history, fetchWrapper } from "../_helpers";
import { toast } from "react-toastify";

// create slice

const name = "notification";
const initialState = createInitialState();
const reducers = createReducers();

const slice = createSlice({ name, initialState, reducers });

// exports

export const notificationActions = { ...slice.actions };
export const notificationReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        notifiction: null,
        error: null,
    };
}

function createReducers() {
    return {
        successToast,
    };

    function successToast(state) {
        toast("Acción exitosa", {
            className: "custom-Toast",
            draggable: true,
            position: toast.POSITION.TOP_RIGHT,
        });
    }
}
