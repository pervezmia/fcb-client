export const TIERS = [
  {
    key: "gold",
    min: 10,
    label: "Top Favorite",
    icon: "🏆",
    classes: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  },
  {
    key: "silver",
    min: 5,
    label: "Regular Starter",
    icon: "🥈",
    classes: "bg-slate-300/20 text-slate-200 border-slate-300/40",
  },
  {
    key: "bronze",
    min: 3,
    label: "Squad Regular",
    icon: "🥉",
    classes: "bg-orange-500/20 text-orange-300 border-orange-500/40",
  },
];

// null = normal player
export function getPlayerTier(matches = 0) {
  return TIERS.find((t) => Number(matches) >= t.min) || null;
}