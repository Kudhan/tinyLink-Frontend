import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import Navbar from "./components/Navbar";
import { getToken } from "./lib/auth";
import Landing from "./pages/Landing"; // 👈 new hero page

function Protected({ children }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Navbar />
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          {/* Public hero / marketing page */}
          <Route path="/" element={<Landing />} />

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected app pages */}
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashbord />
              </Protected>
            }
          />

          <Route
            path="/links/:code"
            element={
              <Protected>
                <Stats />
              </Protected>
            }
          />

          {/* Optional: catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
