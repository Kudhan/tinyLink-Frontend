import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../lib/api";
import dayjs from "dayjs";
import Loader from "../components/Loader";
import Toast from "../components/Toast";

export default function Stats() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [err, setErr] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/api/links/${code}`)
      .then((r) => {
        setLink(r.data);
        setToast({ type: "success", message: "Stats loaded" });
      })
      .catch((e) => {
        console.error(e);
        setErr("Failed to load stats");
        setToast({ type: "error", message: "Unable to fetch stats!" });
      })
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) return <Loader full />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {err ? (
        <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {err}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <h3 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
            Stats — {link.code}
          </h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Target
              </div>
              <a
                href={link.target}
                className="break-words text-sm font-medium text-indigo-600 hover:text-indigo-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.target}
              </a>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Clicks
              </div>
              <div className="text-3xl font-bold text-slate-900">
                {link.totalClicks}
              </div>
              <div className="text-xs text-slate-500">
                Last clicked:
                {link.lastClicked
                  ? dayjs(link.lastClicked).format("YYYY-MM-DD HH:mm")
                  : "—"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
