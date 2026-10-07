"use server";

import { backendURL } from "@/lib/core/core";

async function request(path, method, body, token) {
  try {
    const res = await fetch(`${backendURL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.message || "Request failed");
    }
    return { success: true };
  } catch (error) {
    console.error("Message action error:", error);
    return { success: false, error: error.message };
  }
}

export async function setMessageRead(id, isRead, token) {
  return request(`/admin/messages/${id}`, "PATCH", { isRead }, token);
}

export async function deleteMessage(id, token) {
  return request(`/admin/messages/${id}`, "DELETE", null, token);
}