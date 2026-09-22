import ManageFixturesTable from "@/components/admin/ManageFixturesTable";
import { backendURL } from "@/lib/core/core";

// এসইও অপ্টিমাইজেশনের জন্য মেটাডাটা
export const metadata = {
  title: "Manage Fixtures | Admin Dashboard",
  description: "Manage, update, and monitor match fixtures, timings, and statuses for FC Boraitola.",
};

// ডাটা ফেচ করার ফাংশন
async function getFixtures() {
  try {
    const res = await fetch(`${backendURL}/fixtures`, {
      cache: "no-store", // সবসময় ফ্রেশ ডেটা পাওয়ার জন্য
    });
    if (!res.ok) throw new Error("Failed to fetch fixtures");
    return await res.json();
  } catch (error) {
    console.error("Error loading fixtures:", error);
    return [];
  }
}

export default async function ManageFixturesPage() {
  const initialFixtures = await getFixtures();

  return (
    <main className="w-full min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Child Component-এ ইনিশিয়াল ডেটা প্রপ আকারে পাস করা হলো */}
        <ManageFixturesTable initialFixtures={initialFixtures} />
      </div>
    </main>
  );
}