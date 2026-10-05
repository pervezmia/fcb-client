import { getAllPlayers } from "@/lib/api/player";
import { rankPlayers } from "@/lib/leaderboard";
import LeaderboardClient from "./LeaderboardClient";

export default async function Leaderboard() {
  const players = await getAllPlayers();
  const ranked = rankPlayers(players);

  return (
    <section className="bg-slate-950 text-slate-100 border-b border-blue-500/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            Season Standings
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Leaderboard</h2>
          <p className="text-sm text-slate-400">
            Ranked by matches played, goals and assists. Updated after every completed match.
          </p>
        </div>

        <LeaderboardClient ranked={ranked} />
      </div>
    </section>
  );
}