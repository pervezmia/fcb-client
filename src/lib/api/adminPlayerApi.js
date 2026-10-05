import { backendURL } from "@/lib/core/core";
import { getAuthToken } from "@/lib/core/authToken";

export async function fetchAdminPlayers() {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { players: [], error: "Session expired. Please login again." };
    }

    const res = await fetch(`${backendURL}/admin/players`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json();

    if (!res.ok) {
      return { players: [], error: data.message || data.error || "Failed to load players." };
    }
    return { players: Array.isArray(data) ? data : [], error: null };
  } catch (error) {
    console.error("fetchAdminPlayers error:", error);
    return { players: [], error: "Failed to load players." };
  }
}