"use server";

import { backendURL } from "@/lib/core/core";
import { revalidatePath } from "next/cache";

export async function createFixtureAction(payload) {
  try {
    const res = await fetch(`${backendURL}/fixtures`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Failed to create fixture");
    }

    revalidatePath("/fixtures");
    
    // Returns both insertedId / success properties to match component expectations
    return { 
      success: true, 
      insertedId: result.insertedId || result._id || true, 
      data: result 
    };
  } catch (err) {
    return { success: false, error: err.message || "Something went wrong." };
  }
}