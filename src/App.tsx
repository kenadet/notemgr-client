import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Notes from "./components/Notes";
import Auth from "./components/Auth";
import ForgotPassword from "./components/ForgotPassword";
import CreateOrEditNote from "./components/CreateOrEditNote";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/note" element={<CreateOrEditNote />} />
        <Route path="/note:noteId" element={<CreateOrEditNote />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
