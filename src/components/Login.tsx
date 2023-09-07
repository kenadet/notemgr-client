import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../services/redux/store";
import { useAppDispatch, useAppSelector } from "../services/redux/hooks";
import { login } from "../services/redux/auth/loginSlice";
import { ICredentail as ICredential } from "../models/authData";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { loginData, isLoading, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.loginReducer
  );

  const { email, password } = formData;

  useEffect(() => {
    if (isSuccess && loginData) {
      if (loginData.role === "User") navigate("/notes");
      else {
        if (loginData.role === "Admin") {
          navigate("/users");
        }
      }
    }
  }, [navigate, loginData, isLoading, isError, isSuccess, message]);

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setSubmitted(true);
      return;
    } else {
      const loginCredential: ICredential = {
        email,
        password,
      };
      setSubmitted(true);
      dispatch(login(loginCredential));
    }
  };

  return (
    <React.Fragment>
      <h1>Have an Account?</h1>
      <h4>Login here</h4>
      <br />

      <form
        noValidate
        onSubmit={handleLogin}
        className={submitted ? "was-validated" : ""}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            id="email1"
            type="email"
            name="email"
            value={email}
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
            id="password1"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
            className="form-control"
            required
          />
          <div className="invalid-feedback">Password is required.</div>
        </div>
        {message && (
          <div
            className={isSuccess ? "alert alert-success" : "alert alert-danger"}
          >
            {message}
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Login | <i className="fas fa-sign-in-alt"></i>
        </button>
      </form>
      <div className="mt-3">
        <Link
          to="/forgotpassword"
          style={{ textDecoration: "none", color: "blue" }}
        >
          Forgot password?{" "}
        </Link>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
