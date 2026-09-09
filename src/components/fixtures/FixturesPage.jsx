// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { Button } from "@heroui/react";
// import { Calendar, ChevronDown, Trophy } from "@gravity-ui/icons";
// import { fixturesData } from "@/lib/api/fixturesData";

// export  default  function  FixturesPage({fixturesData}) {
//   const [activeTab, setActiveTab] = useState("fixtures");
//   const [selectedMonth, setSelectedMonth] = useState("All");
//   console.log(fixturesData);

  

//   // Filter months if selected
//   const filteredFixtures = selectedMonth === "All" 
//     ? fixturesData 
//     : fixturesData.filter(group => group.month.toLowerCase().includes(selectedMonth.toLowerCase()));

//   return (
//     <div className="min-h-screen bg-slate-900 text-white pb-16">
      
//       {/* Top Header Banner */}
//       <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border-b border-blue-500/20 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto space-y-4">
//           <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
//             MEN'S TEAM
//           </span>
//           <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
//             Fixtures & Results
//           </h1>

//           {/* Sub Navigation Tabs (Fixtures / Results / Table) */}
//           <div className="flex flex-wrap items-center gap-2 pt-4">
//             <button 
//               onClick={() => setActiveTab("fixtures")}
//               className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
//                 activeTab === "fixtures" 
//                   ? "bg-white text-slate-950 shadow-lg" 
//                   : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700"
//               }`}
//             >
//               FIXTURES
//             </button>
//             <button 
//               onClick={() => setActiveTab("results")}
//               className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
//                 activeTab === "results" 
//                   ? "bg-white text-slate-950 shadow-lg" 
//                   : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700"
//               }`}
//             >
//               RESULTS
//             </button>
//             <button 
//               onClick={() => setActiveTab("table")}
//               className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
//                 activeTab === "table" 
//                   ? "bg-white text-slate-950 shadow-lg" 
//                   : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700"
//               }`}
//             >
//               TABLE
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">

//         {/* Filter Dropdown bar */}
//         <div className="flex items-center justify-between bg-slate-800/40 border border-slate-700/60 rounded-2xl p-4 backdrop-blur-xl">
//           <div className="flex items-center gap-2 text-sm text-slate-300">
//             <Calendar className="w-4 h-4 text-blue-400" />
//             <span>Filter by Month:</span>
//           </div>
//           <select 
//             value={selectedMonth} 
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
//           >
//             <option value="All">All Months</option>
//             <option value="September">September 2026</option>
//             <option value="October">October 2026</option>
//           </select>
//         </div>

//         {/* Fixtures Groups by Month */}
//         {filteredFixtures.map((group, groupIdx) => (
//           <div key={groupIdx} className="space-y-4">
//             {/* Month Header */}
//             <h2 className="text-xl font-black text-slate-200 border-l-4 border-blue-500 pl-3">
//               {group.month}
//             </h2>

//             {/* Match Cards List */}
//             <div className="space-y-4">
//               {group.matches.map((match) => (
//                 <div 
//                   key={match.id}
//                   className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl backdrop-blur-xl transition-all hover:border-slate-600"
//                 >
//                   {/* Match Info Box */}
//                   <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    
//                     {/* Home Team */}
//                     <div className="flex items-center gap-4 flex-1 justify-center md:justify-start">
//                       <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-black text-blue-400 text-lg">
//                         {match.homeLogo}
//                       </div>
//                       <span className="text-base font-bold text-white text-center md:text-left">
//                         {match.homeTeam}
//                       </span>
//                     </div>

//                     {/* Time & Date Center */}
//                     <div className="text-center space-y-1 px-4">
//                       <p className="text-[11px] font-semibold text-slate-400 tracking-wider">
//                         {match.date}
//                       </p>
//                       <div className="inline-block bg-slate-900 border border-slate-700 px-4 py-1.5 rounded-xl text-sm font-black text-slate-200 shadow-inner">
//                         {match.time}
//                       </div>
//                       <p className="text-[10px] text-blue-400 uppercase tracking-widest font-medium">
//                         {match.status}
//                       </p>
//                     </div>

//                     {/* Away Team */}
//                     <div className="flex items-center gap-4 flex-1 justify-center md:justify-end flex-row-reverse md:flex-row">
//                       <span className="text-base font-bold text-white text-center md:text-right">
//                         {match.awayTeam}
//                       </span>
//                       <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center font-black text-red-400 text-lg">
//                         {match.awayLogo}
//                       </div>
//                     </div>

//                   </div>

//                   {/* Bottom Action Footer Bar */}
//                   <div className="grid grid-cols-2 divide-x divide-slate-700/60 border-t border-slate-700/60 bg-slate-900/50">
//                     <Link href={match.matchCentreUrl} className="text-center py-3 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors">
//                       Match Centre →
//                     </Link>
//                     <Link href={match.ticketsUrl} className="text-center py-3 text-xs font-semibold text-blue-400 hover:bg-slate-800 transition-colors">
//                       Tickets & Info →
//                     </Link>
//                   </div>

//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}

//       </div>
//     </div>
//   );

"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar } from "@gravity-ui/icons";
import {
  Select,
  ListBox,
  Label,
} from "@heroui/react";
import { motion } from "framer-motion";

// Dynamically generate months from January 2026 up to the current month (September 2026)
function generateAvailableMonths() {
  const months = [];
  const currentDate = new Date(2026, 8, 7); // September 7, 2026
  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth(); // 0-indexed (8 = September)

  for (let m = 0; m <= currentMonthIndex; m++) {
    const d = new Date(currentYear, m, 1);
    const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(d);
    months.push(`${monthName} ${currentYear}`);
  }

  return months;
}

// Animation variants: cards fade in and slide up, staggered one after another
const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function FixturesPage({ fixturesData = [] }) {
  const [activeTab, setActiveTab] = useState("fixtures");
  const [selectedMonth, setSelectedMonth] = useState("All");

  const availableMonths = generateAvailableMonths();

  const filteredFixtures = selectedMonth === "All" || !selectedMonth
    ? fixturesData 
    : fixturesData.filter(group => group.month?.toLowerCase().includes(selectedMonth.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-16">
      {/* Top Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border-b border-blue-500/20 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            MEN&apos;S TEAM
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Fixtures & Results
          </h1>

          {/* Sub Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("fixtures")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === "fixtures"
                  ? "bg-white text-slate-950 shadow-lg"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700"
              }`}
            >
              FIXTURES
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("results")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === "results"
                  ? "bg-white text-slate-950 shadow-lg"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700"
              }`}
            >
              RESULTS
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Filter Bar using HeroUI Select Component */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
          className="flex items-center justify-between bg-slate-800/40 border border-slate-700/60 rounded-2xl p-4 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>Filter by Month:</span>
          </div>

          <div className="w-64">
            <Select
              aria-label="Filter by Month"
              selectedKey={selectedMonth}
              onSelectionChange={(key) => setSelectedMonth(key || "All")}
              placeholder="All Months"
            >
              <Select.Trigger className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="bg-slate-900 border border-slate-700 rounded-xl shadow-xl">
                <ListBox>
                  <ListBox.Item key="All" id="All">
                    All Months
                  </ListBox.Item>
                  {availableMonths.map((m) => (
                    <ListBox.Item key={m} id={m}>
                      {m}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </motion.div>

        {/* Fixtures Groups by Month */}
        <motion.div
          key={selectedMonth}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-10"
        >
        {filteredFixtures.map((group, groupIdx) => (
          <div key={group._id || groupIdx} className="space-y-4">
            <motion.h2 variants={itemVariants} className="text-xl font-black text-slate-200 border-l-4 border-blue-500 pl-3">
              {group.month}
            </motion.h2>

            <div className="space-y-4">
              {group.matches?.map((match, matchIdx) => (
                <motion.div
                  key={matchIdx}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl backdrop-blur-xl transition-all hover:border-slate-600"
                >
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
                  <div className="grid grid-cols-1 divide-x divide-slate-700/60 border-t border-slate-700/60 bg-slate-900/50">
                    <div className="text-center py-3 text-xs font-semibold text-slate-300">
                      Match Venue: <span className="text-blue-400">{match.matchCenterUrl}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
        </motion.div>
      </div>
    </div>
  );
}