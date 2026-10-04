import { getTierProgress } from "@/lib/leaderboard";
import { HEX } from "@/lib/rankStyles";
import TierBadge from "./TierBadge";

function InfoBox({ children }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400">
      {children}
    </div>
  );
}

export default function MyPositionCard({ me, ranked, hasGoals, isLoggedIn, isPending }) {
  let content;

  if (isPending) {
    content = <div className="h-32 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse" />;
  } else if (!isLoggedIn) {
    content = <InfoBox>Login to see your position on the leaderboard.</InfoBox>;
  } else if (!me) {
    content = (
      <InfoBox>No player profile is linked to your account yet, so you are not ranked.</InfoBox>
    );
  } else {
    const ahead = [...ranked].reverse().find((p) => p.rank < me.rank);
    const progress = getTierProgress(me.matches);

    content = (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Rank + stats */}
        <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/60 p-5 flex flex-col sm:flex-row items-center gap-5">
          <div
            className="size-24 shrink-0 bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center"
            style={{ clipPath: HEX }}
          >
            <div
              className="size-[88px] bg-slate-950 flex items-center justify-center text-3xl font-black text-emerald-400"
              style={{ clipPath: HEX }}
            >
              {me.rank}
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <p className="text-xs text-slate-400">
              Rank {me.rank} of {ranked.length}
            </p>
            <p className="text-2xl font-black text-white">{me.name}</p>
            <p className="text-sm font-semibold text-amber-400">{me.score} points</p>
            {ahead ? (
              <p className="text-[11px] text-slate-400">
                {ahead.score - me.score} pts behind {ahead.name}
              </p>
            ) : (
              <p className="text-[11px] text-emerald-400">You are leading the table!</p>
            )}
          </div>

          <div className="flex sm:flex-col gap-2 text-center">
            <div className="rounded-xl bg-slate-950 border border-slate-800 px-4 py-2">
              <p className="text-lg font-black text-white">{me.matches || 0}</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">Matches</p>
            </div>
            {hasGoals && (
              <div className="rounded-xl bg-slate-950 border border-slate-800 px-4 py-2">
                <p className="text-lg font-black text-white">{me.goals || 0}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">Goals</p>
              </div>
            )}
          </div>
        </div>

        {/* Tier progress */}
        <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/40 to-slate-900/60 p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">Status</p>
              <p className="text-xl font-black text-white">
                {progress.current ? progress.current.label : "Normal Player"}
              </p>
            </div>
            <TierBadge matches={me.matches} />
          </div>

          {progress.next ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">
                  Progress to {progress.next.label}
                </span>
                <span className="text-slate-400 tabular-nums">
                  {me.matches || 0} / {progress.next.min} matches
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                {progress.remaining} more match{progress.remaining > 1 ? "es" : ""} to unlock{" "}
                {progress.next.icon} {progress.next.label}
              </p>
            </div>
          ) : (
            <p className="text-sm font-semibold text-yellow-300">🏆 Highest tier reached. Keep it up!</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-emerald-400">Your Global Position</p>
      {content}
    </div>
  );
}