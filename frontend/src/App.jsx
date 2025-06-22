import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import LandingPageLayout from "./components/layout/LandingPage";
import HomePage from "./pages/landing/HomePage";
import AboutPage from "./pages/landing/AboutPage";
import ContactPage from "./pages/landing/ContactPage";
import { Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import VerifyEmail from "./pages/VerifyEmail";
import { useEffect } from "react";
import { useAuthStore } from "./store/auth.store";
import { useNavigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return null;

  return children;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return children;
};

const App = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center overflow-hidden">
      <Routes>
        <Route element={<LandingPageLayout />}>
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <LoginPage />
              </AuthRedirect>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRedirect>
                <Signup />
              </AuthRedirect>
            }
          />
          <Route
            path="/verify-email"
            element={
              <AuthRedirect>
                <VerifyEmail />
              </AuthRedirect>
            }
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
};

export default App;
