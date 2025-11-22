import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import API from "../lib/api";
import LinkCard from "../components/LinkCard";
import Loader from "../components/Loader";
import Toast from "../components/Toast";

const PAGE_SIZE = 9; // links per page

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState("");
  const [code, setCode] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const [page, setPage] = useState(1);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  const fetchLinks = useCallback(async () => {
    setLoading(true);
    try {
      // backend unchanged
      const res = await API.get("/api/links", { params: { q } });
      setLinks(res.data.data || []);
    } catch (e) {
      console.error(e);
      showToast("error", "Failed to load links");
    } finally {
      setLoading(false);
    }
  }, [q, refreshKey]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(links.length / PAGE_SIZE)),
    [links.length]
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedLinks = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return links.slice(start, start + PAGE_SIZE);
  }, [links, page]);

  const create = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/links", { target, code: code || undefined });
      setTarget("");
      setCode("");
      setRefreshKey((k) => k + 1);
      setPage(1);
      showToast("success", "Short link created");
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to create link";
      showToast("error", msg);
    }
  };

  const del = async (c) => {
    try {
      await API.delete(`/api/links/${c}`);
      setRefreshKey((k) => k + 1);
      showToast("success", "Link deleted");
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to delete link";
      showToast("error", msg);
    }
  };

  const handleSearchChange = (e) => {
    setQ(e.target.value);
    setPage(1);
  };

  const handleRefresh = () => {
    setRefreshKey((k) => k + 1);
  };

  const handlePrevPage = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleNextPage = () => {
    setPage((p) => Math.min(totalPages, p + 1));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-0">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Hero create form */}
      <section className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Create short links
            </p>
            <h2 className="mt-1 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              Shorten any URL — instant and trackable
            </h2>
          </div>
          <div className="hidden text-right text-xs sm:block">
            <p className="text-slate-500">Powered by TinyLink</p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-indigo-600">
              Owner dashboard
            </p>
          </div>
        </div>

        <form
          onSubmit={create}
          className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)]"
        >
          <input
            placeholder="Paste a long URL (https://...)"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
          <div className="flex flex-col gap-2">
            <input
              placeholder="Custom code (6–8 chars) optional"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <button className="btn-gradient w-full sm:w-auto" type="submit">
                Create Short Link
              </button>
              <button
                type="button"
                className="btn-outline w-full sm:w-auto"
                onClick={() => {
                  setTarget("");
                  setCode("");
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Filters */}
      <section className="flex flex-wrap items-center gap-3">
        <input
          placeholder="Search by code or target"
          value={q}
          onChange={handleSearchChange}
          className="min-w-[200px] flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
        <button onClick={handleRefresh} className="btn-outline">
          Refresh
        </button>
      </section>

      {/* Grid of cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full">
            <Loader />
          </div>
        ) : paginatedLinks.length ? (
          paginatedLinks
            .filter(Boolean)
            .map((l, idx) => (
              <LinkCard
                key={l.code || l.id || idx}
                link={l}
                onDelete={del}
                onRefresh={() => {
                  setRefreshKey((k) => k + 1);
                }}
                onNotify={showToast}
              />
            ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-white/70 p-6 text-center text-sm text-slate-500">
            No links yet — create one above.
          </div>
        )}
      </section>

      {/* Pagination footer */}
      {!loading && links.length > 0 && (
        <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
          <span>
            Page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                page === 1
                  ? "cursor-not-allowed border-slate-100 text-slate-300"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                page === totalPages
                  ? "cursor-not-allowed border-slate-100 text-slate-300"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              Next
            </buttn>
          </div>
        </div>
      )}
    </div>
  );
}
