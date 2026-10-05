import { TIERS } from "@/lib/playerTier";

// Pore onno stat add korle ekhane weight dao
export const SCORE_WEIGHTS = { matches: 10, goals: 5, assists: 3 };

export function getScore(player) {
  return (
    (Number(player.matches) || 0) * SCORE_WEIGHTS.matches +
    (Number(player.goals) || 0) * SCORE_WEIGHTS.goals +
    (Number(player.assists) || 0) * SCORE_WEIGHTS.assists
  );
}

// Score, tarpor matches, tarpor nam onujayi sort. Same score + matches = same rank
export function rankPlayers(players = []) {
  const list = players
    .map((p) => ({ ...p, score: getScore(p) }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        (Number(b.matches) || 0) - (Number(a.matches) || 0) ||
        (a.name || "").localeCompare(b.name || ""),
    );

  let rank = 0;
  return list.map((p, i) => {
    const prev = list[i - 1];
    if (
      !prev ||
      prev.score !== p.score ||
      (Number(prev.matches) || 0) !== (Number(p.matches) || 0)
    ) {
      rank = i + 1;
    }
    return { ...p, rank };
  });
}

// Porer tier e jete koto match baki
export function getTierProgress(matches = 0) {
  const m = Number(matches) || 0;
  const ascending = [...TIERS].reverse(); // bronze -> silver -> gold
  const next = ascending.find((t) => t.min > m) || null;
  const current = [...ascending].reverse().find((t) => m >= t.min) || null;
  const prevMin = current ? current.min : 0;

  if (!next) return { current, next: null, percent: 100, remaining: 0 };

  const percent = Math.min(100, Math.round(((m - prevMin) / (next.min - prevMin)) * 100));
  return { current, next, percent, remaining: next.min - m };
}