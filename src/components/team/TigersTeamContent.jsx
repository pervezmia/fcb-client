"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Flame, Trophy, Users, Zap, ChevronRight } from "lucide-react";

export default function TigersTeamContent() {
  return (
    <div className="w-full">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Banner Image with Zoom/Scale Effect */}
        <div className="absolute inset-0 z-0 transform-gpu transition-transform duration-1000 hover:scale-105">
          <Image
            src="https://i.ibb.co.com/Rp34KHCD/rsz-g-photo-1.png"
            alt="Boraitola Tigers Team Banner"
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600/30 border border-amber-500/40 backdrop-blur-md text-amber-300 text-xs sm:text-sm font-semibold mb-4"
          >
            <Flame size={16} />
            <span>The Fierce Squad</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4 drop-shadow-lg"
          >
            Boraitola <span className="text-amber-500">Tigers</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-medium"
          >
            Unstoppable energy, aggressive gameplay, and relentless pursuit of victory. Meet the Tigers who roar on every pitch.
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
            <div className="p-4 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
              <Zap size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Playing Style</p>
              <h3 className="text-xl font-bold text-white">High Press & Attack</h3>
            </div>
          </motion.div>

          {/* Stat Card 2 */}
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center gap-4 transform-gpu"
          >
            <div className="p-4 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Users size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Squad Strength</p>
              <h3 className="text-xl font-bold text-white">Dynamic Roster</h3>
            </div>
          </motion.div>

          {/* Stat Card 3 */}
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center gap-4 transform-gpu"
          >
            <div className="p-4 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <Trophy size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Attitude</p>
              <h3 className="text-xl font-bold text-white">Fearless & Focused</h3>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Team Description / Legacy Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-slate-900 to-slate-900/60 border border-slate-800/80 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-2.5 h-8 bg-amber-500 rounded-full inline-block" />
            About Boraitola Tigers
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
            Boraitola Tigers represent raw talent, explosive pace, and an uncompromising winning mentality. Known for turning challenging matches around with sheer grit, this squad brings excitement and electrifying performances to every tournament they enter.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300 text-sm">
            <div className="flex items-center gap-2">
              <ChevronRight size={16} className="text-amber-500" />
              <span>Explosive counter-attacks & speed</span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight size={16} className="text-amber-500" />
              <span>Young and energetic lineup</span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight size={16} className="text-amber-500" />
              <span>Fierce competitive spirit</span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight size={16} className="text-amber-500" />
              <span>Unmatched fan support and passion</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}