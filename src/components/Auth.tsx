import RegisterForm from "./Register";
import LoginForm from "./Login";
import Header from "./Header";
import { useAppSelector } from "../services/redux/hooks";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../services/redux/store";

const AuthPage = () => {
  const navigate = useNavigate();

  const { loginData, isSuccess } = useAppSelector(
    (state: RootState) => state.loginReducer
  );

  useEffect(() => {
    if (isSuccess && loginData) {
      if (loginData.role === "User") navigate("/notes");
      else {
        if (loginData.role === "Admin") {
          navigate("/users");
        }
      }
    }
  }, [navigate, loginData, isSuccess]);

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row justify-content-between">
          <div className="col-md-6 px-5">
            <LoginForm />
          </div>

          <div className="col-md-6 border-start border-grey px-5">
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
