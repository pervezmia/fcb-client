"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Trophy, Users, Award, ChevronRight } from "lucide-react";

export default function TeamProfileContent() {
  return (
    <div className="w-full">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Banner Image with Zoom/Scale Effect */}
        <div className="absolute inset-0 z-0 transform-gpu transition-transform duration-1000 hover:scale-105">
          <Image
            src="https://i.ibb.co.com/jv4WtJkD/rsz-fp-2.png"
            alt="FC Boraitola Senior Team Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-75"
          />
          {/* Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        {/* Hero Content with Framer Motion */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/30 border border-blue-500/40 backdrop-blur-md text-blue-300 text-xs sm:text-sm font-semibold mb-4"
          >
            <Shield size={16} />
            <span>First & Senior Squad</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4 drop-shadow-lg"
          >
            FC <span className="text-blue-500">Boraitola</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-medium"
          >
            The ultimate pillar and most senior competitive team of our club. Built on discipline, resilience, and a legacy of unmatched passion.
          </motion.p>
        </div>
      </div>

      {/* Team Statistics & Info Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Stat Card 1 */}
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center gap-4 transform-gpu"
          >
            <div className="p-4 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Trophy size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Status</p>
              <h3 className="text-xl font-bold text-white">Senior Tier-1 Squad</h3>
            </div>
          </motion.div>

          {/* Stat Card 2 */}
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center gap-4 transform-gpu"
          >
            <div className="p-4 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <Users size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Squad Strength</p>
              <h3 className="text-xl font-bold text-white">Elite 25 Players</h3>
            </div>
          </motion.div>

          {/* Stat Card 3 */}
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center gap-4 transform-gpu"
          >
            <div className="p-4 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
              <Award size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Legacy</p>
              <h3 className="text-xl font-bold text-white">First Senior Team</h3>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Team Description / Legacy Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-slate-900 to-slate-900/60 border border-slate-800/80 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-2.5 h-8 bg-blue-600 rounded-full inline-block" />
            About the Senior Squad
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
            FC Boraitola stands as the core identity of our entire sports movement. Being the first and most senior team, it shoulders the responsibility of setting high competitive standards, leadership on and off the pitch, and inspiring younger generations of athletes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300 text-sm">
            <div className="flex items-center gap-2">
              <ChevronRight size={16} className="text-blue-500" />
              <span>Rigorous training and tactical discipline</span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight size={16} className="text-blue-500" />
              <span>Experienced leadership and seasoned veterans</span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight size={16} className="text-blue-500" />
              <span>Top-tier regional tournament contenders</span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight size={16} className="text-blue-500" />
              <span>Strong club culture and unity</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}