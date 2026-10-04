"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchMyNotifications, markAllNotificationsRead } from "@/lib/notificationApi";

export function useNotifications({ enabled = true, pollMs = 0 } = {}) {
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    const data = await fetchMyNotifications();
    if (data) {
      setItems(data.notifications || []);
      setUnread(data.unreadCount || 0);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    reload();
    if (!pollMs) return;
    const timer = setInterval(reload, pollMs);
    return () => clearInterval(timer);
  }, [enabled, pollMs, reload]);

  const markAllRead = useCallback(async () => {
    const ok = await markAllNotificationsRead();
    if (ok) {
      setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnread(0);
    }
    return ok;
  }, []);

  return { items, unread, loading, reload, markAllRead };
}

export default useNotifications;