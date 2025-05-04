import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Topbar from "./components/topbar";
import LoginPage from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import LandingPageLayout from "./components/layout/LandingPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { Navigate } from "react-router-dom";
const App = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Routes>
        <Route element={<LandingPageLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
};

export default App;
