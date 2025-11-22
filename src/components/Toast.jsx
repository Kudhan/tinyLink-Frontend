import React, { useEffect } from "react";

export default function Toast({ type = "success", message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed right-4 top-4 z-50 min-w-[200px] rounded-xl px-4 py-2 text-sm text-white shadow-lg animate-slide-in
      ${type === "error" ? "bg-rose-600" : "bg-indigo-600"}`}
    >
      {message}
    </dv>
  );
}
