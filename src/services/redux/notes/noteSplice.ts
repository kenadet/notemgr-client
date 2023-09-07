import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import noteService from "./noteService";
import { INoteData, Note } from "../../../models/noteData";
import { Pageable } from "../../../models/pageable";

export interface INote {
  noteData: INoteData | null;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: INote = {
  noteData: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

//Get Notes
export const getNotes = createAsyncThunk(
  "note/getNotes",
  async (pageable: Pageable, thunkAPI) => {
    try {
      return await noteService.getNotesByUser(pageable.page, pageable.limit);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNote = createAsyncThunk(
  "note/createNote",
  async (note: Note, thunkAPI) => {
    try {
      return await noteService.createNote(note);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateNote = createAsyncThunk(
  "note/updateNote",
  async (note: Note, thunkAPI) => {
    try {
      return await noteService.updateNote(note._id as string, note);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "note/deleteNote",
  async (id: string, thunkAPI) => {
    try {
      return await noteService.deleteNote(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState: initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getNotes.fulfilled,
        (state: INote, action: PayloadAction<INoteData>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.noteData = action.payload;
        }
      )
      .addCase(
        getNotes.rejected,
        (state: INote, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.noteData = null;
        }
      )
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action: PayloadAction<Note>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.noteData?.notes.push(action.payload);
      })
      .addCase(
        createNote.rejected,
        (state: INote, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(updateNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNote.fulfilled, (state, action: PayloadAction<Note>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(
        updateNote.rejected,
        (state: INote, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action: PayloadAction<Note>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.noteData?.notes.filter(
          (n) => n._id != action.payload._id
        ) as Note[];
      })
      .addCase(
        deleteNote.rejected,
        (state: INote, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.message = action.payload;
        }
      );
  },
});

export const { reset } = noteSlice.actions;

export default noteSlice;
