import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { backendURL } from "@/lib/core/core";
import { getTokenServer } from "@/lib/action/player/gettokenserver";

export const metadata = {
  title: "My Player Dashboard - FCB Management",
};

function StatusMessage({ children }) {
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <p className="text-muted-foreground">{children}</p>
    </div>
  );
}

export default async function PlayerDashboardPage() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session?.user) {
    return <StatusMessage>Please sign in to view your player dashboard.</StatusMessage>;
  }

  const token = await getTokenServer();
  if (!token) {
    return <StatusMessage>Could not verify your session.</StatusMessage>;
  }

  let player = null;
  try {
    const res = await fetch(`${backendURL}/players/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (res.ok) {
      player = await res.json();
    }
  } catch (error) {
    // fetch fail হলে profile নেই ধরে নিয়ে নিচে "Create" দেখানো হবে
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      {player ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Welcome, {player.name}
          </h1>
          <p className="text-slate-400 mb-6">
            Jersey #{player.jerseyNumber} · {player.position}
          </p>
          <Link
            href="/dashboard/player/profile-edit"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Edit Profile
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-slate-400 mb-6">
            You haven&apos;t created your player profile yet.
          </p>
          <Link
            href="/dashboard/player/create"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Create Profile
          </Link>
        </div>
      )}
    </div>
  );
}