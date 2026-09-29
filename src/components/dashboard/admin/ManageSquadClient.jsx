"use client";

import { useState } from "react";
import { Button, Card } from "@heroui/react";
import { UserPlus, UserMinus, User } from "lucide-react";
import Image from "next/image";
import { updatePlayerSquadStatus } from "@/lib/action/admin/playerAction";

export default function ManageSquadClient({ initialPlayers }) {
  const [players, setPlayers] = useState(initialPlayers);
  const [actionLoading, setActionLoading] = useState(null);

  const handleSquadToggle = async (playerId, currentStatus) => {
    setActionLoading(playerId);
    const newStatus = !currentStatus;

    const res = await updatePlayerSquadStatus(playerId, newStatus);
    
    if (res.success) {
      setPlayers((prev) =>
        prev.map((p) =>
          p._id === playerId 
            ? { ...p, isInSquad: res.player.isInSquad, matches: res.player.matches } 
            : p
        )
      );
    }
    setActionLoading(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {players.map((player) => (
        <Card key={player._id} className="bg-slate-900 border border-slate-800 shadow-xl rounded-2xl p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Player Avatar Circle */}
                <div className="relative size-11 rounded-full overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  {player.imageUrl || player.photo ? (
                    <Image
                      src={player.imageUrl || player.photo}
                      alt={player.name || "Player"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="size-5 text-slate-400" />
                  )}
                </div>

                <div>
                  <h3 className="text-white font-bold text-base leading-tight">{player.name || "Unnamed Player"}</h3>
                  <p className="text-xs text-slate-400">{player.email || "No email provided"}</p>
                </div>
              </div>

              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full shrink-0 ${
                player.isInSquad ? "bg-slate-800 text-slate-200 border border-slate-700" : "bg-slate-950 text-slate-500 border border-slate-900"
              }`}>
                {player.isInSquad ? "In Squad" : "Available"}
              </span>
            </div>

            <Button
              size="sm"
              isLoading={actionLoading === player._id}
              onClick={() => handleSquadToggle(player._id, player.isInSquad)}
              className={`w-full font-semibold transition-all ${
                player.isInSquad
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                  : "bg-slate-100 hover:bg-white text-slate-950 shadow-lg"
              }`}
            >
              {player.isInSquad ? (
                <>
                  <UserMinus className="size-4 mr-1.5" /> Remove from Squad
                </>
              ) : (
                <>
                  <UserPlus className="size-4 mr-1.5 text-slate-900" /> Add to Squad
                </>
              )}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}