import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import LandingPageLayout from "./components/layout/LandingPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { Navigate } from "react-router-dom";
import ChatLayout from "./components/layout/ChatLayout";
const App = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center overflow-hidden">
      <Routes>
        <Route element={<LandingPageLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" replace />} />

        <Route path="/chat" element={<ChatLayout />}>
          <Route path="/chat" element={<ChatLayout />} />
          {/* <Route path="/chat/:id" element={<ChatLayout />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
