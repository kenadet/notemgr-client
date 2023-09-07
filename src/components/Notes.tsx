import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import { RootState } from "../services/redux/store";
import { useAppDispatch, useAppSelector } from "../services/redux/hooks";
import {
  deleteNote,
  getNotes,
  reset,
} from "../services/redux/notes/noteSplice";
import { Pageable } from "../models/pageable";
import { Note } from "../models/noteData";

const Notes = () => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { noteData, isError, message } = useAppSelector(
    (state: RootState) => state.noteReducer
  );

  const [noteDelId, setNoteDelId] = useState<string>("");

  useEffect(() => {
    const pageable = { page: 1, limit: 10 } as Pageable;

    dispatch(getNotes(pageable));

    return () => {
      dispatch(reset());
    };
  }, []);

  const handleEdit = (id: string) => {
    navigate("/note", {
      state: {
        noteId: id,
      },
    });
  };

  const handleShowConfirmDialog = (show: boolean, id: string) => {
    setShowConfirmDialog(show);
    setNoteDelId(id);
  };

  const handleDelete = () => {
    dispatch(deleteNote(noteDelId));
    const pageable = { page: 1, limit: 10 } as Pageable;
    dispatch(getNotes(pageable));
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12 p-0">
            <h2 className="mb-4 text-center">Notes</h2>
            <div className="row d-flex justify-content-center">
              <div className="col-md-6 ms-auto">
                <Link to="/note" className="float-end mb-4">
                  Create Note
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <td>Title</td>
                <td>Description</td>
                <td>Category</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {noteData &&
                noteData.notes.map((note: Note, i) => {
                  return (
                    <tr key={i}>
                      <td>{note.title}</td>
                      <td>{note.description}</td>
                      <td>{note.category}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => handleEdit(note._id as string)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() =>
                            handleShowConfirmDialog(true, note._id as string)
                          }
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div>
            <Modal
              show={showConfirmDialog}
              onHide={() => setShowConfirmDialog(false)}
              backdrop="static"
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this item?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={() => handleDelete()}>
                  Yes
                </Button>
                <Button
                  variant="danger"
                  onClick={() => setShowConfirmDialog(false)}
                >
                  No
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
