import { backendURL } from "../core/core";

export const getAllPlayers = async () => {
  try {
    const res = await fetch(`${backendURL}/players`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("getAllPlayers error:", error);
    return [];
  }
};

export const getSinglePlayer = async (id) => {
  try {
    const res = await fetch(`${backendURL}/players/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("getSinglePlayer error:", error);
    return null;
  }
};