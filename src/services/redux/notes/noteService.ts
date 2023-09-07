import axios from "axios";
import { BASE_API_URL } from "../../../common/constants";
import authService from "../auth/authService";
import { INoteData, Note } from "../../../models/noteData";

export const NOTE_API_URL = `${BASE_API_URL}/api/notes`;

const getNotesByUser = async (
  page: Number,
  limit: Number
): Promise<INoteData> => {
  const url = `${NOTE_API_URL}?page=${page}&limit=${limit}`;
  const response = await axios.get(url, { headers: authService.authHeaders() });

  return response.data;
};

const createNote = async (note: Note): Promise<Note> => {
  const response = await axios.post(NOTE_API_URL, note, {
    headers: authService.authHeaders(),
  });

  return response.data;
};

const updateNote = async (noteId: string, note: Note) => {
  const response = await axios.put(`${NOTE_API_URL}/${noteId}`, note, {
    headers: authService.authHeaders(),
  });

  return response.data;
};

const getNote = async (noteId: string) => {
  const response = await axios.get(`${NOTE_API_URL}/${noteId}`, {
    headers: authService.authHeaders(),
  });

  return response.data;
};

const deleteNote = async (noteId: string) => {
  const response = await axios.delete(`${NOTE_API_URL}/${noteId}`, {
    headers: authService.authHeaders(),
  });

  return response.data;
};

const noteService = {
  getNotesByUser,
  createNote,
  updateNote,
  getNote,
  deleteNote,
};

export default noteService;
