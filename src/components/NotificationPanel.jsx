"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { backendURL } from "@/lib/core/core";

const TYPE_STYLES = {
  match_selected: {
    icon: "⚽",
    unread: "bg-blue-500/10 border-blue-500/40",
    dot: "bg-blue-400",
  },
  match_removed: {
    icon: "⚠️",
    unread: "bg-red-500/10 border-red-500/40",
    dot: "bg-red-400",
  },
};

export default function NotificationPanel() {
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    const { data } = await authClient.token();
    return data?.token;
  };

  const load = useCallback(async () => {
    try {
      const token = await getToken();
      if (!token) return;
      const res = await fetch(`${backendURL}/notifications/me`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const data = await res.json();
      setItems(data.notifications || []);
      setUnread(data.unreadCount || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const markAllRead = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${backendURL}/notifications/read-all`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed");
      setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnread(0);
    } catch {
      toast.error("Failed to mark as read.");
    }
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
          <Button size="sm" onPress={markAllRead} className="bg-slate-700 text-slate-100">
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
          {items.map((n) => {
            const style = TYPE_STYLES[n.type] || TYPE_STYLES.match_selected;
            return (
              <div
                key={n._id}
                className={`rounded-xl border p-3 space-y-1 ${
                  n.isRead ? "bg-slate-900/40 border-slate-700/60" : style.unread
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-white">
                    {style.icon} {n.title}
                  </p>
                  {!n.isRead && (
                    <span className={`size-2 rounded-full shrink-0 ${style.dot}`} />
                  )}
                </div>
                <p className="text-xs text-slate-300">{n.message}</p>
                <p className="text-[10px] text-slate-500">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}