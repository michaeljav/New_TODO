import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { history, fetchWrapper } from "../_helpers";

// create slice

const name = "note";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const notesActions = { ...slice.actions, ...extraActions };
export const notesReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        msg: "",
        notes: [],
        error: null,
    };
}

function createReducers() {
    return {
        logout,
    };

    function logout(state) {
        state.user = null;
        localStorage.removeItem("user");
        history.navigate("/login");
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}`;

    return {
        createNote: createNote(),
        getAllNoteOfUser: getAllNoteOfUser(),
        deleteNote: deleteNote(),
        updateNote: updateNote(),
        findAllByUserAchivedNote: findAllByUserAchivedNote(),
    };

    function findAllByUserAchivedNote() {
        return createAsyncThunk(
            `${name}/UpdateNote`,
            async () =>
                await fetchWrapper.get(`${baseUrl}/notes/findAllByUserAchived`)
        );
    }
    function updateNote() {
        return createAsyncThunk(
            `${name}/UpdateNote`,
            async (noteUpdate) =>
                await fetchWrapper.put(
                    `${baseUrl}/notes/${noteUpdate.id}`,
                    noteUpdate
                )
        );
    }

    function createNote() {
        return createAsyncThunk(
            `${name}/create`,
            async (noteNew) =>
                await fetchWrapper.post(`${baseUrl}/notes`, noteNew)
        );
    }

    function getAllNoteOfUser() {
        return createAsyncThunk(
            `${name}/getAllNoteOfUser`,
            async () => await fetchWrapper.get(`${baseUrl}/notes`)
        );
    }
    function deleteNote() {
        return createAsyncThunk(
            `${name}/deteleNote`,
            async (id) => await fetchWrapper.delete(`${baseUrl}/notes/${id}`)
        );
    }
}

function createExtraReducers() {
    return {
        ...createNote(),
        ...getAllNoteOfUser(),
        ...deleteNote(),
        ...updateNote(),
        ...findAllByUserAchivedNote(),
    };
    function findAllByUserAchivedNote() {
        var { pending, fulfilled, rejected } =
            extraActions.findAllByUserAchivedNote;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                const { msg } = action.payload;
                state.msg = msg;
                state.notes = action.payload;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            },
        };
    }
    function updateNote() {
        var { pending, fulfilled, rejected } = extraActions.updateNote;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                const { msg } = action.payload;
                state.msg = msg;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            },
        };
    }
    function deleteNote() {
        var { pending, fulfilled, rejected } = extraActions.deleteNote;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                const { msg } = action.payload;
                state.msg = msg;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            },
        };
    }

    function createNote() {
        var { pending, fulfilled, rejected } = extraActions.createNote;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                const { msg } = action.payload;
                state.msg = msg;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            },
        };
    }

    function getAllNoteOfUser() {
        var { pending, fulfilled, rejected } = extraActions.getAllNoteOfUser;
        return {
            [pending]: (state) => {
                state.users = { loading: true };
            },
            [fulfilled]: (state, action) => {
                // state.users = action.payload;

                state.notes = action.payload;
            },
            [rejected]: (state, action) => {
                state.users = { error: action.error };
            },
        };
    }
}
