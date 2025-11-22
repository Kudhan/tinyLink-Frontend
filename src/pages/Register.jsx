import React, { useState } from "react";
import API from "../lib/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/auth/register", { email, password });
      nav("/login");
    } catch (e) {
      setErr(e.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-semibold mb-4">Create account</h2>
      {err && <div className="p-3 mb-3 bg-red-50 text-red-700 rounded">{err}</div>}
      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow-card">
        <label className="block mb-2 text-sm">Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 rounded-md border" />
        <label className="block mt-4 mb-2 text-sm">Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-3 rounded-md border" />
        <div className="mt-4">
          <button className="btn-primary">Create account</button>
          <Link to="/login" className="ml-4 text-sm text-neutral-600">Sign in</Link>
        </div>
      </form>
    </div>
  );
}
