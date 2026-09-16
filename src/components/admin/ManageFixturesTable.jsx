"use client";

import { useState } from "react";
import { Table, Button } from "@heroui/react";
import { Pencil, FloppyDisk, Xmark } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import StatusSelect from "./StatusSelect";

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
        `http://localhost:5000/fixtures/${groupId}/match/${matchIndex}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: editStatus }), // শুধু স্ট্যাটাস পাঠানো হচ্ছে
        },
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Match status updated successfully!");
        // UI লোকাল স্টেট আপডেট করা
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
    <div className="w-full overflow-x-auto p-4 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Manage Fixtures</h1>
        <p className="text-sm text-slate-400">
          Update match status dynamically.
        </p>
      </div>

      {/* HeroUI v3 Official Table Structure */}
      <Table className="bg-slate-900 border border-slate-800 text-white">
        <Table.ScrollContainer>
          <Table.Content aria-label="Fixtures Management Table">
            <Table.Header>
              <Table.Column
                isRowHeader={true}
                className="bg-slate-950 text-slate-300"
              >
                DATE &amp; TIME
              </Table.Column>
              <Table.Column className="bg-slate-950 text-slate-300">
                VENUE{" "}
              </Table.Column>
              <Table.Column className="bg-slate-950 text-slate-300">
                STATUS
              </Table.Column>
              <Table.Column className="bg-slate-950 text-slate-300 text-right">
                ACTIONS
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {fixtures.flatMap((group) =>
                group.matches.map((match, matchIndex) => {
                  const rowKey = `${group._id}-${matchIndex}`;
                  const isEditing = editingKey === rowKey;

                  return (
                    <Table.Row
                      key={rowKey}
                      className="border-b border-slate-800 hover:bg-slate-800/50"
                    >
                      {/* Date & Time (Fixed to stay in natural single/proper format) */}
                      <Table.Cell>
                        <div className="whitespace-nowrap flex flex-col gap-0.5">
                          <span className="text-xs text-slate-300 font-medium">
                            {match.date}
                          </span>
                          <span className="text-xs font-semibold text-primary">
                            {match.time}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Venue / URL (Static now) */}
                      <Table.Cell>
                        <span className="text-xs text-slate-300">
                          {match.matchCenterUrl || "N/A"}
                        </span>
                      </Table.Cell>

                      {/* Status Dropdown */}
                      <Table.Cell>
                        {isEditing ? (
                          <StatusSelect
                            value={editStatus}
                            onChange={(newStatus) => setEditStatus(newStatus)}
                          />
                        ) : (
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                              match.status === "Live"
                                ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
                                : match.status === "Completed"
                                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                  : match.status === "Cancelled"
                                    ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                                    : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            }`}
                          >
                            {match.status}
                          </span>
                        )}
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell className="text-right">
                        {isEditing ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              size="sm"
                              color="success"
                              isDisabled={loading}
                              onPress={() => handleSave(group._id, matchIndex)}
                              className="text-white"
                            >
                              <FloppyDisk className="size-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="flat"
                              color="danger"
                              isDisabled={loading}
                              onPress={handleCancel}
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
                            className="text-slate-300 hover:text-white"
                          >
                            <Pencil className="size-4" /> Edit Status
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
        <Table.Footer>{/* Optional footer content */}</Table.Footer>
      </Table>
    </div>
  );
}
