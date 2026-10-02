import React from "react";

import Link from "next/link";

import { Button } from "@heroui/react";

import { Calendar, Shield, Persons } from "@gravity-ui/icons";

import TypewriterEffect from "./TypewriterEffect";
import HeroImageSlider from "./HeroImageSlider";
import { backendURL } from "@/lib/core/core";
import AnimatedCounter from "../AnimatedCounter";

const MONTHS = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

// "TUE 08 SEP 2026" + "04:00 PM" -> Date
function parseMatchDate(match) {
  const parts = (match.date || "").trim().split(/\s+/); // [weekday, day, month, year]
  const [, day, mon, year] = parts;
  const month = MONTHS[mon?.toUpperCase()];
  if (!day || month === undefined || !year) return null;

  const t = (match.time || "").match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  let hours = 0;
  let minutes = 0;
  if (t) {
    hours = Number(t[1]) % 12;
    if (t[3].toUpperCase() === "PM") hours += 12;
    minutes = Number(t[2]);
  }
  return new Date(Number(year), month, Number(day), hours, minutes);
}

async function safeFetch(path) {
  try {
    const res = await fetch(`${backendURL}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed: ${path}`);
    return await res.json();
  } catch (error) {
    console.error(`HeroBanner fetch error (${path}):`, error);
    return [];
  }
}

async function getHeroData() {
  const [fixtures, players] = await Promise.all([
    safeFetch("/fixtures"),
    safeFetch("/players"),
  ]);

  const allMatches = fixtures.flatMap((group) => group.matches || []);

  const upcoming = allMatches
    .filter((m) => m.status === "Upcoming")
    .map((m) => ({ ...m, _dateObj: parseMatchDate(m) }))
    .sort((a, b) => {
      if (!a._dateObj) return 1;
      if (!b._dateObj) return -1;
      return a._dateObj - b._dateObj;
    });

  const now = new Date();
  // Prothome future er shobcheye kache match, na thakle shobcheye purono Upcoming
  const nextMatch =
    upcoming.find((m) => m._dateObj && m._dateObj >= now) ||
    upcoming[0] ||
    null;

  return {
    nextMatch,
    totalMatches: allMatches.length,
    totalPlayers: Array.isArray(players) ? players.length : 0,
    upcomingCount: upcoming.length,
  };
}

export default async function HeroBanner() {
  const { nextMatch, totalMatches, totalPlayers, upcomingCount } =
    await getHeroData();

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

            {/* Quick Stats (real data) */}

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">
                  <AnimatedCounter value={totalMatches} />
                </p>
                <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                  Matches
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">
                  <AnimatedCounter value={totalPlayers} />
                </p>
                <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                  Squad Players
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">
                  <AnimatedCounter value={upcomingCount} />
                </p>
                <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                  Upcoming
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual / Next Match Card */}

          <div className="lg:col-span-5 flex flex-col justify-center items-center">
            <div className="relative w-full max-w-md bg-slate-800/40 border border-slate-700/60 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-sm font-bold text-slate-200 tracking-wide uppercase">
                    Next Match
                  </span>
                </div>

                <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full font-medium">
                  {nextMatch ? nextMatch.status : "No Match"}
                </span>
              </div>

              {nextMatch ? (
                <>
                  {/* Match Card Info */}
                  <div className="flex items-center justify-between py-4">
                    <div className="text-center space-y-2 flex-1">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xl font-black text-blue-400">
                        {nextMatch.homeLogo || "HOM"}
                      </div>
                      <p className="text-sm font-bold text-slate-200">
                        {nextMatch.homeTeam}
                      </p>
                    </div>

                    <div className="px-4 text-center">
                      <span className="text-xl font-black text-slate-500">
                        VS
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {nextMatch.date}
                      </p>
                      <p className="text-[10px] font-bold text-slate-300">
                        {nextMatch.time}
                      </p>
                    </div>

                    <div className="text-center space-y-2 flex-1">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-xl font-black text-red-400">
                        {nextMatch.awayLogo || "AWY"}
                      </div>
                      <p className="text-sm font-bold text-slate-200">
                        {nextMatch.awayTeam}
                      </p>
                    </div>
                  </div>

                  {/* Venue & Squad info */}
                  <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-700/60 pt-4">
                    <span>
                      Venue:{" "}
                      <span className="text-blue-400 font-semibold">
                        {nextMatch.matchCenterUrl || "Boraitola Ground"}
                      </span>
                    </span>
                    <span>
                      Squad:{" "}
                      <span className="text-blue-400 font-semibold">
                        {nextMatch.squad?.length || 0}
                      </span>
                    </span>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center text-sm text-slate-400">
                  No upcoming match scheduled right now.
                </div>
              )}

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
