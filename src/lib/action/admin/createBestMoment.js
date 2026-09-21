"use server";

import { redirect } from "next/navigation";

export async function createBestMoment(formData) {
  // FormData থেকে অবজেক্ট আকারে ডাটা তুলে নেওয়া
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("http://localhost:5000/best-moments", {
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

  // সফলভাবে সেভ হওয়ার পর লিস্ট পেজে রিডাইরেক্ট করবে
  redirect("/best-moment");
}