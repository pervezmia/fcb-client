import React from "react";
import { getBestMoments } from "@/lib/api/moment";
import BestMomentsClient from "./BestMomentsClient";

export default async function BestMoments() {
  // সার্ভার সাইড থেকে রিয়েল ডাটা ফেচ করা
  const moments = await getBestMoments();

  return (
    <section className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-white ">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Section Heading */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Best Moments of the Match
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Explore the most thrilling moments captured from our matches.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
            Captured on lens 📸
          </span>
        </div>

        {/* যদি ডাটা না থাকে */}
        {(!moments || moments.length === 0) ? (
          <div className="text-center py-20 bg-slate-800/50 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No best moments found yet.</p>
          </div>
        ) : (
          /* Framer Motion Enabled Client Component */
          <BestMomentsClient moments={moments} />
        )}

      </div>
    </section>
  );
}