import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ILoginData,
  ICredentail as ICredential,
} from "../../../models/authData";
import authService from "./authService";

// Get user from localStorage
const auth = authService.getAuthData();

export interface ILogin {
  loginData: ILoginData | null;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: ILogin = {
  loginData: auth ? auth : null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

//Register user
export const login = createAsyncThunk(
  "auth/login",
  async (credential: ICredential, thunkAPI) => {
    try {
      return await authService.login(credential);
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

export const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
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
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<ILoginData>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.loginData = action.payload;
      })
      .addCase(login.rejected, (state: ILogin, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.loginData = null;
      });
  },
});

export const { reset } = loginSlice.actions;

export default loginSlice;
