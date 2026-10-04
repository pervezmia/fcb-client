"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import useNotifications from "@/hooks/useNotifications";
import NotificationItem from "./NotificationItem";

export default function NotificationBell({ profileHref = "/dashboard" }) {
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const { items, unread, markAllRead } = useNotifications({
    enabled: !!session?.user,
    pollMs: 60000,
  });

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
    if (nextOpen && unread > 0) await markAllRead();
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
              items.slice(0, 5).map((n) => <NotificationItem key={n._id} n={n} compact />)
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