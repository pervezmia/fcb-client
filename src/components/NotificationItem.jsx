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

export default function NotificationItem({ n, compact = false }) {
  const style = TYPE_STYLES[n.type] || TYPE_STYLES.match_selected;

  if (compact) {
    return (
      <div className="p-3 space-y-1">
        <p className="text-xs font-bold text-white">
          {style.icon} {n.title}
        </p>
        <p className="text-[11px] text-slate-300 leading-relaxed">{n.message}</p>
        <p className="text-[10px] text-slate-500">{new Date(n.createdAt).toLocaleString()}</p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border p-3 space-y-1 ${
        n.isRead ? "bg-slate-900/40 border-slate-700/60" : style.unread
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-bold text-white">
          {style.icon} {n.title}
        </p>
        {!n.isRead && <span className={`size-2 rounded-full shrink-0 ${style.dot}`} />}
      </div>
      <p className="text-xs text-slate-300">{n.message}</p>
      <p className="text-[10px] text-slate-500">{new Date(n.createdAt).toLocaleString()}</p>
    </div>
  );
}