import { BrowserRouter, Routes, Route } from "react-router-dom";

import Timeline from "./pages/Timeline";
import SignUp from "./pages/SignUp";

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
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
