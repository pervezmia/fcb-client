import PlayerProfileForm from "@/components/dashboard/player/PlayerProfileForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { backendURL } from "@/lib/core/core";
import { getTokenServer } from "@/lib/action/player/gettokenserver";

export const metadata = {
  title: "Player Profile - FCB Management",
  description: "Manage your player profile information, name, and photo.",
};

function StatusMessage({ children }) {
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <p className="text-muted-foreground">{children}</p>
    </div>
  );
}

export default async function PlayerProfilePage() {
  const requestHeaders = await headers();

  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session?.user) {
    return <StatusMessage>Please sign in to view your player profile.</StatusMessage>;
  }

  const token = await getTokenServer();

  if (!token) {
    // এই message দেখলে বুঝবে সমস্যা auth token আনাতেই —
    // NEXT_PUBLIC_APP_URL ঠিক আছে কিনা, better-auth jwt plugin
    // enabled আছে কিনা, সেটা চেক করো
    return (
      <StatusMessage>
        Could not verify your session (auth token missing). Check
        NEXT_PUBLIC_APP_URL and that the JWT plugin is enabled.
      </StatusMessage>
    );
  }

  let initialPlayerData = null;
  let fetchErrorDetail = null;

  try {
    const res = await fetch(`${backendURL}/players/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      initialPlayerData = await res.json();
    } else {
      // এই message দেখলে বুঝবে সমস্যা backend side-এ (401/404/500)
      const body = await res.json().catch(() => ({}));
      fetchErrorDetail = `Backend responded ${res.status}: ${
        body.error || "no error message"
      }`;
    }
  } catch (error) {
    fetchErrorDetail = `Fetch failed: ${error.message}`;
  }

  if (!initialPlayerData) {
    return (
      <StatusMessage>
        No player profile found yet. Create one to get started.
        {fetchErrorDetail && (
          <span className="block mt-2 text-xs text-red-400">
            Debug: {fetchErrorDetail}
          </span>
        )}
      </StatusMessage>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <PlayerProfileForm initialData={initialPlayerData} />
    </div>
  );
}