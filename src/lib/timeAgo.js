export function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (Number.isNaN(diff)) return "";
  if (diff < 60) return "just now";

  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];

  for (const [name, secs] of units) {
    const value = Math.floor(diff / secs);
    if (value >= 1) return `${value} ${name}${value > 1 ? "s" : ""} ago`;
  }
  return "just now";
}