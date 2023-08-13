import React, { useState } from "react";
import { EditNote } from "../modals/EditNote";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../_store/notes.slice";
import Swal from "sweetalert2";
import { notificationActions } from "../_store/notification.slice";
import moment from "moment/moment";

const Card = ({ noteObj, index }) => {
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const { isArchived } = useSelector((x) => x.archiveNote);
    const colors = [
        {
            primaryColor: "#5D93E1",
            secondaryColor: "#ECF3FC",
        },
        {
            primaryColor: "#F9D288",
            secondaryColor: "#FEFAF1",
        },
        {
            primaryColor: "#5DC250",
            secondaryColor: "#F2FAF1",
        },
        {
            primaryColor: "#F48687",
            secondaryColor: "#FDF1F1",
        },
        {
            primaryColor: "#B964F7",
            secondaryColor: "#F3F0FD",
        },
    ];

    const toggle = () => {
        setModal(!modal);
    };

    const onArchiveNoteHandler = () => {
        // alert("ID A EDITAR " + noteObj.id);
        // alert("ID A EDITAR " + noteObj.title);

        //prueba de toast

        let noteUpdate = {
            id: noteObj.id,
            title: noteObj.title,
            description: noteObj.description,
            achived: "true",
            categoriesId: noteObj.categoriesId || [],
            updatedAt: noteObj.updatedAt,
        };

        //create note
        dispatch(notesActions.updateNote(noteUpdate)).then(() => {
            //getting all notes of this user
            dispatch(notesActions.getAllNoteOfUser()).then(() => {
                dispatch(notificationActions.successToast());
            });
        });
    };

    const unArchiveNoteHandler = () => {
        // alert("ID A EDITAR " + noteObj.id);
        // alert("ID A EDITAR " + noteObj.title);

        //prueba de toast

        let noteUpdate = {
            id: noteObj.id,
            title: noteObj.title,
            description: noteObj.description,
            achived: "false",
            categoriesId: noteObj.categoriesId || [],
            updatedAt: noteObj.updatedAt,
        };

        //create note
        dispatch(notesActions.updateNote(noteUpdate)).then(() => {
            //getting all notes of this user
            dispatch(notesActions.findAllByUserAchivedNote()).then(() => {
                dispatch(notificationActions.successToast());
            });
        });
    };

    const handleDelete = () => {
        Swal.fire({
            title: "Advertencia",
            text: "Está seguro que esea eliminar ese registro",
            icon: "error",
            showCancelButton: true,
            denyButtonText: "No",
            confirmButtonText: "Si",
        }).then((response) => {
            if (response.isConfirmed) {
                dispatch(notesActions.deleteNote(noteObj.id)).then(() => {
                    //getting all notes of this user
                    dispatch(notesActions.getAllNoteOfUser()).then(() => {
                        dispatch(notificationActions.successToast());
                    });
                });

                // alert("Voy a borrar");
            }
        });

        // alert("Michel este vas a borrar " + noteObj.id);
    };

    return (
        <div className="card-wrapper mr-5">
            <div
                className="card-top"
                style={{ backgroundColor: colors[index % 5].primaryColor }}
            ></div>
            <div className="task-holder">
                <span
                    className="card-header "
                    style={{
                        backgroundColor: colors[index % 5].secondaryColor,
                        borderRadius: "10px",
                    }}
                >
                    {noteObj.title}
                </span>
                {/* <p className="mt-1">{`Last edited ${moment(
                    Date.parse(noteObj.updatedAt),
                    "DD-MMM-YYYY"
                )}`}</p> */}
                {/* <p className="mt-1">{`Last edited ${noteObj.updatedAt}`}</p> */}

                {/* <p className="">{`Last edited ${noteObj.updatedAt}`}</p> */}

                <p className="mt-1">{`Last edited ${moment(
                    Date.parse(noteObj.updatedAt)
                ).format("DD/MMM/YYYY")}`}</p>

                <div
                    style={{
                        position: "absolute",
                        right: "20px",
                        bottom: "20px",
                    }}
                >
                    {isArchived && (
                        <i
                            style={{
                                color: colors[index % 5].primaryColor,
                                cursor: "pointer",
                                marginRight: "6px",
                            }}
                            className="fa-solid fa-upload mr-3"
                            onClick={unArchiveNoteHandler}
                        ></i>
                    )}

                    {!isArchived && (
                        <i
                            style={{
                                color: colors[index % 5].primaryColor,
                                cursor: "pointer",
                                marginRight: "6px",
                            }}
                            className="fa-solid fa-box-archive mr-3"
                            onClick={onArchiveNoteHandler}
                        ></i>
                    )}

                    <i
                        style={{
                            color: colors[index % 5].primaryColor,
                            cursor: "pointer",
                            marginRight: "6px",
                        }}
                        className="far fa-edit mr-3"
                        onClick={() => setModal(true)}
                    ></i>
                    <i
                        className="fas fa-trash-alt "
                        style={{
                            color: colors[index % 5].primaryColor,
                            cursor: "pointer",
                        }}
                        onClick={handleDelete}
                    ></i>
                </div>
            </div>
            <EditNote modal={modal} toggle={toggle} noteObj={noteObj} />
        </div>
    );
};

export default Card;
