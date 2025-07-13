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
import ResetPassword from "./pages/auth/resetPassword";
import { socket } from "./lib/socket";
import { useUserStore } from "./store/user.store";

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
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?._id) {
      socket.emit("user_online", user._id);

      socket.on("update_online_users", (onlineUsers) => {
        useUserStore.setState({ onlineUserIds: onlineUsers });
      });
    }

    return () => {
      socket.off("update_online_users");
    };
  }, [user]);
  
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
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
          <Route
            path="/reset-password/:id"
            element={
              <AuthRedirect>
                <ResetPassword />
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
