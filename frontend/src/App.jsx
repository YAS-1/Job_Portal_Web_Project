import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import ForgotPassword from "./components/forgotpassword";
import UserProfile from "./pages/UserProfile";
import "./App.css";
import "./components/cssFiles/componentsCSS.css";
import CreateJob from "./pages/createJob";
import ManageApplications from "./pages/ManageApplications";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<HomePage />} />
				<Route path='/home' element={<HomePage />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/login' element={<Login />} />
				<Route path='/login/forgotpassword' element={<ForgotPassword />} />
				<Route path='/profile' element={<UserProfile />} />
				<Route path='/create-job' element={<CreateJob />} />
				<Route path='/manage-applications' element={<ManageApplications />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
