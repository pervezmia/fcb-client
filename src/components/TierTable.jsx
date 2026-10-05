"use client";

import Link from "next/link";
import { Chip, Table } from "@heroui/react";
import { TIERS, getPlayerTier } from "@/lib/playerTier";
import { PODIUM } from "@/lib/rankStyles";
import PlayerAvatar from "./PlayerAvatar";

const NORMAL_TIER = {
  key: "normal",
  min: 0,
  label: "Normal Player",
  icon: "⚽",
  classes: "bg-slate-500/20 text-slate-300 border border-slate-500/40",
};

const columns = [
  { id: "rank", name: "Rank" },
  { id: "matches", name: "Played Match" },
  { id: "players", name: "Players" },
  { id: "status", name: "Status" },
  { id: "top5", name: "Top 5 Players" },
];

const headClass =
  "bg-slate-950 text-slate-200 font-bold uppercase tracking-wider text-xs py-4";

export default function TierTable({ ranked = [] }) {
  const tierList = [...TIERS, NORMAL_TIER]; // gold, silver, bronze, normal

  const rows = tierList.map((tier, i) => {
    const members = ranked.filter(
      (p) => (getPlayerTier(p.matches)?.key || "normal") === tier.key,
    );
    const upper = i === 0 ? null : tierList[i - 1].min - 1;

    return {
      tier,
      position: i + 1,
      count: members.length,
      top5: members.slice(0, 5),
      extra: Math.max(0, members.length - 5),
      matchLabel: upper === null ? `${tier.min}+ matches` : `${tier.min}-${upper} matches`,
    };
  });

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-black text-white">Top Position</h3>

      <div className="dark bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <Table aria-label="Leaderboard rank table" className="bg-slate-900 text-white w-full">
          <Table.ScrollContainer>
            <Table.Content className="min-w-[700px]">
              <Table.Header className="bg-slate-950">
                {columns.map((col) => (
                  <Table.Column key={col.id} id={col.id} isRowHeader={col.id === "rank"} className={headClass}>
                    {col.name}
                  </Table.Column>
                ))}
              </Table.Header>

              <Table.Body className="bg-slate-900">
                {rows.map((row) => {
                  const podium = PODIUM[row.position];

                  return (
                    <Table.Row
                      key={row.tier.key}
                      className="border-b border-slate-800/80 bg-slate-900 hover:bg-slate-800/60 transition-colors"
                    >
                      {/* Rank */}
                      <Table.Cell className="py-4">
                        {podium ? (
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-black ${podium.badge}`}
                          >
                            {podium.medal} Rank {String(row.position).padStart(2, "0")}
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-slate-400 pl-1">
                            Rank {String(row.position).padStart(2, "0")}
                          </span>
                        )}
                      </Table.Cell>

                      {/* Played Match */}
                      <Table.Cell className="py-4">
                        <span className="text-sm font-semibold text-slate-200">{row.matchLabel}</span>
                      </Table.Cell>

                      {/* Players count */}
                      <Table.Cell className="py-4">
                        <span className="text-sm font-bold text-white tabular-nums">{row.count}</span>
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell className="py-4">
                        <Chip size="sm" variant="soft" className={`font-bold ${row.tier.classes}`}>
                          {row.tier.icon} {row.tier.label}
                        </Chip>
                      </Table.Cell>

                      {/* Top 5 Players */}
                      <Table.Cell className="py-4">
                        {row.top5.length === 0 ? (
                          <span className="text-xs text-slate-500">No players yet</span>
                        ) : (
                          <div className="flex items-center">
                            <div className="flex -space-x-2">
                              {row.top5.map((p) => (
                                <Link
                                  key={p._id}
                                  href={`/players/${p._id}`}
                                  title={`${p.name} (${p.matches || 0} matches)`}
                                >
                                  <PlayerAvatar
                                    player={p}
                                    size={34}
                                    className="ring-2 ring-slate-900 hover:z-10 hover:scale-110 transition-transform"
                                  />
                                </Link>
                              ))}
                            </div>
                            {row.extra > 0 && (
                              <span className="ml-3 text-xs font-semibold text-slate-400">
                                +{row.extra}
                              </span>
                            )}
                          </div>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
}