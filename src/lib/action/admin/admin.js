import { baseURL } from "@/lib/core/core";
import { headers } from "next/headers";

export const getAdmin = async () => {
  let adminRealData = null; // ডিক্লেয়ার করে নেওয়া হলো

  try {
    const res = await fetch(
      `${baseURL || "http://localhost:3000"}/api/auth/get-session`,
      {
        headers: await headers(),
        cache: "no-store", // রিয়েল-টাইম ডাটার জন্য ক্যাশ বন্ধ রাখা
      },
    );

    if (res.ok) {
      const session = await res.json();
      if (session?.user) {
        adminRealData = {
          name: session.user.name || "Club Administrator",
          email: session.user.email || "admin@fcboraitola.com",
          role: session.user.role || "Super Admin",
          joinedDate: session.user.createdAt
            ? new Date(session.user.createdAt).toLocaleDateString()
            : "January 2025",
          totalPlayers: 25, // ডেটাবেজ থেকে আনতে পারো
          systemStatus: "Optimal",
        };
      }
    }
  } catch (error) {
    console.error("Failed to fetch session on server:", error);
  }

  return adminRealData; // ডাটা রিটার্ন করতে হবে!
};