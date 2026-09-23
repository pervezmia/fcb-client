"use client";

import { useState } from "react";
import { Table, Button } from "@heroui/react";
import { Pencil, FloppyDisk, Xmark } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import StatusSelect from "./StatusSelect";
import { backendURL } from "@/lib/core/core";

export default function ManageFixturesTable({ initialFixtures }) {
  const [fixtures, setFixtures] = useState(initialFixtures);
  const [editingKey, setEditingKey] = useState(null); // `${groupId}-${matchIndex}`
  const [loading, setLoading] = useState(false);

  // শুধু স্ট্যাটাস আপডেট করার জন্য লোকাল স্টেট
  const [editStatus, setEditStatus] = useState("");

  const handleEditStart = (groupId, matchIndex, match) => {
    setEditingKey(`${groupId}-${matchIndex}`);
    setEditStatus(match.status);
  };

  const handleCancel = () => {
    setEditingKey(null);
    setEditStatus("");
  };

  const handleSave = async (groupId, matchIndex) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${backendURL}/fixtures/${groupId}/match/${matchIndex}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: editStatus }),
        },
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Match status updated successfully!");
        setFixtures((prev) =>
          prev.map((group) => {
            if (group._id === groupId) {
              const updatedMatches = [...group.matches];
              updatedMatches[matchIndex] = {
                ...updatedMatches[matchIndex],
                status: editStatus,
              };
              return { ...group, matches: updatedMatches };
            }
            return group;
          }),
        );
        setEditingKey(null);
      } else {
        toast.error(data.error || "Failed to update match status.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-x-auto p-4 lg:p-8 dark">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Manage Fixtures</h1>
        <p className="text-sm text-slate-300">
          Update match status dynamically.
        </p>
      </div>

      {/* ডার্ক থিম নিশ্চিত করার জন্য wrapper এ bg-slate-900 দেওয়া হয়েছে */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <Table 
          aria-label="Fixtures Management Table"
          className="bg-slate-900 text-white w-full"
        >
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header className="bg-slate-950">
                <Table.Column
                  isRowHeader={true}
                  className="bg-slate-950 text-slate-200 font-bold uppercase tracking-wider text-xs py-4"
                >
                  DATE &amp; TIME
                </Table.Column>
                <Table.Column className="bg-slate-950 text-slate-200 font-bold uppercase tracking-wider text-xs py-4">
                  VENUE
                </Table.Column>
                <Table.Column className="bg-slate-950 text-slate-200 font-bold uppercase tracking-wider text-xs py-4">
                  STATUS
                </Table.Column>
                <Table.Column className="bg-slate-950 text-slate-200 font-bold uppercase tracking-wider text-xs py-4 text-right">
                  ACTIONS
                </Table.Column>
              </Table.Header>
              <Table.Body className="bg-slate-900">
                {fixtures.flatMap((group) =>
                  group.matches.map((match, matchIndex) => {
                    const rowKey = `${group._id}-${matchIndex}`;
                    const isEditing = editingKey === rowKey;

                    return (
                      <Table.Row
                        key={rowKey}
                        className="border-b border-slate-800/80 bg-slate-900 hover:bg-slate-800/60 transition-colors"
                      >
                        {/* Date & Time */}
                        <Table.Cell className="py-4">
                          <div className="whitespace-nowrap flex flex-col gap-1">
                            <span className="text-xs text-slate-100 font-semibold">
                              {match.date}
                            </span>
                            <span className="text-xs font-bold text-emerald-400">
                              {match.time}
                            </span>
                          </div>
                        </Table.Cell>

                        {/* Venue */}
                        <Table.Cell className="py-4">
                          <span className="text-xs text-slate-200 font-medium">
                            {match.matchCenterUrl || "N/A"}
                          </span>
                        </Table.Cell>

                        {/* Status */}
                        <Table.Cell className="py-4">
                          {isEditing ? (
                            <StatusSelect
                              value={editStatus}
                              onChange={(newStatus) => setEditStatus(newStatus)}
                            />
                          ) : (
                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                                match.status === "Live"
                                  ? "bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse"
                                  : match.status === "Completed"
                                    ? "bg-green-500/20 text-green-300 border border-green-500/40"
                                    : match.status === "Cancelled"
                                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                                      : "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                              }`}
                            >
                              {match.status}
                            </span>
                          )}
                        </Table.Cell>

                        {/* Actions */}
                        <Table.Cell className="py-4 text-right">
                          {isEditing ? (
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                color="success"
                                isDisabled={loading}
                                onPress={() => handleSave(group._id, matchIndex)}
                                className="text-white font-medium shadow-md"
                              >
                                <FloppyDisk className="size-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="flat"
                                color="danger"
                                isDisabled={loading}
                                onPress={handleCancel}
                                className="font-medium shadow-md"
                              >
                                <Xmark className="size-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="flat"
                              onPress={() =>
                                handleEditStart(group._id, matchIndex, match)
                              }
                              className="text-slate-100 bg-slate-800 hover:bg-slate-700 hover:text-white font-medium border border-slate-700 shadow-sm"
                            >
                              <Pencil className="size-4 text-emerald-400 mr-1" /> Edit Status
                            </Button>
                          )}
                        </Table.Cell>
                      </Table.Row>
                    );
                  }),
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
}