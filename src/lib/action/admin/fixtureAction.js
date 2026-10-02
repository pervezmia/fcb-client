"use server";

import { backendURL } from "@/lib/core/core";
import { revalidatePath } from "next/cache";

// add -> playerIds array, remove -> single id array [id]
export async function updateMatchSquad(groupId, matchIndex, playerIds, action, token) {
  try {
    const res = await fetch(`${backendURL}/fixtures/${groupId}/match/${matchIndex}/squad`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ playerIds, action }),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || data.message || "Failed to update match squad");
    }

    revalidatePath("/admin/fixtures");
    revalidatePath("/fixtures");

    return { success: true, squad: data.squad || [] };
  } catch (error) {
    console.error("Match Squad Update Error:", error);
    return { success: false, error: error.message };
  }
}