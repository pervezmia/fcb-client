/* import Link from "next/link";
import { getPlayerTier } from "@/lib/playerTier";
import { PODIUM } from "@/lib/rankStyles";
import PlayerAvatar from "./PlayerAvatar";
import TierBadge from "./TierBadge";

export default function LeaderboardTable({ ranked, meId, hasGoals, hasAssists }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">All Players</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-950 text-left text-xs uppercase tracking-wider text-slate-400">
              <th className="px-5 py-3 font-bold">Rank</th>
              <th className="px-5 py-3 font-bold">Player</th>
              <th className="px-5 py-3 font-bold">Tier</th>
              <th className="px-5 py-3 font-bold text-right">Matches</th>
              {hasGoals && <th className="px-5 py-3 font-bold text-right">Goals</th>}
              {hasAssists && <th className="px-5 py-3 font-bold text-right">Assists</th>}
              <th className="px-5 py-3 font-bold text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {ranked.map((p) => {
              const isMe = meId && meId === p._id;
              const s = PODIUM[p.rank];

              return (
                <tr
                  key={p._id}
                  className={`transition-colors hover:bg-slate-800/60 ${
                    isMe ? "bg-blue-500/10 outline outline-1 -outline-offset-1 outline-blue-500/40" : ""
                  }`}
                >
                  <td className="px-5 py-3">
                    {s ? (
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-black ${s.badge}`}
                      >
                        {s.medal} {p.rank}
                      </span>
                    ) : (
                      <span className="font-bold text-slate-400 tabular-nums">{p.rank}</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <Link href={`/players/${p._id}`} className="flex items-center gap-3 group">
                      <PlayerAvatar player={p} size={36} />
                      <div>
                        <p className="font-bold text-white group-hover:text-blue-400 transition-colors">
                          {p.name}
                          {isMe && <span className="ml-2 text-[10px] font-bold text-blue-400">(You)</span>}
                        </p>
                        <p className="text-[11px] text-slate-500">{p.position || "—"}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    {getPlayerTier(p.matches) ? (
                      <TierBadge matches={p.matches} />
                    ) : (
                      <span className="text-xs text-slate-500">Normal</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-slate-200">{p.matches || 0}</td>
                  {hasGoals && (
                    <td className="px-5 py-3 text-right tabular-nums text-slate-200">{p.goals || 0}</td>
                  )}
                  {hasAssists && (
                    <td className="px-5 py-3 text-right tabular-nums text-slate-200">{p.assists || 0}</td>
                  )}
                  <td className="px-5 py-3 text-right font-black tabular-nums text-amber-400">{p.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} */