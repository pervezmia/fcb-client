"use server";

import { backendURL } from "@/lib/core/core";
import { revalidatePath } from "next/cache";

export async function addHeroImage(src, alt, token) {
  try {
    const res = await fetch(`${backendURL}/hero-images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ src, alt }),
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.message || "Failed to add image");
    }

    revalidatePath("/");
    return { success: true, image: data.image };
  } catch (error) {
    console.error("Add hero image error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteHeroImage(id, token) {
  try {
    const res = await fetch(`${backendURL}/hero-images/${id}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.message || "Failed to delete image");
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete hero image error:", error);
    return { success: false, error: error.message };
  }
}