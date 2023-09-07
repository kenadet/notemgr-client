import React, { useState } from "react";
import { register, reset } from "../services/redux/auth/regSlice";
import { RootState } from "../services/redux/store";
import { IUser } from "../models/authData";
import { useAppDispatch, useAppSelector } from "../services/redux/hooks";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { isLoading, isSuccess, message } = useAppSelector(
    (state: RootState) => state.regReducer
  );

  const { firstname, lastname, email, password, confirmPassword } = formData;

  //<input name="x" value="y" onChange=(event) => handleChange(event)>
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      //e.g: prevState ({user: x, pass: x}) + newKeyValue ({user: xy}) => ({user: xy, pass: x})
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(reset);
    if (!email || !password || !confirmPassword || !firstname || !lastname) {
      setSubmitted(true);
      return;
    } else {
      const userData: IUser = {
        firstname,
        lastname,
        email,
        password,
      };
      setSubmitted(true);
      dispatch(register(userData));
    }
  };

  return (
    <React.Fragment>
      <h1>New User?</h1>
      <h4>Create an account</h4>
      <br />
      <form
        noValidate
        onSubmit={handleRegister}
        className={submitted ? "was-validated" : ""}
      >
        <div className="mb-3">
          <label htmlFor="Firstname" className="form-label">
            Firstname
          </label>
          <input
            id="firstname"
            type="firstname"
            name="firstname"
            value={formData.firstname}
            placeholder="Firstname"
            onChange={handleChange}
            className="form-control"
            required
          />
          <div className="invalid-feedback">Firstname is required.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="Lastname" className="form-label">
            Lastname
          </label>
          <input
            id="lastname"
            type="lastname"
            name="lastname"
            value={formData.lastname}
            placeholder="Lastname"
            onChange={handleChange}
            className="form-control"
            required
          />
          <div className="invalid-feedback">Lastname is required.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className="form-control"
            required
          />
          <div className="invalid-feedback">Email is required.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            className="form-control"
            required
          />
          <div className="invalid-feedback">Password is required.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            onChange={handleChange}
            className="form-control"
            required
          />
          <div className="invalid-feedback">Confirm password is required.</div>
          {confirmPassword !== password ? (
            <span className="text-xsm text-danger">
              Password and confirm password do not match.
            </span>
          ) : null}
        </div>
        {message && (
          <div
            className={isSuccess ? "alert alert-success" : "alert alert-danger"}
          >
            {message}
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Register | <i className="fas fa-user-plus"></i>
        </button>
      </form>
    </React.Fragment>
  );
}

export default RegisterForm;
