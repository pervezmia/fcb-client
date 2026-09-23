import Profile from "@/components/players/Profile";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenServer } from "@/lib/action/player/gettokenserver";
import { backendURL } from "@/lib/core/core";
import Link from "next/link";
import { Button } from "@heroui/react";
import { UserPlus, Sparkles, AlertCircle, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Player Profile - FCB Management",
  description: "View your player profile information.",
};

function StatusMessage({ children, type = "info", debugText = null }) {
  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center p-4 lg:p-8">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
        
        {/* Top Minimal Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />

        {/* Icon Badge */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 mb-5 shadow-inner">
          {type === "auth" ? <ShieldAlert className="size-8" /> : <UserPlus className="size-8" />}
        </div>

        {/* Main Message */}
        <h2 className="text-xl font-bold text-[#f11b1b] mb-2 tracking-wide">
          {type === "auth" ? "Authentication Required" : "No Player Profile Found"}
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
          {children}
        </p>

        {/* Debug / Error Box */}
        {debugText && (
          <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-6 text-left">
            <AlertCircle className="size-4 shrink-0" />
            <span className="truncate">{debugText}</span>
          </div>
        )}

        {/* Action Buttons with Consistent Monochromatic / Slate Styling */}
        <div className="flex flex-col gap-3">
          {type === "auth" ? (
            <Link href="/auth/login">
              <Button
                size="sm"
                className="w-full bg-slate-100 hover:bg-white text-slate-950 font-semibold shadow-lg transition-all duration-300"
              >
                Sign In Now
              </Button>
            </Link>
          ) : (
            <Link href="/dashboard/player/create">
              <Button
                size="sm"
                className="w-full bg-[#1062dd] hover:bg-[#5b9bfa] text-slate-950 font-semibold shadow-lg transition-all duration-300"
              >
                <Sparkles className="size-4 mr-1.5 text-slate-900" />
                Create Player Profile
              </Button>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}

export default async function PlayerProfilePage() {
  const requestHeaders = await headers();

  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session?.user) {
    return (
      <StatusMessage type="auth">
        Please sign in to view and manage your player profile.
      </StatusMessage>
    );
  }

  const token = await getTokenServer();

  if (!token) {
    return (
      <StatusMessage type="auth" debugText="Could not verify session token">
        Could not verify your session. Please sign in again to continue.
      </StatusMessage>
    );
  }

  let player = null;
  let fetchErrorDetail = null;

  try {
    const res = await fetch(`${backendURL}/players/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      player = await res.json();
    } else {
      const body = await res.json().catch(() => ({}));
      fetchErrorDetail = `Backend responded ${res.status}: ${
        body.error || "no error message"
      }`;
    }
  } catch (error) {
    fetchErrorDetail = `Fetch failed: ${error.message}`;
  }

  if (!player) {
    return (
      <StatusMessage debugText={fetchErrorDetail}>
        You haven't created your player profile yet. Create one to get started.
      </StatusMessage>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <Profile player={player} />
      </div>
    </div>
  );
}