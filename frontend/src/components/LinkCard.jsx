import React from "react";
import dayjs from "dayjs";

export default function LinkCard({ link, onDelete }) {
  const copy = async () => {
    await navigator.clipboard.writeText(link.shortUrl);
    alert("Copied to clipboard");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-card flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-medium">{link.code}</div>
          <div className="text-sm text-neutral-500">{dayjs(link.createdAt).format('MMM D, YYYY')}</div>
        </div>
        <a href={link.target} target="_blank" rel="noreferrer" className="block text-sm text-primary-700 truncate mt-2">{link.target}</a>
        <div className="mt-2 text-sm text-neutral-600 flex items-center gap-3">
          <span>Clicks: <strong>{link.totalClicks}</strong></span>
          <span>Last: {link.lastClicked ? dayjs(link.lastClicked).fromNow() : "—"}</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button onClick={copy} className="btn-primary">Copy</button>
          <button onClick={() => onDelete(link.code)} className="px-3 py-2 rounded-xl border border-neutral-200 text-sm">Delete</button>
        </div>
      </div>
    </div>
  );
}
