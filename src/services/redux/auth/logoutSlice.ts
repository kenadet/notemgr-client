import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { ILogin } from "./loginSlice";

const initialState: ILogin = {
  loginData: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const logout = createAsyncThunk("auth/logout", async () => {
  return await authService.logout();
});

export const logoutSlice = createSlice({
  name: "logout",
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
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action: PayloadAction<void>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.loginData = null;
      })
      .addCase(logout.rejected, (state: ILogin, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.loginData = null;
      });
  },
});

export const { reset } = logoutSlice.actions;

export default logoutSlice;
