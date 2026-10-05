"use client";

import { useEffect, useMemo, useState } from "react";
import { Table, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getAuthToken } from "@/lib/core/authToken";
import { fetchAdminPlayers } from "@/lib/api/adminPlayerApi";
import {
  updatePlayerStatus,
  setPlayerBlocked,
  setPlayerRole,
} from "@/lib/action/admin/managePlayerAction";
import { PLAYER_STATUS_LIST, getStatusClasses } from "@/lib/playerStatus";
import PlayerAvatar from "@/components/PlayerAvatar";
import ConfirmDialog from "@/components/ConfirmDialog";

const getMobile = (p) => p.mobile || p.phone || p.phoneNumber || "-";

const selectClass =
  "bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 disabled:opacity-50";

export default function ManagePlayersTable() {
  const { data: session } = authClient.useSession();

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [busyKey, setBusyKey] = useState(null);

  // Confirm dialog: config alada rakhi, jate bondho hobar animation e text na hariye jay
  const [confirmConfig, setConfirmConfig] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const askConfirm = (config) => {
    setConfirmConfig(config);
    setConfirmOpen(true);
  };

  useEffect(() => {
    let active = true;
    (async () => {
      const result = await fetchAdminPlayers();
      if (!active) return;
      setPlayers(result.players);
      setError(result.error);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const isSelf = (p) =>
    !!session?.user &&
    ((p.userId && p.userId === session.user.id) ||
      (p.email && p.email === session.user.email));

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return players;
    return players.filter(
      (p) =>
        (p.name || "").toLowerCase().includes(q) ||
        String(getMobile(p)).toLowerCase().includes(q) ||
        (p.email || "").toLowerCase().includes(q),
    );
  }, [players, search]);

  const stats = {
    total: players.length,
    admins: players.filter((p) => p.role === "admin").length,
    blocked: players.filter((p) => p.isBlocked).length,
  };

  // Ekta action chalay, success hole row update kore, toast dekhay
  const runAction = async (player, key, action, patch, successMsg) => {
    setBusyKey(`${player._id}-${key}`);
    try {
      const token = await getAuthToken();
      if (!token) {
        toast.error("Session expired. Please login again.");
        return;
      }

      const res = await action(token);
      if (res?.success) {
        setPlayers((prev) =>
          prev.map((p) => (p._id === player._id ? { ...p, ...patch } : p)),
        );
        toast.success(successMsg);
      } else {
        toast.error(res?.error || "Action failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setBusyKey(null);
    }
  };

  const handleStatus = (p, status) => {
    if (status === p.status) return;
    const name = (p.name || "Player").trim();
    runAction(
      p,
      "status",
      (t) => updatePlayerStatus(p._id, status, t),
      { status },
      `${name} is now ${status}.`,
    );
  };

  const handleRole = (p, role) => {
    if (role === p.role) return;
    const name = (p.name || "Player").trim();
    const makeAdmin = role === "admin";

    askConfirm({
      title: makeAdmin ? "Make this player an admin?" : "Remove admin access?",
      message: makeAdmin
        ? `${name} will get full control of the site, including managing players, fixtures and photos.`
        : `${name} will lose admin access and become a regular player.`,
      confirmLabel: makeAdmin ? "Make Admin" : "Make Player",
      status: "warning",
      onConfirm: () =>
        runAction(
          p,
          "role",
          (t) => setPlayerRole(p._id, role, t),
          { role },
          `${name} is now ${makeAdmin ? "an admin" : "a player"}.`,
        ),
    });
  };

  const handleBlock = (p) => {
    const next = !p.isBlocked;
    const name = (p.name || "Player").trim();

    askConfirm({
      title: next ? "Block this player?" : "Unblock this player?",
      message: next
        ? `${name} will not be able to use their account until you unblock them.`
        : `${name} will be able to use their account again.`,
      confirmLabel: next ? "Block Player" : "Unblock",
      status: next ? "danger" : "success",
      onConfirm: () =>
        runAction(
          p,
          "block",
          (t) => setPlayerBlocked(p._id, next, t),
          { isBlocked: next },
          next ? `${name} has been blocked.` : `${name} has been unblocked.`,
        ),
    });
  };

  return (
    <div className="w-full p-4 lg:p-8 space-y-6 dark">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Players</h1>
          <p className="text-sm text-slate-300">
            Change status, role and access for every player in the club.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <span className="px-3 py-1.5 rounded-full border bg-slate-800 text-slate-200 border-slate-700">
            {stats.total} {stats.total === 1 ? "player" : "players"}
          </span>
          <span className="px-3 py-1.5 rounded-full border bg-blue-500/15 text-blue-300 border-blue-500/30">
            {stats.admins} {stats.admins === 1 ? "admin" : "admins"}
          </span>
          <span className="px-3 py-1.5 rounded-full border bg-red-500/15 text-red-300 border-red-500/30">
            {stats.blocked} blocked
          </span>
        </div>
      </div>

      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name, mobile or email..."
        className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
      />

      {loading ? (
        <div className="h-40 rounded-2xl bg-slate-900 border border-slate-800 animate-pulse" />
      ) : error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-950/30 p-5 text-sm text-red-300">
          {error}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <Table variant="secondary">
            <Table.ScrollContainer>
              <Table.Content aria-label="Players management table" className="min-w-[900px]">
                <Table.Header>
                  <Table.Column isRowHeader>Player</Table.Column>
                  <Table.Column>Mobile</Table.Column>
                  <Table.Column>Role</Table.Column>
                  <Table.Column>Status</Table.Column>
                  <Table.Column>Access</Table.Column>
                  <Table.Column>Action</Table.Column>
                </Table.Header>

                <Table.Body>
                  {filtered.map((p) => {
                    const self = isSelf(p);
                    const rowBusy = busyKey?.startsWith(`${p._id}-`);

                    return (
                      <Table.Row key={p._id} className={p.isBlocked ? "opacity-70" : ""}>
                        {/* Player */}
                        <Table.Cell>
                          <div className="flex items-center gap-3">
                            <PlayerAvatar player={p} size={36} />
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-white truncate">
                                {p.name}
                                {self && (
                                  <span className="ml-2 text-[10px] font-bold text-blue-400">
                                    (You)
                                  </span>
                                )}
                              </p>
                              <p className="text-[11px] text-slate-500 truncate">
                                {p.position || "-"}
                              </p>
                            </div>
                          </div>
                        </Table.Cell>

                        {/* Mobile */}
                        <Table.Cell>
                          <span className="text-sm text-slate-200 tabular-nums">
                            {getMobile(p)}
                          </span>
                        </Table.Cell>

                        {/* Role */}
                        <Table.Cell>
                          <select
                            value={p.role}
                            disabled={self || rowBusy || !p.hasAccount}
                            onChange={(e) => handleRole(p, e.target.value)}
                            title={
                              !p.hasAccount
                                ? "No login account linked yet"
                                : self
                                  ? "You cannot change your own role"
                                  : undefined
                            }
                            className={selectClass}
                          >
                            <option value="player">Player</option>
                            <option value="admin">Admin</option>
                          </select>
                        </Table.Cell>

                        {/* Status */}
                        <Table.Cell>
                          <div className="flex flex-col gap-1.5">
                            <span
                              className={`w-fit px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${getStatusClasses(
                                p.status,
                              )}`}
                            >
                              {p.status || "Active"}
                            </span>
                            <select
                              value={p.status || "Active"}
                              disabled={rowBusy}
                              onChange={(e) => handleStatus(p, e.target.value)}
                              className={selectClass}
                            >
                              {PLAYER_STATUS_LIST.map((s) => (
                                <option key={s.value} value={s.value}>
                                  {s.value}
                                </option>
                              ))}
                            </select>
                          </div>
                        </Table.Cell>

                        {/* Access */}
                        <Table.Cell>
                          <span
                            className={`px-2.5 py-1 rounded-full border text-[11px] font-bold ${
                              p.isBlocked
                                ? "bg-red-500/15 text-red-300 border-red-500/30"
                                : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                            }`}
                          >
                            {p.isBlocked ? "Blocked" : "Allowed"}
                          </span>
                        </Table.Cell>

                        {/* Action */}
                        <Table.Cell>
                          <Button
                            size="sm"
                            isDisabled={self || rowBusy}
                            onPress={() => handleBlock(p)}
                            className={`font-semibold border ${
                              p.isBlocked
                                ? "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500"
                                : "bg-red-950/40 text-red-400 border-red-500/30 hover:bg-red-950/70"
                            }`}
                          >
                            {self ? "You" : p.isBlocked ? "Unblock" : "Block"}
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>

          {filtered.length === 0 && (
            <p className="p-6 text-center text-sm text-slate-400">No players found.</p>
          )}
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={confirmConfig?.title}
        message={confirmConfig?.message}
        confirmLabel={confirmConfig?.confirmLabel}
        status={confirmConfig?.status}
        onConfirm={confirmConfig?.onConfirm}
      />
    </div>
  );
}