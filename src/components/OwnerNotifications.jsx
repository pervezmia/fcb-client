"use client";

import { authClient } from "@/lib/auth-client";
import NotificationPanel from "./NotificationPanel";

export default function OwnerNotifications({ playerUserId }) {
  const { data: session } = authClient.useSession();

  // Shudhu profile er malik dekhbe
  if (!session?.user || !playerUserId || session.user.id !== playerUserId) {
    return null;
  }

  return (
    <div className="border-t border-slate-800 mt-6 pt-6">
      <NotificationPanel />
    </div>
  );
}