import React, { useEffect, useState } from "react";
import { useForm } from "../hook/useForm";
import { notesActions, notificationActions } from "../_store/store";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";

export const EditNote = ({ modal, toggle, noteObj }) => {
    const dispatch = useDispatch();
    const { isArchived } = useSelector((x) => x.archiveNote);
    const { title, description, onInputChange, onSetFormState } = useForm({
        title: "",
        description: "",
    });

    useEffect(() => {
        onSetFormState("title", noteObj.title);
        onSetFormState("description", noteObj.description);
    }, [modal]);

    const onUpdateHandler = () => {
        // alert("ID A EDITAR " + noteObj.id);
        // alert("ID A EDITAR " + noteObj.title);

        //prueba de toast

        let noteUpdate = {
            id: noteObj.id,
            title: title,
            description: description,
            achived: noteObj.achived,
            categoriesId: [],
            updatedAt: moment().format("yyyy-MM-DD hh:mm:ss"),
        };
        //create note
        dispatch(notesActions.updateNote(noteUpdate)).then(() => {
            if (!isArchived) {
                //morar no archivados
                //getting all notes of this user
                dispatch(notesActions.getAllNoteOfUser()).then(() => {
                    dispatch(notificationActions.successToast());
                });
            } else {
                //archivados
                dispatch(notesActions.findAllByUserAchivedNote()).then(() => {
                    dispatch(notificationActions.successToast());
                });
            }
        });

        toggle();
    };
    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit Note</ModalHeader>
            <ModalBody>
                <form>
                    <div className="form-group">
                        <label htmlFor="title" className="mb-1">
                            Title Note
                        </label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={title}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="form-group mt-1 ">
                        <label htmlFor="description" className="mb-1">
                            Description
                        </label>
                        <textarea
                            rows="5"
                            name="description"
                            className="form-control"
                            value={description}
                            onChange={onInputChange}
                        ></textarea>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onUpdateHandler}>
                    Update
                </Button>{" "}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};
