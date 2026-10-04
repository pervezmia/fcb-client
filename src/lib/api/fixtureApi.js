import { backendURL } from "../core/core";

export const getAllFixtures = async () => {
  try {
    const res = await fetch(`${backendURL}/fixtures`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("getAllFixtures error:", error);
    return [];
  }
};