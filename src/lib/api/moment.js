"use server";

import { redirect } from "next/navigation";
import { backendURL } from "../core/core";

const API_URL = backendURL || "http://localhost:5000";

// ১. সব বেস্ট মোমেন্ট ফেচ করার জন্য
export async function getBestMoments() {
  try {
    const res = await fetch(`${API_URL}/best-moments`, {
      cache: "no-store", // সবসময় ফ্রেশ ডেটা পাওয়ার জন্য
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch moments:", err);
    return [];
  }
}

// ২. নতুন মোমেন্ট তৈরির জন্য (আগের ফাংশন)
export async function createBestMoment(formData) {
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch(`${API_URL}/best-moments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      throw new Error(result.error || "Failed to create best moment.");
    }
  } catch (err) {
    console.error("Error creating moment:", err);
    throw err;
  }

  redirect("/best-moment");
}