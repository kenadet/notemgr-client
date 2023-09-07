import RegisterForm from "./Register";
import LoginForm from "./Login";
import Header from "./Header";
import { useAppDispatch } from "../services/redux/hooks";

import { useEffect } from "react";
import { reset } from "../services/redux/auth/loginSlice";
import { useLocation } from "react-router-dom";

const AuthPage = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") dispatch(reset());
  }, [dispatch, location]);

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
