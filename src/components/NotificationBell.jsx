"use client";

import { useEffect, useRef, useState } from "react";
import { Bell } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import useNotifications from "@/hooks/useNotifications";
import NotificationItem from "./NotificationItem";

export default function NotificationBell() {
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [newIds, setNewIds] = useState([]); // dropdown khola obosthay notun gulo highlight
  const wrapperRef = useRef(null);

  const { items, unread, loading, markAllRead } = useNotifications({
    enabled: !!session?.user,
    pollMs: 60000,
  });

  const closeMenu = () => {
    setOpen(false);
    setNewIds([]);
  };

  // Baire click ba Escape chapleo bondho
  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) closeMenu();
    };
    const handleKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleToggle = async () => {
    if (open) {
      closeMenu();
      return;
    }
    setNewIds(items.filter((n) => !n.isRead).map((n) => n._id));
    setOpen(true);
    if (unread > 0) await markAllRead();
  };

  if (!session?.user) return null;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={handleToggle}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative flex items-center justify-center size-9 rounded-full text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
      >
        <Bell className="size-5" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed left-2 right-2 top-[4.25rem] sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-3 sm:w-96 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <p className="text-sm font-bold text-white">Notifications</p>
            <span className="text-[11px] text-slate-400">{items.length} total</span>
          </div>

          <div className="max-h-[28rem] overflow-y-auto divide-y divide-slate-800/80">
            {loading ? (
              <p className="p-5 text-xs text-slate-400">Loading...</p>
            ) : items.length === 0 ? (
              <p className="p-5 text-sm text-slate-400 text-center">No notifications yet.</p>
            ) : (
              items.map((n) => (
                <NotificationItem key={n._id} n={n} highlight={newIds.includes(n._id)} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}