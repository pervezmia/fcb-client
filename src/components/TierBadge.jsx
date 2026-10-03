import { getPlayerTier } from "@/lib/playerTier";

export default function TierBadge({ matches = 0, className = "" }) {
  const tier = getPlayerTier(matches);
  if (!tier) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-bold ${tier.classes} ${className}`}
    >
      {tier.icon} {tier.label}
    </span>
  );
}