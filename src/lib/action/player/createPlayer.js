"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { backendURL } from "@/lib/core/core";
import { getTokenServer } from "./gettokenserver";

export const createPlayer = async (newPlayerData) => {
  try {
    const token = await getTokenServer();
    console.log("getTokenServer result:", token); // temporary debug log — পরে সরিয়ে দিও

    const session = await auth.api.getSession({ headers: await headers() });

    if (!token) {
      return { success: false, error: "Could not get auth token — check NEXT_PUBLIC_APP_URL and that you're logged in." };
    }

    if (!session?.user) {
      return { success: false, error: "You must be logged in to add a player." };
    }

    const res = await fetch(`${backendURL}/add-player`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPlayerData),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error || "Failed to create player" };
    }

    revalidatePath("/players");

    return { success: true, ...data };
  } catch (err) {
    console.error("Error in createPlayer action:", err);
    return { success: false, error: err.message };
  }
};