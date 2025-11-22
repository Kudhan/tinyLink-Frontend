import React, { useEffect, useState, useCallback } from "react";
import API from "../lib/api";
import LinkCard from "../components/LinkCard";

export default function Dashboard(){
  const [links, setLinks] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState("");
  const [code, setCode] = useState("");

  const fetchLinks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get("/api/links", { params: { q }});
      setLinks(res.data.data);
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  }, [q]);

  useEffect(()=>{ fetchLinks(); }, [fetchLinks]);

  const create = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/links", { target, code: code || undefined });
      setTarget(""); setCode("");
      fetchLinks();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create");
    }
  };

  const del = async (c) => {
    if (!confirm("Delete this link?")) return;
    await API.delete(`/api/links/${c}`);
    fetchLinks();
  };

  return (
    <div className="space-y-6">
      <section className="bg-white p-6 rounded-xl shadow-card">
        <h3 className="font-semibold mb-3">Create a short link</h3>
        <form onSubmit={create} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input placeholder="https://example.com/..." value={target} onChange={e=>setTarget(e.target.value)} className="col-span-2 p-3 rounded-md border" />
          <input placeholder="custom code (6-8 chars)" value={code} onChange={e=>setCode(e.target.value)} className="p-3 rounded-md border" />
          <div className="sm:col-span-3 flex items-center gap-3">
            <button className="btn-primary">Create</button>
            <div className="text-sm text-neutral-500">Codes must be 6–8 letters/numbers</div>
          </div>
        </form>
      </section>

      <section className="flex items-center justify-between">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by code or target" className="p-3 rounded-md border w-full max-w-lg" />
        <button onClick={fetchLinks} className="ml-3 px-3 py-2 rounded-xl border">Search</button>
      </section>

      <section className="space-y-4">
        {loading ? <div>Loading...</div> : (
          links.length ? links.map(l => (
            <LinkCard key={l.code} link={l} onDelete={del} />
          )) : <div className="text-neutral-500">No links yet</div>
        )}
      </section>
    </div>
  );
}
