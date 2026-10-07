"use server";

import { backendURL } from "@/lib/core/core";

export async function submitContactMessage(payload) {
  try {
    const res = await fetch(`${backendURL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json();
    console.log("Contact API response:", res.status, data);

    if (!res.ok) {
      throw new Error(data.error || data.message || "Failed to send your message.");
    }

    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, error: error.message };
  }
}