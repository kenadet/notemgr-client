import RegisterForm from "./Register";
import LoginForm from "./Login";
import Header from "./Header";
import { useAppDispatch } from "../services/redux/hooks";

import { useEffect } from "react";
import { reset } from "../services/redux/auth/loginSlice";

const AuthPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

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
