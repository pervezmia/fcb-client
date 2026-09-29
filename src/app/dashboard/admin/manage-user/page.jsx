import ManageSquadClient from "@/components/dashboard/admin/ManageSquadClient";
import { backendURL } from "@/lib/core/core";
import { Users } from "lucide-react";

export const metadata = {
  title: "Manage Users & Squad - FCB Management",
  description: "Admin panel to manage squad members and match counts.",
};

// সার্ভার সাইডে প্লেয়ার ডাটা ফেচ করার ফাংশন
async function getPlayers() {
  try {
    const res = await fetch(`${backendURL}/players`, {
      cache: "no-store", // রিয়েল-টাইম ডাটার জন্য ক্যাশ বন্ধ রাখা হলো
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch players:", error);
    return [];
  }
}

export default async function ManageUserPage() {
  const players = await getPlayers();

  return (
    <div className="w-full p-4 lg:p-8 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Users className="size-6 text-slate-300" />
          Manage Squad & Users
        </h1>
        <p className="text-sm text-slate-400">
          Add or remove players from the active squad. Matches count will update automatically.
        </p>
      </div>

      {/* ক্লায়েন্ট কম্পোনেন্টে ইনিশিয়াল ডাটা পাস করা হলো */}
      <ManageSquadClient initialPlayers={players} />
    </div>
  );
}