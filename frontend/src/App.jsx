import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import SignUp from "./pages/signup";
// import LoginLayout from "./pages/loginLayout";  // New Layout for Login & ForgotPassword
import Login from "./pages/login";
import ForgotPassword from "./components/forgotpassword";
import NoPage from "./pages/nopage";
import "./App.css";
import "./components/cssFiles/componentsCSS.css";
import UserAccountPanel from "./pages/account";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Nested Routes for Login & Forgot Password */}
        <Route path="/login" element={<Login />} />
          {/* <Route index element={<Login />} /> */}
        <Route path="/login/forgotpassword" element={<ForgotPassword />} />
        <Route path="/useraccount" element={<UserAccountPanel/>}/>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
