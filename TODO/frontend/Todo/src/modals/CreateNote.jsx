import React, { useState, useEffect } from "react";
import { useForm } from "../hook/useForm";
import { notesActions } from "../_store/store";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const CreateNote = ({ modal, toggle }) => {
    const dispatch = useDispatch();

    const { title, description, onInputChange, onSetFormState } = useForm({
        title: "",
        description: "",
    });

    useEffect(() => {
        onSetFormState("title", "");
        onSetFormState("description", "");
    }, [modal]);

    const onCreateHandler = () => {
        let noteNew = {
            title: title,
            description: description,
            achived: "false",
            categoriesId: [],
        };
        //create note
        dispatch(notesActions.createNote(noteNew)).then(() => {
            //getting all notes of this user
            dispatch(notesActions.getAllNoteOfUser());
        });

        toggle();
    };
    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Note</ModalHeader>
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
                <Button color="primary" onClick={onCreateHandler}>
                    Create
                </Button>{" "}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};
