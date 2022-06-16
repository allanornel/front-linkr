import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Timeline from "./pages/Timeline";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn"

import "./assets/css/reset.css";
import "./assets/css/style.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
