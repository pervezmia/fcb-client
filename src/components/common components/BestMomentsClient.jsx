"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/motion/motion";

export default function BestMomentsClient({ moments }) {
  return (
    <motion.div 
  variants={containerVariants}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-50px" }}
  className="flex flex-wrap gap-6"
>
  {moments.map((moment) => {
    const momentId = moment._id?.$oid || moment._id || Math.random();

    return (
      <motion.div 
        key={momentId} 
        variants={itemVariants}
        whileHover={{ y: -4 }}
        // ওয়িডথ নির্দিষ্ট করে দেওয়া যাতে ফ্লেক্সবক্সে সুন্দর দেখায়
        className="relative group overflow-hidden rounded-2xl bg-slate-800 border border-slate-700/60 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] h-[350px] shadow-xl transition-shadow duration-300 hover:shadow-2xl"
      >
        {/* Background Image */}
        <Image
          src={moment.mediaUrl || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80"}
          alt={moment.title || "Match Moment"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none"></div>

        {/* Category / Match Badge */}
        {moment.category && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-blue-600/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wider">
              {moment.category}
            </span>
          </div>
        )}

        {/* Title & Caption at the bottom */}
        <div className="absolute bottom-0 inset-x-0 p-4 z-10 space-y-1">
          <p className="text-sm font-bold text-slate-100 drop-shadow-md truncate">
            {moment.title}
          </p>
          {moment.caption && (
            <p className="text-xs text-slate-300 line-clamp-2">
              {moment.caption}
            </p>
          )}
        </div>
      </motion.div>
    );
  })}
</motion.div>
  );
}