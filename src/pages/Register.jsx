import React, { useState } from "react";
import API from "../lib/api";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../components/Toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // Toast state 👇
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });

  const nav = useNavigate();

  const triggerToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (loading) return;

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      triggerToast("Please enter a valid email address.", "error");
      setErr("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      triggerToast("Password must be at least 6 characters.", "error");
      setErr("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      triggerToast("Passwords do not match.", "error");
      setErr("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await API.post("/api/auth/register", { email, password });

      triggerToast("Registered successfully 🎉", "success");

      setTimeout(() => nav("/login"), 1500);
    } catch (e) {
      const msg = e.response?.data?.error || "Registration failed";
      setErr(msg);
      triggerToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Render Toast */}
      {toast.visible && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
            Create account
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Start shortening and tracking your links.
          </p>

          {err && (
            <div className="mt-4 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {err}
            </div>
          )}

          <form onSubmit={submit} className="mt-5 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 pr-12 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 pr-12 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-600"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <button
                className="btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create account"}
              </button>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
