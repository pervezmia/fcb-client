"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { containerVariants } from "@/lib/motion/motion";
import { updateMatchSquad } from "@/lib/action/admin/fixtureAction";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function FixturesPage({ fixturesData = [], allPlayers = [] }) {
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [fixtures, setFixtures] = useState(fixturesData);
  const [actionLoading, setActionLoading] = useState(null);
  // { "groupId-matchIdx": [playerId, ...] }
  const [selected, setSelected] = useState({});

  const togglePlayerSelect = (matchKey, playerId) => {
    setSelected((prev) => {
      const current = prev[matchKey] || [];
      return {
        ...prev,
        [matchKey]: current.includes(playerId)
          ? current.filter((id) => id !== playerId)
          : [...current, playerId],
      };
    });
  };

  // playerIds: array, isRemove: true/false
  const handleSquadUpdate = async (groupId, matchIndex, playerIds, isRemove, loadingKey) => {
    const action = isRemove ? "remove" : "add";
    setActionLoading(loadingKey);

    try {
      const { data: tokenData, error: tokenError } = await authClient.token();
      const token = tokenData?.token;

      if (tokenError || !token) {
        toast.error("Session expired. Please login again.");
        return;
      }

      const res = await updateMatchSquad(groupId, matchIndex, playerIds, action, token);

      if (res?.success) {
        setFixtures((prevFixtures) =>
          prevFixtures.map((group) => {
            if (group._id !== groupId) return group;
            const updatedMatches = [...group.matches];
            updatedMatches[matchIndex] = {
              ...updatedMatches[matchIndex],
              squad: res.squad || [],
            };
            return { ...group, matches: updatedMatches };
          })
        );

        if (!isRemove) {
          setSelected((prev) => ({ ...prev, [`${groupId}-${matchIndex}`]: [] }));
          toast.success(`${playerIds.length} player(s) added to squad`);
        }
      } else {
        toast.error(res?.error || "Failed to update match squad.");
      }
    } catch (err) {
      console.error("Network or Server Error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredFixtures =
    selectedMonth === "All" || !selectedMonth
      ? fixtures
      : fixtures.filter((group) =>
          group.month?.toLowerCase().includes(selectedMonth.toLowerCase())
        );

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border-b border-blue-500/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">MEN&apos;S TEAM</span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Fixtures & Results</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-10">
          {filteredFixtures.map((group, groupIdx) => (
            <div key={group._id || groupIdx} className="space-y-4">
              <h2 className="text-xl font-black text-slate-200 border-l-4 border-blue-500 pl-3">
                {group.month}
              </h2>

              <div className="space-y-4">
                {group.matches?.map((match, matchIdx) => {
                  const matchKey = `${group._id}-${matchIdx}`;
                  const isUpcoming = match.status === "Upcoming";
                  const squadIds = (match.squad || []).map(String);
                  const availablePlayers = allPlayers.filter((p) => !squadIds.includes(String(p._id)));
                  const pickedIds = selected[matchKey] || [];
                  const isAdding = actionLoading === `${matchKey}-add`;

                  return (
                    <div
                      key={matchIdx}
                      className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl backdrop-blur-xl"
                    >
                      {/* Match Details Header */}
                      <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4 flex-1 justify-center md:justify-start">
                          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-black text-blue-400 text-lg">
                            {match.homeLogo || "FCB"}
                          </div>
                          <span className="text-base font-bold text-white text-center md:text-left">{match.homeTeam}</span>
                        </div>

                        <div className="text-center space-y-1 px-4">
                          <p className="text-[11px] font-semibold text-slate-400 tracking-wider">{match.date}</p>
                          <div className="inline-block bg-slate-900 border border-slate-700 px-4 py-1.5 rounded-xl text-sm font-black text-slate-200">
                            {match.time}
                          </div>
                          <p className="text-[10px] text-blue-400 uppercase tracking-widest font-medium">{match.status}</p>
                        </div>

                        <div className="flex items-center gap-4 flex-1 justify-center md:justify-end flex-row-reverse md:flex-row">
                          <span className="text-base font-bold text-white text-center md:text-right">{match.awayTeam}</span>
                          <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center font-black text-red-400 text-lg">
                            {match.awayLogo || "OPP"}
                          </div>
                        </div>
                      </div>

                      {/* SQUAD MANAGEMENT SECTION */}
                      <div
                        className={`border-t border-slate-700/60 bg-slate-900/50 p-4 space-y-4 ${
                          !isUpcoming ? "opacity-50" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Match Squad Management</h4>
                          <span className="text-xs text-blue-400 font-semibold">
                            Selected: {match.squad?.length || 0} Players
                          </span>
                        </div>

                        {!isUpcoming ? (
                          <p className="text-xs text-slate-400">
                            Squad management is disabled because this match is {match.status?.toLowerCase()}.
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {/* Multi-select player list */}
                            <div className="max-h-48 overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl divide-y divide-slate-800">
                              {availablePlayers.length === 0 ? (
                                <p className="p-3 text-xs text-slate-400">All players are already in the squad.</p>
                              ) : (
                                availablePlayers.map((player) => (
                                  <label
                                    key={player._id}
                                    className="flex items-center gap-3 px-3 py-2 text-sm cursor-pointer hover:bg-slate-800/70"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={pickedIds.includes(player._id)}
                                      onChange={() => togglePlayerSelect(matchKey, player._id)}
                                      className="size-4 accent-blue-500"
                                    />
                                    <span className="text-white">
                                      {player.name}
                                      {player.position ? (
                                        <span className="text-slate-400"> ({player.position})</span>
                                      ) : null}
                                    </span>
                                  </label>
                                ))
                              )}
                            </div>

                            <Button
                              size="sm"
                              isDisabled={pickedIds.length === 0 || isAdding}
                              onPress={() =>
                                handleSquadUpdate(group._id, matchIdx, pickedIds, false, `${matchKey}-add`)
                              }
                              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold w-full sm:w-auto"
                            >
                              {isAdding ? "Adding..." : `Add to Match (${pickedIds.length})`}
                            </Button>
                          </div>
                        )}

                        {/* Current squad list */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {match.squad?.map((playerId) => {
                            const playerObj = allPlayers?.find((p) => String(p._id) === String(playerId));
                            const removeKey = `${matchKey}-${playerId}`;
                            const isThisLoading = actionLoading === removeKey;
                            const playerImage = playerObj?.imageUrl || playerObj?.image || playerObj?.photo;

                            return (
                              <div
                                key={playerId}
                                className="flex items-center gap-2 bg-slate-800 border border-slate-700 pl-2 pr-3 py-1.5 rounded-xl text-xs"
                              >
                                {playerImage ? (
                                  <div className="relative w-5 h-5 rounded-full overflow-hidden border border-slate-600 shrink-0">
                                    <Image
                                      src={playerImage}
                                      alt={playerObj?.name || "Player"}
                                      fill
                                      sizes="20px"
                                      className="object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-5 h-5 rounded-full bg-blue-600/30 flex items-center justify-center text-[10px] font-bold text-blue-400 shrink-0">
                                    {playerObj?.name?.charAt(0) || "P"}
                                  </div>
                                )}
                                <span className="text-white font-medium">{playerObj ? playerObj.name : "Player"}</span>

                                {isUpcoming && (
                                  <button
                                    disabled={isThisLoading}
                                    onClick={() =>
                                      handleSquadUpdate(group._id, matchIdx, [playerId], true, removeKey)
                                    }
                                    className="text-red-400 hover:text-red-300 font-bold ml-1 px-1 cursor-pointer disabled:opacity-50"
                                  >
                                    {isThisLoading ? "..." : "×"}
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Footer Venue */}
                      <div className="border-t border-slate-700/60 bg-slate-950/40 py-3 text-center text-xs font-semibold text-slate-300">
                        Match Venue: <span className="text-blue-400">{match.matchCenterUrl || "Boraitola Ground"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}