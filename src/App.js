import { BrowserRouter, Routes, Route } from "react-router-dom";

import Timeline from "./pages/Timeline";
import SignUp from "./pages/SignUp";
import UserPage from "./pages/UserPage";
import HashtagPage from "./pages/Hashtags";
import { AuthProvider } from "./contexts/AuthContext";
import SignIn from "./pages/SignIn";

import "./assets/css/reset.css";
import "./assets/css/style.css";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/timeline" element={<Timeline />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/" element={<SignIn />} />
					<Route path="/user" element={<UserPage />} />
					<Route path="/hashtag/:hashtag" element={<HashtagPage />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
