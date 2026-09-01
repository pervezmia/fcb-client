"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Calendar, ChevronDown, Trophy } from "@gravity-ui/icons";

export default function FixturesPage() {
  const [activeTab, setActiveTab] = useState("fixtures");
  const [selectedMonth, setSelectedMonth] = useState("All");

  // Fake Monthly Fixtures Data
  const fixturesData = [
    {
      month: "September 2026",
      matches: [
        {
          id: 1,
          date: "SUN 20 SEPT 2026",
          time: "16:30",
          homeTeam: "FC Boraitola",
          homeLogo: "FCB",
          awayTeam: "Boraitola Tigers",
          awayLogo: "TIG",
          status: "Upcoming",
          matchCentreUrl: "/fixtures/1",
          ticketsUrl: "/tickets/1",
        },
        {
          id: 2,
          date: "WED 23 SEPT 2026",
          time: "20:00",
          homeTeam: "United XI",
          homeLogo: "UNI",
          awayTeam: "FC Boraitola",
          awayLogo: "FCB",
          status: "Upcoming",
          matchCentreUrl: "/fixtures/2",
          ticketsUrl: "/tickets/2",
        },
      ],
    },
    {
      month: "October 2026",
      matches: [
        {
          id: 3,
          date: "SAT 10 OCT 2026",
          time: "15:00",
          homeTeam: "FC Boraitola",
          homeLogo: "FCB",
          awayTeam: "Young Star Club",
          awayLogo: "YSC",
          status: "Upcoming",
          matchCentreUrl: "/fixtures/3",
          ticketsUrl: "/tickets/3",
        },
        {
          id: 4,
          date: "SAT 24 OCT 2026",
          time: "17:30",
          homeTeam: "Greenfield FC",
          homeLogo: "GRN",
          awayTeam: "FC Boraitola",
          awayLogo: "FCB",
          status: "Upcoming",
          matchCentreUrl: "/fixtures/4",
          ticketsUrl: "/tickets/4",
        },
      ],
    },
  ];

  // Filter months if selected
  const filteredFixtures = selectedMonth === "All" 
    ? fixturesData 
    : fixturesData.filter(group => group.month.toLowerCase().includes(selectedMonth.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-16">
      
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border-b border-blue-500/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            MEN'S TEAM
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Fixtures & Results
          </h1>

          {/* Sub Navigation Tabs (Fixtures / Results / Table) */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <button 
              onClick={() => setActiveTab("fixtures")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === "fixtures" 
                  ? "bg-white text-slate-950 shadow-lg" 
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700"
              }`}
            >
              FIXTURES
            </button>
            <button 
              onClick={() => setActiveTab("results")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === "results" 
                  ? "bg-white text-slate-950 shadow-lg" 
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700"
              }`}
            >
              RESULTS
            </button>
            <button 
              onClick={() => setActiveTab("table")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === "table" 
                  ? "bg-white text-slate-950 shadow-lg" 
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700"
              }`}
            >
              TABLE
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">

        {/* Filter Dropdown bar */}
        <div className="flex items-center justify-between bg-slate-800/40 border border-slate-700/60 rounded-2xl p-4 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>Filter by Month:</span>
          </div>
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Months</option>
            <option value="September">September 2026</option>
            <option value="October">October 2026</option>
          </select>
        </div>

        {/* Fixtures Groups by Month */}
        {filteredFixtures.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-4">
            {/* Month Header */}
            <h2 className="text-xl font-black text-slate-200 border-l-4 border-blue-500 pl-3">
              {group.month}
            </h2>

            {/* Match Cards List */}
            <div className="space-y-4">
              {group.matches.map((match) => (
                <div 
                  key={match.id}
                  className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl backdrop-blur-xl transition-all hover:border-slate-600"
                >
                  {/* Match Info Box */}
                  <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    
                    {/* Home Team */}
                    <div className="flex items-center gap-4 flex-1 justify-center md:justify-start">
                      <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-black text-blue-400 text-lg">
                        {match.homeLogo}
                      </div>
                      <span className="text-base font-bold text-white text-center md:text-left">
                        {match.homeTeam}
                      </span>
                    </div>

                    {/* Time & Date Center */}
                    <div className="text-center space-y-1 px-4">
                      <p className="text-[11px] font-semibold text-slate-400 tracking-wider">
                        {match.date}
                      </p>
                      <div className="inline-block bg-slate-900 border border-slate-700 px-4 py-1.5 rounded-xl text-sm font-black text-slate-200 shadow-inner">
                        {match.time}
                      </div>
                      <p className="text-[10px] text-blue-400 uppercase tracking-widest font-medium">
                        {match.status}
                      </p>
                    </div>

                    {/* Away Team */}
                    <div className="flex items-center gap-4 flex-1 justify-center md:justify-end flex-row-reverse md:flex-row">
                      <span className="text-base font-bold text-white text-center md:text-right">
                        {match.awayTeam}
                      </span>
                      <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center font-black text-red-400 text-lg">
                        {match.awayLogo}
                      </div>
                    </div>

                  </div>

                  {/* Bottom Action Footer Bar */}
                  <div className="grid grid-cols-2 divide-x divide-slate-700/60 border-t border-slate-700/60 bg-slate-900/50">
                    <Link href={match.matchCentreUrl} className="text-center py-3 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors">
                      Match Centre →
                    </Link>
                    <Link href={match.ticketsUrl} className="text-center py-3 text-xs font-semibold text-blue-400 hover:bg-slate-800 transition-colors">
                      Tickets & Info →
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}