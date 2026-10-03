import { backendURL } from "@/lib/core/core";
import { TIERS, getPlayerTier } from "@/lib/playerTier";
import TierBadge from "./TierBadge";

async function getPlayers() {
  try {
    const res = await fetch(`${backendURL}/players`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch players");
    return await res.json();
  } catch (error) {
    console.error("TopPlayers fetch error:", error);
    return [];
  }
}

export default async function TopPlayers() {
  const players = await getPlayers();

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <h2 className="text-2xl font-black text-white">Player Rankings</h2>

      {TIERS.map((tier) => {
        const group = players
          .filter((p) => getPlayerTier(p.matches)?.key === tier.key)
          .sort((a, b) => (b.matches || 0) - (a.matches || 0));

        if (group.length === 0) return null;

        return (
          <div key={tier.key} className="space-y-3">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              {tier.icon} {tier.label} ({tier.min}+ matches)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.map((p) => (
                <div
                  key={p._id}
                  className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-bold text-white">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.matches || 0} matches</p>
                  </div>
                  <TierBadge matches={p.matches} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}