import { authClient } from "@/lib/auth-client";
import { backendURL } from "@/lib/core/core";

export async function getAuthToken() {
  const { data } = await authClient.token();
  return data?.token || null;
}

export async function fetchMyNotifications() {
  try {
    const token = await getAuthToken();
    if (!token) return null;
    const res = await fetch(`${backendURL}/notifications/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("fetchMyNotifications error:", error);
    return null;
  }
}

export async function markAllNotificationsRead() {
  try {
    const token = await getAuthToken();
    if (!token) return false;
    const res = await fetch(`${backendURL}/notifications/read-all`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok;
  } catch (error) {
    console.error("markAllNotificationsRead error:", error);
    return false;
  }
}