"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchMyNotifications } from "@/lib/api/notificationApi";
import { markAllNotificationsRead } from "@/lib/action/player/notificationAction";
import { getAuthToken } from "@/lib/core/authToken";

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
    const token = await getAuthToken();
    if (!token) return false;

    const res = await markAllNotificationsRead(token);
    if (res?.success) {
      setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnread(0);
      return true;
    }
    return false;
  }, []);

  return { items, unread, loading, reload, markAllRead };
}

export default useNotifications;