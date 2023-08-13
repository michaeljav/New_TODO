import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// create slice

const name = "archiveNote";
const initialState = createInitialState();
const reducers = createReducers();

const slice = createSlice({ name, initialState, reducers });

// exports

export const archiveNoteActions = { ...slice.actions };
export const archiveNoteReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        isArchived: false,
        error: null,
    };
}

function createReducers() {
    return {
        archiveNote,
    };

    function archiveNote(state) {
        state.isArchived = !state.isArchived;
    }
}
