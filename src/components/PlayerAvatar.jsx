import Image from "next/image";

export default function PlayerAvatar({ player, size = 40, className = "" }) {
  const initials = (player?.name || "FC").trim().slice(0, 2).toUpperCase();
  const img = player?.imageUrl || player?.image || player?.photo;

  return (
    <div
      className={`relative rounded-full overflow-hidden bg-slate-800 border border-slate-700 shrink-0 flex items-center justify-center text-xs font-bold text-blue-400 ${className}`}
      style={{ width: size, height: size }}
    >
      {img ? (
        <Image
          src={img}
          alt={player?.name || "Player"}
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}