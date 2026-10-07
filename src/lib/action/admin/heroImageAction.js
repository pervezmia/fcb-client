"use server";

import { backendURL } from "@/lib/core/core";
import { revalidatePath } from "next/cache";

function authHeaders(token) {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function addHeroImage(src, alt, token) {
  try {
    const res = await fetch(`${backendURL}/hero-images`, {
      method: "POST",
      headers: authHeaders(token),
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

export async function toggleHeroImage(id, isActive, token) {
  try {
    const res = await fetch(`${backendURL}/hero-images/${id}`, {
      method: "PATCH",
      headers: authHeaders(token),
      body: JSON.stringify({ isActive }),
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.message || "Failed to update image");
    }

    revalidatePath("/");
    return { success: true, isActive };
  } catch (error) {
    console.error("Toggle hero image error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteHeroImage(id, token) {
  try {
    const res = await fetch(`${backendURL}/hero-images/${id}`, {
      method: "DELETE",
      headers: authHeaders(token),
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