import Link from "next/link";
import { PODIUM } from "@/lib/rankStyles";
import PlayerAvatar from "./PlayerAvatar";

export default function Podium({ players = [], hasGoals = false }) {
  if (players.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
      {players.map((p) => {
        const s = PODIUM[p.rank];
        if (!s) return null;

        return (
          <Link
            key={p._id}
            href={`/players/${p._id}`}
            className={`${s.order} ${s.pad} rounded-2xl border p-5 shadow-xl text-center space-y-3 transition-transform hover:-translate-y-1 ${s.card}`}
          >
            <div className="text-4xl">{s.medal}</div>
            <div className={`mx-auto w-fit rounded-full ring-2 ${s.ring} p-0.5`}>
              <PlayerAvatar player={p} size={64} />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-black text-white">{p.name}</p>
              <p className="text-xs text-slate-400">{p.position || "Player"}</p>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full border text-[11px] font-bold ${s.badge}`}>
              #{p.rank} {s.title}
            </span>
            <p className={`text-2xl font-black tabular-nums ${s.text}`}>
              {p.score} <span className="text-xs font-semibold text-slate-400">pts</span>
            </p>
            <p className="text-[11px] text-slate-400">
              {p.matches || 0} matches
              {hasGoals ? ` · ${p.goals || 0} goals` : ""}
            </p>
          </Link>
        );
      })}
    </div>
  );
}