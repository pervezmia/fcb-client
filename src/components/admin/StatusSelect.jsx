"use client";

import { Select, ListBox } from "@heroui/react";

const STATUS_OPTIONS = [
  "Upcoming",
  "Live",
  "Completed",
  "Cancelled",
];

export default function StatusSelect({ value, onChange }) {
  return (
    <Select
      className="w-[140px]"
      selectedKey={value}
      onSelectionChange={(key) => {
        if (key) onChange(key);
      }}
      aria-label="Match Status"
    >
      <Select.Trigger className="bg-slate-950 text-white border border-slate-700 text-xs px-2.5 py-1.5 rounded-md">
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="bg-slate-900 border border-slate-700 text-white">
        <ListBox>
          {STATUS_OPTIONS.map((opt) => (
            <ListBox.Item key={opt} id={opt} textValue={opt} className="hover:bg-slate-800 text-white">
              {opt}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}