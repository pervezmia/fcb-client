"use server";

import { backendURL } from "@/lib/core/core";

export async function markAllNotificationsRead(token) {
  try {
    const res = await fetch(`${backendURL}/notifications/read-all`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.message || "Failed to update notifications");
    }
    return { success: true };
  } catch (error) {
    console.error("Mark notifications read error:", error);
    return { success: false, error: error.message };
  }
}