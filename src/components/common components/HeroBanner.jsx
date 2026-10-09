import React from "react";

import Link from "next/link";

import { Button } from "@heroui/react";

import { Calendar, Shield, Persons } from "@gravity-ui/icons";

import HeroImageSlider from "./HeroImageSlider";
import MatchCountdown from "./MatchCountdown";
import AnimatedCounter from "../AnimatedCounter";
import { getAllPlayers } from "@/lib/api/player";
import { getAllFixtures } from "@/lib/api/fixtureApi";
import HeroSlider from "./HeroSlider";

const CLUB_UTC_OFFSET_HOURS = 6; // Bangladesh (UTC+6)

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

// "TUE 08 SEP 2026" + "04:00 PM" -> Date (Bangladesh time dhore, server UTC hole-o thik)
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

  return new Date(
    Date.UTC(Number(year), month, Number(day), hours, minutes) -
      CLUB_UTC_OFFSET_HOURS * 60 * 60 * 1000,
  );
}

async function getHeroData() {
  const [fixtures, players] = await Promise.all([
    getAllFixtures(),
    getAllPlayers(),
  ]);

  const allMatches = (Array.isArray(fixtures) ? fixtures : []).flatMap(
    (group) => group.matches || [],
  );

  const withDate = allMatches.map((m) => ({ ...m, _dateObj: parseMatchDate(m) }));

  const upcoming = withDate
    .filter((m) => m.status === "Upcoming")
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

  // Upcoming na thakle shesh khela match
  const lastMatch =
    withDate
      .filter((m) => m.status === "Completed" && m._dateObj)
      .sort((a, b) => b._dateObj - a._dateObj)[0] || null;

  return {
    nextMatch,
    lastMatch,
    totalMatches: allMatches.length,
    totalPlayers: Array.isArray(players) ? players.length : 0,
    upcomingCount: upcoming.length,
  };
}

function TeamBadge({ logo, name, tone }) {
  const styles =
    tone === "home"
      ? "bg-blue-600/20 border-blue-500/30 text-blue-400"
      : "bg-red-600/20 border-red-500/30 text-red-400";

  return (
    <div className="flex-1 text-center space-y-2 min-w-0">
      <div
        className={`size-14 mx-auto rounded-2xl border flex items-center justify-center text-lg font-black ${styles}`}
      >
        {logo || name?.slice(0, 3).toUpperCase()}
      </div>
      <p className="text-sm font-bold text-slate-200 truncate">{name}</p>
    </div>
  );
}

export default async function HeroBanner() {
  const { nextMatch, lastMatch, totalMatches, totalPlayers, upcomingCount } =
    await getHeroData();

  const cardMatch = nextMatch || lastMatch;

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden border-b border-blue-500/20">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -top-40 -left-20" />
      <div className="absolute w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none -bottom-40 -right-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ================= LEFT: Text ================= */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-xs font-semibold tracking-wide uppercase">
              <Shield className="w-4 h-4 text-red-500" />
              Official FCB Hub & Community
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] text-balance">
              The Ultimate Home for{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-400 to-red-500">
                FC Boraitola Fans & Players
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0">
              Track live match fixtures, explore player rosters, manage team
              stats, and stay updated with everything happening in our club.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
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
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-3xl font-black text-white">
                  <AnimatedCounter value={totalMatches} />
                </p>
                <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Matches</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">
                  <AnimatedCounter value={totalPlayers} />
                </p>
                <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Squad Players</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">
                  <AnimatedCounter value={upcomingCount} />
                </p>
                <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Upcoming</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: Slider + Next Match ================= */}
          <div className="lg:col-span-7 space-y-4">
            {/* <HeroImageSlider /> */}
            <HeroSlider />

            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`size-2.5 rounded-full ${
                      nextMatch ? "bg-red-500 animate-pulse" : "bg-slate-500"
                    }`}
                  />
                  <span className="text-sm font-bold text-slate-200 tracking-wide uppercase">
                    {nextMatch ? "Next Match" : "Last Match"}
                  </span>
                </div>

                {cardMatch && (
                  <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full font-medium">
                    {cardMatch.status}
                  </span>
                )}
              </div>

              {cardMatch ? (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <TeamBadge logo={cardMatch.homeLogo} name={cardMatch.homeTeam} tone="home" />

                    <div className="px-2 text-center shrink-0">
                      <span className="text-xl font-black text-slate-500">VS</span>
                      <p className="text-[11px] text-slate-400 mt-1">{cardMatch.date}</p>
                      <p className="text-[11px] font-bold text-slate-300">{cardMatch.time}</p>
                    </div>

                    <TeamBadge logo={cardMatch.awayLogo} name={cardMatch.awayTeam} tone="away" />
                  </div>

                  {nextMatch?._dateObj ? (
                    <MatchCountdown target={nextMatch._dateObj.toISOString()} />
                  ) : (
                    !nextMatch && (
                      <p className="text-center text-xs text-slate-400">
                        The next fixture will be announced soon.
                      </p>
                    )
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-t border-slate-700/60 pt-4">
                    <span>
                      Venue:{" "}
                      <span className="text-blue-400 font-semibold">
                        {cardMatch.matchCenterUrl || "Boraitola Ground"}
                      </span>
                    </span>
                    <span>
                      Squad:{" "}
                      <span className="text-blue-400 font-semibold">
                        {cardMatch.squad?.length || 0}
                      </span>
                    </span>
                    <Link
                      href="/fixtures"
                      className="font-semibold text-slate-200 hover:text-blue-400 transition-colors"
                    >
                      Match Details & Lineups →
                    </Link>
                  </div>
                </>
              ) : (
                <div className="py-6 text-center text-sm text-slate-400">
                  No matches scheduled yet. Check back soon.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

