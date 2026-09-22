"use client";

const STATUS_OPTIONS = ["Upcoming", "Live", "Completed", "Cancelled"];

export default function StatusSelect({ value, onChange }) {
  return (
    <select
      value={value || "Upcoming"}
      onChange={(e) => onChange(e.target.value)}
      className="bg-slate-950 text-white border border-slate-700 text-xs px-2.5 py-1.5 rounded-md focus:outline-none focus:border-emerald-500 cursor-pointer"
      aria-label="Match Status"
    >
      {STATUS_OPTIONS.map((status) => (
        <option key={status} value={status} className="bg-slate-900 text-white">
          {status}
        </option>
      ))}
    </select>
  );
}