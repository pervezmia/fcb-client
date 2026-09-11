import React from "react";

import Link from "next/link";

import { Button } from "@heroui/react";

import { Calendar, Shield, Persons } from "@gravity-ui/icons";

import TypewriterEffect from "./TypewriterEffect";
import HeroImageSlider from "./HeroImageSlider";



export default function HeroBanner() {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden border-b border-blue-500/20">
      {/* Background Glow & Ambient Effects */}
      <HeroImageSlider></HeroImageSlider>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-900 to-slate-900 pointer-events-none"></div>

      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -top-40 -left-20"></div>

      <div className="absolute w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none -bottom-40 -right-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content Area */}

          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge */}

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-xs font-semibold tracking-wide uppercase">
              <Shield className="w-4 h-4 text-red-500" />
              Official FCB Hub & Community
            </div>

            {/* Main Heading */}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">

              The Ultimate Home for <br />

              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-400 to-red-500">

                FC Boraitola Fans & Players

              </span>

            </h1>

            {/* <TypewriterEffect></TypewriterEffect> */}

            {/* Description */}

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0">
              Track live match fixtures, explore player rosters, manage team
              stats, and stay updated with everything happening in our club.
            </p>

            {/* CTA Buttons */}

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link href="/fixtures" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-xl text-base font-semibold px-8 py-6 shadow-lg shadow-blue-600/25 hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Explore Fixtures
                </Button>
              </Link>

              <Link href="/players" className="w-full sm:w-auto">
                <Button
                  variant="bordered"
                  className="w-full sm:w-auto border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-200 rounded-xl text-base font-semibold px-8 py-6 transition-colors flex items-center justify-center gap-2"
                >
                  <Persons className="w-5 h-5 text-blue-400" />
                  View Players
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">
                  100+
                </p>

                <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                  Matches
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">
                  25+
                </p>

                <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                  Squad Players
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">3</p>

                <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                  Active Teams
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual / Card Showcase Area */}

          <div className="lg:col-span-5 flex flex-col justify-center items-center">
            <div className="relative w-full max-w-md bg-slate-800/40 border border-slate-700/60 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>

                  <span className="text-sm font-bold text-slate-200 tracking-wide uppercase">
                    Next Match Live Preview
                  </span>
                </div>

                <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full font-medium">
                  Upcoming
                </span>
              </div>

              {/* Match Card Info */}

              <div className="flex items-center justify-between py-4">
                <div className="text-center space-y-2 flex-1">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xl font-black text-blue-400">
                    FCB
                  </div>

                  <p className="text-sm font-bold text-slate-200">
                    FC Boraitola
                  </p>
                </div>

                <div className="px-4 text-center">
                  <span className="text-xl font-black text-slate-500">VS</span>

                  <p className="text-[10px] text-slate-400 mt-1">
                    Sunday, 8:00 PM
                  </p>
                </div>

                <div className="text-center space-y-2 flex-1">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-xl font-black text-red-400">
                    TIG
                  </div>

                  <p className="text-sm font-bold text-slate-200">
                    Boraitola Tigers
                  </p>
                </div>
              </div>

              {/* Action Button inside card */}

              <div className="pt-2">
                <Link href="/fixtures">
                  <Button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-xl py-3 text-sm font-medium transition-colors">
                    Match Details & Lineups
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
