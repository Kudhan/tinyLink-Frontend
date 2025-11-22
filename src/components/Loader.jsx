import React from "react";

export default function Loader({ full }) {
  return (
    <div className={`${full ? "fixed inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm z-50" : "flex items-center justify-center p-6"}`}>
      <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-indigo-500 border-t-transparent"></div>
    </div>
  );
}
