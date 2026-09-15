"use client";

import React, { useState } from "react";
import { ShieldCheck, Users, Settings, Activity } from "lucide-react";

export default function AdminProfileContent({ initialData }) {
  const [adminData] = useState(initialData);

  return (
    <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
      
      {/* অ্যাডমিন হেডার */}
      <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6">
        <div className="bg-emerald-600/20 p-4 rounded-2xl border border-emerald-500/30 text-emerald-400">
          <ShieldCheck size={36} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{adminData.name}</h1>
          <p className="text-sm text-slate-400">{adminData.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs bg-emerald-900/50 text-emerald-400 px-3 py-0.5 rounded-full border border-emerald-700/50 font-medium">
              {adminData.role}
            </span>
            <span className="text-xs text-slate-400">
              Joined: {adminData.joinedDate}
            </span>
          </div>
        </div>
      </div>

      {/* স্ট্যাটিস্টিক্স / ওভারভিউ */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl flex items-center gap-3">
          <Users className="text-blue-400" size={24} />
          <div>
            <p className="text-xs text-slate-400">Total Players</p>
            <h3 className="text-lg font-bold text-white">{adminData.totalPlayers} Active</h3>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl flex items-center gap-3">
          <Activity className="text-purple-400" size={24} />
          <div>
            <p className="text-xs text-slate-400">System Status</p>
            <h3 className="text-lg font-bold text-emerald-400">{adminData.systemStatus}</h3>
          </div>
        </div>
      </div>

      {/* কন্ট্রোল অপশন */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-1">
          Admin Controls
        </h2>
        <button className="flex items-center justify-between w-full p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 text-white hover:bg-slate-800 transition">
          <span className="text-sm font-medium">Manage Club Players</span>
          <Settings size={18} className="text-slate-400" />
        </button>
      </div>

    </div>
  );
}