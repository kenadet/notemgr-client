import { Container, Nav, NavLink, Navbar } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../services/redux/hooks";
import { RootState } from "../services/redux/store";
import { logout, reset } from "../services/redux/auth/logoutSlice";

const Header = () => {
  const { loginData } = useAppSelector(
    (state: RootState) => state.loginReducer
  );

  const dispatch = useAppDispatch();

  const logOut = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <div className="container">
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <i className="fas fa-book fa-2x"></i>
            <div className="vcenter">
              <span>NotesManager</span>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {loginData ? (
                <NavLink href="/login" onClick={logOut}>
                  <span className="white">
                    {loginData?.firstname +
                      " " +
                      loginData?.lastname +
                      ", you are logged in."}
                    &nbsp; &nbsp; <i className="fas fa-sign-out-alt"></i>
                  </span>
                </NavLink>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
