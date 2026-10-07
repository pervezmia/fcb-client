"use server";

import { backendURL } from "@/lib/core/core";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBestMoment(formData, token) {
  // FormData থেকে অবজেক্ট আকারে ডাটা তুলে নেওয়া
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch(`${backendURL}/best-moments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      throw new Error(result.error || result.message || "Failed to create best moment.");
    }
  } catch (err) {
    console.error("Error creating moment:", err);
    throw err;
  }

  // সফলভাবে সেভ হওয়ার পর লিস্ট পেজে রিডাইরেক্ট করবে
  revalidatePath("/best-moment");
  redirect("/best-moment");
}