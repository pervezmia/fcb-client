"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getTokenServer } from "./gettokenserver";
import { backendURL } from "@/lib/core/core";

export const updatePlayer = async (updatedData) => {
  try {
    const token = await getTokenServer();

    if (!token) {
      return { success: false, error: "Could not verify your session. Please sign in again." };
    }

    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return { success: false, error: "You must be logged in to update your profile." };
    }

    const res = await fetch(`${backendURL}/players/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error || "Failed to update profile" };
    }

    revalidatePath("/dashboard/player");

    return { success: true, ...data };
  } catch (err) {
    console.error("Error in updatePlayer action:", err);
    return { success: false, error: err.message };
  }
};