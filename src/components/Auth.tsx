import RegisterForm from "./Register";
import LoginForm from "./Login";
import Header from "./Header";

const AuthPage = () => (
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

export default AuthPage;
