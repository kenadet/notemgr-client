import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "../services/redux/hooks";
import { RootState } from "../services/redux/store";
import { Note } from "../models/noteData";
import {
  createNote,
  reset,
  updateNote,
} from "../services/redux/notes/noteSplice";

const CreateOrEditNote = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { noteData, isError, isLoading, message } = useAppSelector(
    (state: RootState) => state.noteReducer
  );

  const noteId = location.state?.noteId;

  const [note, setNote] = useState<Note>({
    title: "",
    description: "",
    category: "General",
  });

  const [submitted, setSubmitted] = useState(false);

  const noteDetails = noteData?.notes.filter(
    (n) => n._id === noteId
  )[0] as Note;

  useEffect(() => {
    if (noteId) {
      setNote(noteDetails);
    }
    return;
    dispatch(reset());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitted(true);

    if (!note.title || !note.description || !note.category) {
      return;
    }

    if (noteId) {
      note._id = noteId;
      dispatch(updateNote(note));
      navigate("/notes");
    } else {
      dispatch(createNote(note));

      navigate("/notes");
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;

    setNote((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <h2 className="mb-4 text-center">
              {noteId ? "Edit Note" : "Create Note"}
            </h2>
            <div className="row d-flex justify-content-center">
              <div className="col-md-6 ms-auto">
                <Link to="/notes" className="float-end mb-4">
                  View Notes
                </Link>
              </div>
            </div>
            <form
              noValidate
              onSubmit={(e) => handleSave(e)}
              className={submitted ? "was-validated" : ""}
            >
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  id="title"
                  type="title"
                  name="title"
                  value={note?.title || ""}
                  placeholder="Title"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  required
                  maxLength={50}
                />
                <div className="invalid-feedback">Title is required.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  id="description1"
                  type="Description"
                  name="description"
                  value={note?.description || ""}
                  placeholder="description"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  required
                  maxLength={70}
                />
                <div className="invalid-feedback">Description is required.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={note?.category || "General"}
                  placeholder="category"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  required
                >
                  <option value="">--Select Category--</option>
                  <option value="General">General</option>
                  <option value="Professional">Professional</option>
                </select>
                <div className="invalid-feedback">Category is required.</div>
              </div>
              {isError && message && (
                <div className="alert alert-danger">{message}</div>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                Save | <i className="fas fa-save"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOrEditNote;
