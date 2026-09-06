"use server";

import { backendURL } from "@/lib/core/core";
import { revalidatePath } from "next/cache";

export async function createFixtureAction(formData) {
  try {
    const raw = Object.fromEntries(formData.entries());

    const res = await fetch(`${backendURL}/fixtures`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(raw),
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.error || "Failed to create fixture");
    }

    const result = await res.json();
    
    // ক্যাশ রিভ্যালিডেট করা যাতে নতুন ডাটা সাথে সাথে UI-তে আপডেট হয়
    revalidatePath("/fixtures");
    
    return { success: true, data: result };
  } catch (err) {
    return { success: false, error: err.message || "Something went wrong. Please try again." };
  }
}