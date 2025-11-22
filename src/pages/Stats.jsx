import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../lib/api";
import dayjs from "dayjs";

export default function Stats(){
  const { code } = useParams();
  const [link, setLink] = useState(null);

  useEffect(()=>{
    API.get(`/api/links/${code}`).then(r => setLink(r.data)).catch(console.error);
  }, [code]);

  if(!link) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-card">
      <h3 className="text-xl font-semibold mb-4">Stats — {link.code}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-neutral-500">Target</div>
          <a href={link.target} className="block text-primary-600">{link.target}</a>
        </div>
        <div>
          <div className="text-sm text-neutral-500">Clicks</div>
          <div className="text-2xl font-bold">{link.totalClicks}</div>
          <div className="text-sm text-neutral-500 mt-2">Last clicked: {link.lastClicked ? dayjs(link.lastClicked).format("YYYY-MM-DD HH:mm") : "—"}</div>
        </div>
      </div>
    </div>
  );
}
