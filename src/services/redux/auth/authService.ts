import axios from "axios";
import { BASE_API_URL } from "../../../common/constants";
import {
  ICredentail as ICredential,
  ILoginData,
  IRegData,
  IUser,
} from "../../../models/authData";

const USER_API_URL = `${BASE_API_URL}/api/users/`;

const register = async (user: IUser): Promise<IRegData> => {
  const response = await axios.post(USER_API_URL + "signup", user);

  return response.data;
};

const login = async (credential: ICredential): Promise<ILoginData> => {
  const response = await axios.post(USER_API_URL + "login", credential);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return JSON.parse(localStorage.getItem("user") as string) as ILoginData;
};

const logout = async (): Promise<void> => {
  localStorage.removeItem("user");
};

export const forgotPassword = (email: string) => {
  return axios.put(USER_API_URL + "forgotpassword", {
    email,
  });
};

export const resetPassword = (password: string, token: string) => {
  const config = {
    newPassword: password,
    resetLink: token,
  };
  return axios.put(USER_API_URL + "resetpassword", config);
};

export const setUser = (userData: any) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

const getAuthData = () =>
  JSON.parse(localStorage.getItem("user") as string) as ILoginData;

export const isAuthenticated = (): boolean => {
  return getAuthData()?.token ? true : false;
};

const authHeaders = () => {
  const auth = authService.getAuthData();

  return {
    "Content-Type": "application/json",
    authorization: `Bearer ${auth.token}`,
  };
};

const authService = {
  register,
  login,
  logout,
  getAuthData,
  authHeaders,
};

export default authService;
