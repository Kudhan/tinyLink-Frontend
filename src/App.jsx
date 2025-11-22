import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import Navbar from "./components/Navbar";
import { getToken } from "./lib/auth";

function Protected({ children }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App(){
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Navbar />
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <Protected>
              <Dashboard />
            </Protected>
          }/>
          <Route path="/links/:code" element={
            <Protected>
              <Stats />
            </Protected>
          }/>
        </Routes>
      </main>
    </div>
  );
}
