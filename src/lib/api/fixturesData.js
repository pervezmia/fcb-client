import { backendURL } from "@/lib/core/core";

export async function getFixtures() {
  try {
    const res = await fetch(`${backendURL}/fixtures`, {
      cache: "no-store", // অথবা next: { revalidate: 0 } যাতে ক্যাশ না ধরে
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    
    // ডেটা নিশ্চিতভাবে অ্যারে কি না চেক করা (জরুরি)
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch fixtures:", error);
    return [];
  }
}