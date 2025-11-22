import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken, getToken } from "../lib/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-extrabold text-white sm:h-11 sm:w-11">
            T
          </div>
          <span className="text-base font-extrabold tracking-tight text-slate-900">
            TinyLink
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-2 sm:gap-3 text-sm">
          {token ? (
            <>
              <Link
                to="/"
                className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 sm:text-sm"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 sm:text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full px-3 py-1.5 text-xs font-medium text-black-600 hover:bg-purple-600 sm:text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full px-3 py-1.5 text-xs font-medium text-black-600 hover:bg-purple-600 sm:text-sm"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
