"use client";

import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import useNotifications from "@/hooks/useNotifications";
import NotificationItem from "./NotificationItem";

export default function NotificationPanel() {
  const { items, unread, loading, markAllRead } = useNotifications();

  const handleMarkAll = async () => {
    const ok = await markAllRead();
    if (!ok) toast.error("Failed to mark as read.");
  };

  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
          Notifications
          {unread > 0 && (
            <span className="ml-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
              {unread}
            </span>
          )}
        </h3>
        {unread > 0 && (
          <Button size="sm" onPress={handleMarkAll} className="bg-slate-700 text-slate-100">
            Mark all read
          </Button>
        )}
      </div>

      {loading ? (
        <p className="text-xs text-slate-400">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-xs text-slate-400">No notifications yet.</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {items.map((n) => (
            <NotificationItem key={n._id} n={n} />
          ))}
        </div>
      )}
    </div>
  );
}