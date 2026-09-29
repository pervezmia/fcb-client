import { backendURL } from "@/lib/core/core";

export const updatePlayerSquadStatus = async (playerId, isInSquad) => {
  try {
    const res = await fetch(`${backendURL}/players/${playerId}/squad`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isInSquad }),
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to update squad status");
    }
    return { success: true, player: data.player };
  } catch (error) {
    console.error("Squad update error:", error);
    return { success: false, error: error.message };
  }
};