import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken, getToken } from "../lib/auth";

export default function Navbar(){
  const nav = useNavigate();
  const token = getToken();

  const logout = () => {
    removeToken();
    nav("/login");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white font-bold">T</div>
          <div className="text-lg font-semibold">TinyLink</div>
        </Link>
        <nav className="flex items-center gap-3">
          {token ? (
            <>
              <Link to="/" className="text-sm text-neutral-600 hover:text-neutral-800">Dashboard</Link>
              <button onClick={logout} className="text-sm text-neutral-600 hover:text-neutral-800">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-neutral-600 hover:text-neutral-800">Login</Link>
              <Link to="/register" className="text-sm text-neutral-600 hover:text-neutral-800">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
