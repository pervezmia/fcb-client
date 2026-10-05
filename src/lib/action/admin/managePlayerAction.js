"use server";

import { backendURL } from "@/lib/core/core";
import { revalidatePath } from "next/cache";

// Eta export kora hoyni, tai async hobar dorkar nai (internal helper)
async function patchPlayer(path, body, token) {
  try {
    const res = await fetch(`${backendURL}/admin/players/${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.message || "Request failed");
    }

    revalidatePath("/players");
    revalidatePath("/leaderboard");
    return { success: true };
  } catch (error) {
    console.error("Manage player error:", error);
    return { success: false, error: error.message };
  }
}

export async function updatePlayerStatus(id, status, token) {
  return patchPlayer(`${id}/status`, { status }, token);
}

export async function setPlayerBlocked(id, isBlocked, token) {
  return patchPlayer(`${id}/block`, { isBlocked }, token);
}

export async function setPlayerRole(id, role, token) {
  return patchPlayer(`${id}/role`, { role }, token);
}