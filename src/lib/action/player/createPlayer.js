
"use server";

import { revalidatePath } from "next/cache";
import { backendURL } from "@/lib/core/core";

export const createPlayer = async (submitted) => {
  try {
    const res = await fetch(`${backendURL}/add-player`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitted),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Failed to create player");
    }

    revalidatePath("/players");

    return {
      success: true,
      data: result,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Something went wrong.",
    };
  }
};

