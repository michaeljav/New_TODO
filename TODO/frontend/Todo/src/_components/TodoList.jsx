import React, { useState, useEffect } from "react";
import { CreateNote } from "../modals/CreateNote";
import { useDispatch, useSelector } from "react-redux";
import { archiveNoteActions, notesActions } from "../_store/store";
import Card from "../_components/Card";
import { Link } from "react-router-dom";

export const TodoList = ({ isfiltered = false }) => {
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const { notes } = useSelector((x) => x.notes);
    const { data } = notes;
    const { isArchived } = useSelector((x) => x.archiveNote);

    useEffect(() => {
        //muestro todas las notas
        if (!isfiltered) {
            dispatch(notesActions.getAllNoteOfUser());
        } else {
            dispatch(notesActions.findAllByUserAchivedNote());
        }
    }, [isfiltered]);

    const toggle = () => {
        setModal(!modal);
    };

    const showArchivedNote = () => {
        dispatch(archiveNoteActions.archiveNote());
    };

    return (
        <>
            <div className="header-inline">
                <h1>My notes </h1>
                <span>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setModal(true)}
                    >
                        Create Note
                    </button>
                    {/* <Link to={`/hero/${id}`}>Mas..</Link> */}
                </span>
                <span>
                    {/* <Link to={`/hero`}>Archived notes</Link> */}
                    <button
                        type="button"
                        onClick={showArchivedNote}
                        className="btn btn-link"
                    >
                        {!isArchived
                            ? "Archived notes"
                            : "< Go back to  unarchived notes"}
                    </button>
                </span>
            </div>
            <div className="task-container">
                {data?.map((note, index) => (
                    <Card
                        key={note.id}
                        noteObj={note}
                        index={index}
                        deleteTask={() => {}}
                        updateListArray={() => {}}
                    />
                ))}
            </div>
            <CreateNote toggle={toggle} modal={modal} />
        </>
    );
};
