import React, { useState } from "react";
import dayjs from "../lib/dayjs";

export default function LinkCard({ link, onDelete, onRefresh, onNotify }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  // safety: if link is missing, render nothing
  if (!link) return null;

  const copyShort = async () => {
    try {
      await navigator.clipboard.writeText(link.shortUrl);
      onNotify?.("success", "Short URL copied");
    } catch (err) {
      console.error("Failed to copy:", err);
      onNotify?.("error", "Could not copy short URL");
    }
  };

  const copyTarget = async () => {
    try {
      await navigator.clipboard.writeText(link.target);
      onNotify?.("success", "Target URL copied");
    } catch (err) {
      console.error("Failed to copy:", err);
      onNotify?.("error", "Could not copy target URL");
    }
  };

  const openShort = () => {
    if (!link?.shortUrl) return;
    window.open(link.shortUrl, "_blank", "noopener");
    if (onRefresh) {
      setTimeout(() => onRefresh(), 800);
    }
  };

  const handleDeleteClick = () => {
    if (!onDelete) return;

    if (!confirmDelete) {
      setConfirmDelete(true);
      onNotify?.("error", "Click delete again to confirm");
      setTimeout(() => setConfirmDelete(false), 2000);
      return;
    }

    onDelete(link.code);
    setConfirmDelete(false);
  };

  return (
    <article className="w-full rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <div className="flex gap-4">
        {/* avatar / icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-indigo-100 to-amber-50 text-sm font-semibold text-indigo-600 sm:h-20 sm:w-20">
          {link.code?.slice(0, 2).toUpperCase()}
        </div>

        {/* main content */}
        <div className="min-w-0 flex-1">
          {/* top row */}
          <div className="mb-1 flex items-center justify-between gap-2">
            <h3 className="truncate text-base font-semibold text-slate-900">
              {link.code}
            </h3>
            <span className="shrink-0 text-xs text-slate-500">
              {dayjs(link.createdAt).format("MMM D, YYYY")}
            </span>
          </div>

          {/* short + target */}
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={openShort}
              className="max-w-full truncate rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              title="Open short link"
            >
              {link.shortUrl}
            </button>
            <p className="min-w-0 flex-1 truncate text-xs text-slate-500">
              {link.target}
            </p>
          </div>

          {/* stats row */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            <div>
              Clicks:{" "}
              <span className="font-semibold text-indigo-600">
                {link.totalClicks}
              </span>
            </div>
            <div>
              Last:{" "}
              <span className="font-medium">
                {link.lastClicked ? dayjs(link.lastClicked).fromNow() : "—"}
              </span>
            </div>
            <div>
              Status:{" "}
              <span className="font-semibold">
                {link.deleted ? "Deleted" : "Active"}
              </span>
            </div>
          </div>

          {/* actions: two on top */}
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={copyShort}
              className="flex-1 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1.5 text-[11px] font-medium text-white hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 whitespace-nowrap"
            >
              Copy short
            </button>

            <button
              type="button"
              onClick={copyTarget}
              className="flex-1 inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 whitespace-nowrap"
            >
              Copy target
            </button>
          </div>

          {/* delete button alone at bottom */}
          <div className="mt-2">
            <button
              type="button"
              onClick={handleDeleteClick}
              className={`inline-flex w-full items-center justify-center rounded-full px-3 py-1.5 text-[11px] font-medium focus:outline-none focus:ring-2 whitespace-nowrap
                ${
                  confirmDelete
                    ? "border border-rose-500 bg-rose-50 text-rose-700 focus:ring-rose-200"
                    : "border border-rose-200 text-rose-600 hover:bg-rose-50 focus:ring-rose-200"
                }`}
            >
              {confirmDelete ? "Click again to delete" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
