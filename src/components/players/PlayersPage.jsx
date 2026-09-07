"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";

export default function PlayersPage({ players }) {
  const safePlayers = Array.isArray(players) ? players : [];
  const [activeTab, setActiveTab] = useState("All");

  // ক্যাটাগরি অনুযায়ী প্লেয়ারদের গ্রুপিং করা
  const groupedCategories = safePlayers.reduce((acc, player) => {
    const title = player.title || player.position || "Squad Members";
    if (!acc[title]) {
      acc[title] = [];
    }
    acc[title].push(player);
    return acc;
  }, {});

  // ট্যাব ফিল্টারিং লজিক
  const categoriesToDisplay = activeTab === "All" 
    ? Object.keys(groupedCategories).map((title) => ({ title, players: groupedCategories[title] }))
    : [{ title: activeTab, players: groupedCategories[activeTab] || [] }];

  const tabs = ["All", ...Object.keys(groupedCategories)];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      
      {/* Top Header Title Bar (Project Theme Matching) */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-8 shadow-lg">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-8 bg-blue-600 rounded-full"></span>
            <h1 className="text-3xl font-black tracking-tight uppercase text-white">Teams & Squad</h1>
          </div>
          <p className="text-sm text-slate-400">Explore the official player rosters and categories of FC Boraitola.</p>

          {/* Filter Sub-Tabs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeTab === tab
                    ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-900/30"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Squad Listing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {safePlayers.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 font-medium">No players found in the database.</p>
          </div>
        ) : (
          categoriesToDisplay.map((category, idx) => (
            category.players.length > 0 && (
              <div key={idx} className="space-y-6">
                
                {/* Category Title */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h2 className="text-xl font-extrabold text-white tracking-wide">
                    {category.title}
                  </h2>
                  <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full font-semibold border border-slate-700/50">
                    {category.players.length} Players
                  </span>
                </div>

                {/* Grid of Player Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5">
                  {category.players.map((player) => (
                    <Link 
                      href={`/players/${player._id}`}
                      key={player._id}
                      className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-blue-500/10"
                    >
                      {/* Card Header (Photo Container with Jersey Number) */}
                      <div className="relative w-full aspect-[4/5] bg-slate-800 overflow-hidden flex items-end justify-center">
                        {/* Big Jersey Number Badge */}
                        <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-sm sm:text-base font-black tracking-tighter z-10 border border-slate-700/60 shadow-md">
                          #{player.jerseyNumber ?? player.number ?? "—"}
                        </span>

                        {/* Player Photo */}
                        {(player.photo || player.image) ? (
                          <Image
                            src={player.photo || player.image}
                            alt={player.name || "Player"}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                            <span className="text-slate-600 font-black text-4xl tracking-widest">FCB</span>
                          </div>
                        )}

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                      </div>

                      {/* Card Footer Details */}
                      <div className="p-4 bg-slate-900 flex items-center justify-between mt-auto border-t border-slate-800/80">
                        <div className="truncate pr-2">
                          <span className="text-sm font-bold text-white block truncate group-hover:text-blue-400 transition-colors">
                            {player.name}
                          </span>
                          <span className="text-xs text-slate-400 block truncate pt-0.5">
                            {player.nationality || player.position || "FC Boraitola"}
                          </span>
                        </div>
                        
                        <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0 border border-slate-700/60 shadow-sm">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

              </div>
            )
          ))
        )}
      </div>

    </div>
  );
}