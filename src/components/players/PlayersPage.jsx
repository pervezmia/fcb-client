"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getAllPlayers } from "@/lib/api/player";

import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";

export default function PlayersPage({ players }) {
  const [activeTab, setActiveTab] = useState("MEN'S TEAM");

  // const categories = [
  //   {
  //     title: "Goalkeeper",
  //     players: [
  //       {
  //         id: 1,
  //         name: "Rogers",
  //         number: 1,
  //         image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80",
  //         country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  //       },
  //       {
  //         id: 2,
  //         name: "Soper",
  //         number: 13,
  //         image: null,
  //         country: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Defender",
  //     players: [
  //       {
  //         id: 3,
  //         name: "Cowan",
  //         number: 2,
  //         image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
  //         country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  //       },
  //       {
  //         id: 4,
  //         name: "Warrington",
  //         number: 3,
  //         image: null,
  //         country: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  //       },
  //       {
  //         id: 5,
  //         name: "Graham",
  //         number: 5,
  //         image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
  //         country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  //       },
  //       {
  //         id: 6,
  //         name: "Pearse",
  //         number: 6,
  //         image: null,
  //         country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  //       },
  //       {
  //         id: 7,
  //         name: "Reynolds",
  //         number: 12,
  //         image: null,
  //         country: "🇮🇪",
  //       },
  //       {
  //         id: 8,
  //         name: "O'Rourke",
  //         number: 20,
  //         image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
  //         country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Midfielder",
  //     players: [
  //       {
  //         id: 9,
  //         name: "Kinzett",
  //         number: 4,
  //         image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
  //         country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  //       },
  //       {
  //         id: 10,
  //         name: "Devlin",
  //         number: 10,
  //         image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
  //         country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  //       },
  //       {
  //         id: 11,
  //         name: "Bristow",
  //         number: 17,
  //         image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
  //         country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Forward",
  //     players: [
  //       {
  //         id: 12,
  //         name: "Silva",
  //         number: 7,
  //         image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
  //         country: "🇧🇷",
  //       },
  //       {
  //         id: 13,
  //         name: "Torres",
  //         number: 9,
  //         image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&auto=format&fit=crop&q=80",
  //         country: "🇪🇸",
  //       },
  //     ],
  //   },
  // ];

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-16">
      {/* Top Red Header Title Bar */}
      <div className="bg-red-600 text-white px-4 sm:px-6 lg:px-8 py-6 shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-3xl font-black tracking-tight uppercase">
            Total Players _ {players.length}
          </h1>

          {/* Filter Sub-Tabs */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-wider">
            {["MEN'S TEAM", "U21", "U18", "WOMEN"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-1 transition-all border-b-2 ${
                  activeTab === tab
                    ? "border-white text-white"
                    : "border-transparent text-red-200 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Squad Listing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* Category Title */}
        {/* <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-200 pb-2">
              {player.title}
            </h2> */}

        {/* Grid of Player Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {players.map((player) => (
            <div
              key={player._id}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm flex flex-col group transition-all hover:shadow-md"
            >
              <h2 className="text-xl text-center font-extrabold text-slate-900 border-b border-slate-200 py-2">
                {player.title}
              </h2>
              {/* Card Header (Red Photo Container with Number) */}
              <div className="relative w-full aspect-[4/5] bg-red-600 overflow-hidden flex items-end justify-center">
                {/* Big Jersey Number */}
                <span className="absolute top-3 left-3 text-white text-3xl sm:text-4xl font-black tracking-tighter z-10 drop-shadow-md">
                  {player.number}
                </span>

                {/* Player Image if available, otherwise solid red background */}
                {player.image ? (
                  <Image
                    src={player.image}
                    alt={player.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-red-600 flex items-center justify-center opacity-90"></div>
                )}
              </div>

              {/* Card Footer Details */}
              <div className="p-3 bg-white flex items-center justify-between mt-auto border-t border-slate-100">
                <span className="text-sm font-bold text-slate-900 truncate">
                  {player.name}
                </span>

                <Link
                  href={`/players/${player._id}`}
                  className="flex items-center text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span className="text-sm font-bold truncate flex items-center">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
