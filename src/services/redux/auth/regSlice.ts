import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IRegData, IUser } from "../../../models/authData";
import authService from "./authService";

export interface IRegistration {
  regData: IRegData | null;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: IRegistration = {
  regData: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

//Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user: IUser, thunkAPI) => {
    try {
      return await authService.register(user);
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

export const regSlice = createSlice({
  name: "reg",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<IRegData>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = true;
        state.regData = action.payload;
        state.message = action.payload.message;
      })
      .addCase(
        register.rejected,
        (state: IRegistration, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload;
          state.regData = null;
        }
      );
  },
});

export const { reset } = regSlice.actions;

export default regSlice;
