import React, { FormEvent, useState } from "react";
import { resetPassword } from "../services/redux/auth/authService";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const { token } = useParams<string>();

  //<input name="x" value="y" onChange=(event) => handleChange(event)>
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setSubmitted(true);
    setMessage("");

    if (!newPassword || !confirmPassword) {
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Password and Confirm password do not match,");
      return;
    }

    resetPassword(newPassword, token as string).then((response) => {
      if (response.data.error === "invalid reset link")
        setMessage("Invalid reset link,");

      if (response.data.message === "password updated successfully")
        setMessage("Password updated successfully,");
    });
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4" style={{ color: "blue" }}>
            {message} <Link to="/login">Login</Link>
          </div>
        </div>
        <div
          className="row d-flex justify-content-center"
          style={{ height: "200px" }}
        >
          <div className="col-md-4">
            <form
              noValidate
              onSubmit={(e) => handleSubmit(e)}
              className={submitted ? "was-validated" : ""}
            >
              <div className="forgotpassword-mt mb-3">
                <input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  placeholder="Password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setMessage("");
                  }}
                  className="form-control"
                  required
                  maxLength={30}
                />
              </div>
              <div className="mb-3">
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder="confirmPassword"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setMessage("");
                  }}
                  className="form-control"
                  required
                  maxLength={30}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                id="button-addon2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
