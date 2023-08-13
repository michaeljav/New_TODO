import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth.slice";
import { usersReducer } from "./users.slice";
import { notesReducer } from "./notes.slice";
import { notificationReducer } from "./notification.slice";
import { archiveNoteReducer } from "./archiveNote.slice";

export * from "./auth.slice";
export * from "./users.slice";
export * from "./notes.slice";
export * from "./notification.slice";
export * from "./archiveNote.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        notes: notesReducer,
        notification: notificationReducer,
        archiveNote: archiveNoteReducer,
    },
});
