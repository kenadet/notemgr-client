import { combineReducers, configureStore } from "@reduxjs/toolkit";
import regSlice from "./auth/regSlice";
import loginSlice from "./auth/loginSlice";
import { logoutSlice } from "./auth/logoutSlice";
import noteSlice from "./notes/noteSplice";

const rootReducer = combineReducers({
  regReducer: regSlice.reducer,
  loginReducer: loginSlice.reducer,
  logoutReducer: logoutSlice.reducer,
  noteReducer: noteSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
