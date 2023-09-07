import React, { FormEvent, useState } from "react";
import { forgotPassword } from "../services/redux/auth/authService";
import Header from "./Header";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isEmptyMail, setIsEmptyMail] = useState(false);
  const [message, setMessage] = useState("");

  //<input name="x" value="y" onChange=(event) => handleChange(event)>
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setSubmitted(true);
    setMessage("");

    if (!email) {
      setIsEmptyMail(true);
      return;
    }

    forgotPassword(email).then((response) => {
      setMessage("A password reset link has been sent to you email");
    });
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4" style={{ color: "blue" }}>
            {message}
          </div>
        </div>
        <div className="row d-flex justify-content-center forgotpassword-mt">
          <div className="col-md-4">
            <form
              noValidate
              onSubmit={(e) => handleSubmit(e)}
              className={submitted ? "was-validated" : ""}
            >
              <div className="row ">
                <label htmlFor="email" className="form-label">
                  Enter signup email to reset password:
                </label>
              </div>
              <div className="input-group">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEmptyMail(false);
                    setMessage("");
                  }}
                  className="form-control"
                  required
                  maxLength={50}
                />
                <button
                  type="submit"
                  className="btn btn-primary mx-3"
                  id="button-addon2"
                >
                  Submit
                </button>
              </div>
              {isEmptyMail && (
                <div className="mt-2" style={{ color: "red" }}>
                  Email is required
                </div>
              )}
              <div className="row">
                <Link to="/login" className="navLogin">
                  Back to login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
