import { backendURL } from "@/lib/core/core";
import { getAuthToken } from "@/lib/core/authToken";

export async function fetchAdminMessages() {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { messages: [], error: "Session expired. Please login again." };
    }

    const res = await fetch(`${backendURL}/admin/messages`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json();

    if (!res.ok) {
      return { messages: [], error: data.message || data.error || "Failed to load messages." };
    }
    return { messages: Array.isArray(data) ? data : [], error: null };
  } catch (error) {
    console.error("fetchAdminMessages error:", error);
    return { messages: [], error: "Failed to load messages." };
  }
}