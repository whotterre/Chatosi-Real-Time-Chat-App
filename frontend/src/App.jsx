import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {  MessagesSquare } from "lucide-react";
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
        <div className="flex flex-col items-center justify-center h-screen gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl  flex items-center justify-center shadow-md">
              <MessagesSquare className="w-7 h-7 text-primary animate-ping" />
            </div>
            <h1 className="text-2xl font-bold font-serif tracking-wide text-primary">
              Chatosi
            </h1>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={authUser ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/register"
              element={!authUser ? <RegisterPage /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route path="/settings" element={<SettingsPage />} />
            <Route
              path="/profile"
              element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
            />
          </Routes>
        </>
      )}
      <Toaster />
    </div>
  );
}
