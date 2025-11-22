import React, { useState } from "react";
import API from "../lib/api";
import { saveToken } from "../lib/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/api/auth/login", { email, password });
      saveToken(res.data.token);
      nav("/");
    } catch (e) {
      setErr(e.response?.data?.error || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
      {err && <div className="p-3 mb-3 bg-red-50 text-red-700 rounded">{err}</div>}
      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow-card">
        <label className="block mb-2 text-sm">Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 rounded-md border" />
        <label className="block mt-4 mb-2 text-sm">Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-3 rounded-md border" />
        <div className="mt-4 flex items-center justify-between">
          <button className="btn-primary" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
          <Link to="/register" className="text-sm text-neutral-600">Create account</Link>
        </div>
      </form>
    </div>
  );
}
