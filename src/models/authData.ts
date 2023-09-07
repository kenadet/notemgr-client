export interface ILoginData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  token: string;
  expiresIn: string;
}

export interface IRegData {
  message: string;
}

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface ICredentail {
  email: string;
  password: string;
}
