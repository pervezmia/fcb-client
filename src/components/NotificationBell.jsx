"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { backendURL } from "@/lib/core/core";

const TYPE_ICON = {
  match_selected: "⚽",
  match_removed: "⚠️",
};

export default function NotificationBell({ profileHref = "/dashboard" }) {
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const wrapperRef = useRef(null);

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
      if (!res.ok) return;
      const data = await res.json();
      setItems(data.notifications || []);
      setUnread(data.unreadCount || 0);
    } catch (err) {
      console.error("Notification load error:", err);
    }
  }, []);

  // Login thakle load kore, tarpor protি 60 sec e refresh
  useEffect(() => {
    if (!session?.user) return;
    load();
    const timer = setInterval(load, 60000);
    return () => clearInterval(timer);
  }, [session?.user, load]);

  // Baire click korle dropdown bondho
  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleToggle = async () => {
    const nextOpen = !open;
    setOpen(nextOpen);

    // Khulle shob read kore dao
    if (nextOpen && unread > 0) {
      try {
        const token = await getToken();
        const res = await fetch(`${backendURL}/notifications/read-all`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) setUnread(0);
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!session?.user) return null;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={handleToggle}
        aria-label="Notifications"
        className="relative flex items-center justify-center size-9 rounded-full bg-slate-800/70 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
      >
        <Bell className="size-5" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-slate-800">
            <p className="text-sm font-bold text-white">Notifications</p>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800">
            {items.length === 0 ? (
              <p className="p-4 text-xs text-slate-400">No notifications yet.</p>
            ) : (
              items.slice(0, 5).map((n) => (
                <div key={n._id} className="p-3 space-y-1">
                  <p className="text-xs font-bold text-white">
                    {TYPE_ICON[n.type] || "🔔"} {n.title}
                  </p>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {n.message}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>

          <Link
            href={profileHref}
            onClick={() => setOpen(false)}
            className="block text-center py-2.5 text-xs font-semibold text-blue-400 hover:bg-slate-800 border-t border-slate-800"
          >
            View all
          </Link>
        </div>
      )}
    </div>
  );
}