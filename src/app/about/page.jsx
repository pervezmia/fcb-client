import Link from "next/link";
import { Button } from "@heroui/react";
import { getAllPlayers } from "@/lib/api/player";
import { getAllFixtures } from "@/lib/api/fixtureApi";
import { TIERS } from "@/lib/playerTier";
import { CLUB_INFO } from "@/lib/clubInfo";

export const metadata = {
  title: "About the Club | FC Boraitola",
  description:
    "Learn about FC Boraitola: who we are, what we stand for, our teams and how the club hub works.",
};

const values = [
  {
    icon: "🤝",
    title: "Teamwork",
    text: "Every goal starts with a pass. We win and lose together, and the squad always comes before any one player.",
  },
  {
    icon: "💪",
    title: "Discipline",
    text: "Regular training, showing up on time and respecting teammates, opponents and referees on every matchday.",
  },
  {
    icon: "🏘️",
    title: "Community",
    text: "We are a local club. Our supporters, families and friends are part of every match we play.",
  },
  {
    icon: "📈",
    title: "Growth",
    text: "From first-time players to regular starters, we help everyone improve and earn their place in the squad.",
  },
];

const features = [
  {
    title: "Fixtures & Lineups",
    text: "See upcoming matches, results and the exact squad picked for each game.",
    href: "/fixtures",
  },
  {
    title: "Player Profiles",
    text: "Every player has a profile with position, squad number, status and matches played.",
    href: "/players",
  },
  {
    title: "Leaderboard",
    text: "Players climb the rankings by playing matches. See where everyone stands.",
    href: "/leaderboard",
  },
  {
    title: "Best Moments",
    text: "The best photos and highlights from our matches, shared with the community.",
    href: "/best-moment",
  },
];

const teams = [
  {
    name: "FC Boraitola",
    text: "The main club side that represents Boraitola in friendly matches and local tournaments.",
    href: "/fcb-teams/fc-boraitola",
  },
  {
    name: "Boraitola Tigers",
    text: "The second team, where players build match experience and push for a place in the main squad.",
    href: "/fcb-teams/boraitola-tigers",
  },
];

export default async function AboutPage() {
  const [players, fixtures] = await Promise.all([getAllPlayers(), getAllFixtures()]);

  const allMatches = (Array.isArray(fixtures) ? fixtures : []).flatMap((g) => g.matches || []);
  const squadSize = (Array.isArray(players) ? players : []).filter(
    (p) => p.status !== "Retired",
  ).length;

  const stats = [
    { label: "Squad Players", value: squadSize },
    { label: "Matches Scheduled", value: allMatches.length },
    { label: "Matches Completed", value: allMatches.filter((m) => m.status === "Completed").length },
    { label: "Upcoming", value: allMatches.filter((m) => m.status === "Upcoming").length },
  ];

  return (
    <main className="bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-blue-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-5 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            About the club
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-balance">
            More than a team. <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-400 to-red-500">
              One club, one community.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            {CLUB_INFO.name} is a community football club built by local players and supporters.
            We train together, play friendly matches and local tournaments, and share every
            moment of the journey here.
          </p>
        </div>
      </section>

      {/* Stats (real data) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center shadow-xl"
            >
              <p className="text-3xl font-black text-white tabular-nums">{s.value}</p>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black">What we stand for</h2>
          <p className="text-sm text-slate-400">The values that guide how we play and how we treat each other.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2"
            >
              <p className="text-2xl">{v.icon}</p>
              <h3 className="text-lg font-bold text-white">{v.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Teams */}
      <section className="border-y border-slate-800 bg-slate-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-black">Our teams</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {teams.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 space-y-2 transition-colors"
              >
                <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors">
                  {t.name}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t.text}</p>
                <span className="inline-block text-xs font-bold text-blue-400 pt-2">
                  View squad →
                </span>
              </Link>
            ))}
          </div>

          <p className="text-sm text-slate-400">
            Home ground: <span className="text-slate-200 font-semibold">{CLUB_INFO.homeVenue}</span>
          </p>
        </div>
      </section>

      {/* Club hub features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black">How the club hub works</h2>
          <p className="text-sm text-slate-400">
            This website keeps the whole club connected, from the squad list to matchday.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 space-y-1 transition-colors"
            >
              <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                {f.title} →
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.text}</p>
            </Link>
          ))}
        </div>

        {/* Player ranks (same rule jeta leaderboard e use hoy) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Player ranks</h3>
          <p className="text-sm text-slate-400">
            Players earn a rank badge by the number of matches they have played for the club.
          </p>
          <div className="flex flex-wrap gap-2">
            {TIERS.map((t) => (
              <span
                key={t.key}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${t.classes}`}
              >
                {t.icon} {t.label} · {t.min}+ matches
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black">Want to be part of FC Boraitola?</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Whether you want to play, support the team or work with us, we would love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-xl font-semibold px-8 py-6">
                Contact us
              </Button>
            </Link>
            <Link href="/fixtures" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-slate-800 border border-slate-700 text-slate-200 rounded-xl font-semibold px-8 py-6">
                See fixtures
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}