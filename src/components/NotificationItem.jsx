import { timeAgo } from "@/lib/timeAgo";

const TYPE_STYLES = {
  match_selected: { icon: "⚽", box: "bg-blue-500/20 border-blue-500/30" },
  match_removed: { icon: "⚠️", box: "bg-red-500/20 border-red-500/30" },
};

export default function NotificationItem({ n, highlight = false }) {
  const style = TYPE_STYLES[n.type] || TYPE_STYLES.match_selected;

  return (
    <div
      className={`flex gap-3 p-4 transition-colors ${
        highlight ? "bg-blue-500/10" : "hover:bg-slate-800/50"
      }`}
    >
      <div
        className={`size-9 shrink-0 rounded-xl border flex items-center justify-center text-base ${style.box}`}
      >
        {style.icon}
      </div>

      <div className="min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-white">{n.title}</p>
          {highlight && <span className="size-2 rounded-full bg-blue-400 shrink-0" />}
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
        <p className="text-[11px] text-blue-400">{timeAgo(n.createdAt)}</p>
      </div>
    </div>
  );
}