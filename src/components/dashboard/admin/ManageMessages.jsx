"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { getAuthToken } from "@/lib/core/authToken";
import { fetchAdminMessages } from "@/lib/api/adminMessageApi";
import { setMessageRead, deleteMessage } from "@/lib/action/admin/messageAction";
import { timeAgo } from "@/lib/timeAgo";
import ConfirmDialog from "@/components/ConfirmDialog";

// Gmail er compose window (to, subject ar quote kora message shoho)
const gmailComposeUrl = (m) => {
  const body = `Hi ${m.name},\n\n\n\n-----\nYour message to FC Boraitola:\n${m.message}`;
  return (
    "https://mail.google.com/mail/?view=cm&fs=1" +
    `&to=${encodeURIComponent(m.email)}` +
    `&su=${encodeURIComponent(`Re: ${m.subject}`)}` +
    `&body=${encodeURIComponent(body)}`
  );
};

// 01762435084 / +8801762435084 / 880 1762-435084 -> 8801762435084 (WhatsApp er format)
const toWhatsAppNumber = (phone) => {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.startsWith("880")) return digits;
  if (digits.startsWith("0")) return `880${digits.slice(1)}`;
  return digits;
};

// WhatsApp e oi number er chat khole, prothom message likhe rekhe
const whatsappUrl = (m) => {
  const text = `Hi ${m.name}, this is FC Boraitola. Thank you for contacting us about "${m.subject}".`;
  return `https://wa.me/${toWhatsAppNumber(m.phone)}?text=${encodeURIComponent(text)}`;
};

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all | unread
  const [busyId, setBusyId] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const result = await fetchAdminMessages();
      if (!active) return;
      setMessages(result.messages);
      setError(result.error);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const unreadCount = messages.filter((m) => !m.isRead).length;
  const visible = filter === "unread" ? messages.filter((m) => !m.isRead) : messages;

  const getToken = async () => {
    const token = await getAuthToken();
    if (!token) toast.error("Session expired. Please login again.");
    return token;
  };

  const handleCopyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email address copied!");
    } catch {
      toast.error("Could not copy. Please copy it manually.");
    }
  };

  const handleToggleRead = async (m) => {
    const next = !m.isRead;
    setBusyId(m._id);
    try {
      const token = await getToken();
      if (!token) return;

      const res = await setMessageRead(m._id, next, token);
      if (res?.success) {
        setMessages((prev) => prev.map((x) => (x._id === m._id ? { ...x, isRead: next } : x)));
      } else {
        toast.error(res?.error || "Failed to update message.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id) => {
    setBusyId(id);
    try {
      const token = await getToken();
      if (!token) return;

      const res = await deleteMessage(id, token);
      if (res?.success) {
        setMessages((prev) => prev.filter((x) => x._id !== id));
        toast.success("Message deleted.");
      } else {
        toast.error(res?.error || "Failed to delete message.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="w-full p-4 lg:p-8 space-y-6 dark">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <p className="text-sm text-slate-300">Messages sent from the Contact page.</p>
        </div>

        <div className="flex gap-2">
          {[
            { id: "all", label: `All (${messages.length})` },
            { id: "unread", label: `Unread (${unreadCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-colors cursor-pointer ${
                filter === tab.id
                  ? "bg-blue-600 text-white border-blue-500"
                  : "bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-40 rounded-2xl bg-slate-900 border border-slate-800 animate-pulse" />
      ) : error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-950/30 p-5 text-sm text-red-300">
          {error}
        </div>
      ) : visible.length === 0 ? (
        <p className="text-sm text-slate-400">
          {filter === "unread" ? "No unread messages." : "No messages yet."}
        </p>
      ) : (
        <div className="space-y-4">
          {visible.map((m) => {
            const busy = busyId === m._id;
            return (
              <div
                key={m._id}
                className={`rounded-2xl border p-5 space-y-3 ${
                  m.isRead ? "bg-slate-900 border-slate-800" : "bg-blue-500/10 border-blue-500/40"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                      {!m.isRead && <span className="size-2 rounded-full bg-blue-400 shrink-0" />}
                      {m.name}
                    </p>
                    <p className="text-xs text-blue-400 break-all">{m.email}</p>
                    {m.phone && (
                      <p className="text-xs text-slate-300 tabular-nums">📞 {m.phone}</p>
                    )}
                  </div>
                  <div className="text-right space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full border border-slate-700 bg-slate-800 text-[11px] font-semibold text-slate-300">
                      {m.subject}
                    </span>
                    <p className="text-[11px] text-slate-500">{timeAgo(m.createdAt)}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-200 whitespace-pre-wrap break-words leading-relaxed">
                  {m.message}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    href={gmailComposeUrl(m)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                  >
                    Reply by email
                  </a>
                  <Button
                    size="sm"
                    onPress={() => handleCopyEmail(m.email)}
                    className="bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
                  >
                    Copy email
                  </Button>
                  {m.phone && (
                    <>
                      <a
                        href={whatsappUrl(m)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5b] text-slate-950 text-xs font-bold transition-colors"
                      >
                        WhatsApp
                      </a>
                      <a
                        href={`tel:${m.phone}`}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                      >
                        Call
                      </a>
                    </>
                  )}
                  <Button
                    size="sm"
                    isDisabled={busy}
                    onPress={() => handleToggleRead(m)}
                    className="bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
                  >
                    {m.isRead ? "Mark as unread" : "Mark as read"}
                  </Button>
                  <Button
                    size="sm"
                    isDisabled={busy}
                    onPress={() => {
                      setDeleteTarget(m);
                      setDeleteOpen(true);
                    }}
                    className="bg-red-950/40 text-red-400 border border-red-500/30 hover:bg-red-950/70"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete this message?"
        message={`The message from ${deleteTarget?.name || "this sender"} will be deleted permanently.`}
        confirmLabel="Delete Message"
        status="danger"
        onConfirm={() => deleteTarget && handleDelete(deleteTarget._id)}
      />
    </div>
  );
}