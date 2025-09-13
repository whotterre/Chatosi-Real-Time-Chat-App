import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader, MessagesSquare } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

export default function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div data-theme={theme} className="min-h-screen">
      {isCheckingAuth && !authUser ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <Loader className="size-10 animate-spin" />
          <div className="flex gap-2 mt-2">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessagesSquare className="size-10 text-primary" />
            </div>
            <h1 className="text-xl font-serif font-bold">Chatosi</h1>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/register" element={!authUser ? <RegisterPage /> : <Navigate to="/" />} />
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          </Routes>
        </>
      )}
      <Toaster />
    </div>
  );
}
