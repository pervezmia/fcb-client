"use client";

import { useEffect, useState } from "react";

const pad = (n) => String(n).padStart(2, "0");

export default function MatchCountdown({ target }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = now === null ? null : new Date(target).getTime() - now;

  if (diff !== null && diff <= 0) {
    return (
      <p className="text-center text-sm font-bold text-emerald-400">
        Match day! Kick-off time has arrived.
      </p>
    );
  }

  const total = diff === null ? null : Math.floor(diff / 1000);
  const units = [
    ["Days", total === null ? "--" : pad(Math.floor(total / 86400))],
    ["Hours", total === null ? "--" : pad(Math.floor((total % 86400) / 3600))],
    ["Min", total === null ? "--" : pad(Math.floor((total % 3600) / 60))],
    ["Sec", total === null ? "--" : pad(total % 60)],
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {units.map(([label, value]) => (
        <div
          key={label}
          className="rounded-xl bg-slate-950/70 border border-slate-700/60 py-2 text-center"
        >
          <p className="text-xl font-black text-white tabular-nums">{value}</p>
          <p className="text-[10px] uppercase tracking-wider text-slate-400">{label}</p>
        </div>
      ))}
    </div>
  );
}