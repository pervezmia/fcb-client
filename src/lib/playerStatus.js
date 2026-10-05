export const PLAYER_STATUS_LIST = [
  {
    value: "Active",
    hint: "Available for selection",
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  {
    value: "Injured",
    hint: "Recovering, unavailable for matches",
    classes: "bg-red-500/15 text-red-400 border-red-500/30",
  },
  {
    value: "Suspended",
    hint: "Disciplinary suspension",
    classes: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  {
    value: "Inactive",
    hint: "Not attending training or matches regularly",
    classes: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  },
  {
    value: "Retired",
    hint: "No longer playing for the club",
    classes: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  },
];

export const PLAYER_STATUS = Object.fromEntries(
  PLAYER_STATUS_LIST.map((s) => [s.value, s]),
);

export const getStatusClasses = (status) =>
  (PLAYER_STATUS[status] || PLAYER_STATUS.Active).classes;