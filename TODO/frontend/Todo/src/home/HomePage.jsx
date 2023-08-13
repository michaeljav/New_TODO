import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { archiveNoteActions, userActions } from "../_store/store";
import { TodoList } from "../_components/TodoList";

export { HomePage };

function HomePage() {
    const dispatch = useDispatch();
    const { user: authUser } = useSelector((x) => x.auth);
    const { users } = useSelector((x) => x.users);
    const { isArchived } = useSelector((x) => x.archiveNote);

    useEffect(() => {
        dispatch(userActions.getAll());

        // eslint-disable-next-line
    }, []);

    return (
        <>
            <TodoList isfiltered={isArchived} />
            {/*  <div>
            
           <h3>Users from secure api end point:</h3>
            {users.length && (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.firstName} {user.lastName}
                        </li>
                    ))}
                </ul>
            )}
            {users.loading && (
                <div className="spinner-border spinner-border-sm"></div>
            )}
            {users.error && (
                <div className="text-danger">
                    Error loading users: {users.error.message}
                </div>
            )}
        </div> */}
        </>
    );
}
