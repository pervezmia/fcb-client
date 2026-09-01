"use client";

import React from "react";
import { LayoutSideContent } from "@gravity-ui/icons";

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-900 text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20"></div>

      <div className="max-w-md w-full text-center space-y-6 relative z-10 flex flex-col items-center justify-center">
        {/* Spinning Football / Logo Loader */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Outer Ring Animation */}
          <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin"></div>
          
          {/* Inner Reverse Ring */}
          <div className="absolute inset-2 rounded-full border-4 border-red-500/20 border-b-red-500 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }}></div>

          {/* Center Icon (Football Emoji or SVG) */}
          <div className="text-4xl animate-bounce">
            ⚽
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
            FCB HUB
          </h2>
          <p className="text-sm text-slate-400">
            Loading match data, please wait...
          </p>
        </div>
      </div>
    </div>
  );
}