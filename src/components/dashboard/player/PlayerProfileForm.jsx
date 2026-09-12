"use client";

import React, { useState } from "react";
import { Input, Button, Label } from "@heroui/react";
import { Save, Calendar, FileText, User, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function PlayerProfileForm({ initialData }) {
  const [playerData, setPlayerData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log("Updated Player Data:", playerData);
    
    setTimeout(() => {
      setLoading(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white">Player Profile</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your personal club information, update your name, photo, and details.
        </p>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-blue-600 shadow-md mb-3">
          <Image
            src={playerData.photo || "https://via.placeholder.com/150"}
            alt={playerData.name || "Player Profile"}
            fill
            sizes="112px"
            priority
            className="object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold text-white">{playerData.name}</h2>
        <div className="flex gap-2 mt-2">
          <span className="text-xs bg-blue-900/50 text-blue-400 px-3 py-1 rounded-full border border-blue-700/50">
            {playerData.position}
          </span>
          <span className="text-xs bg-emerald-900/50 text-emerald-400 px-3 py-1 rounded-full border border-emerald-700/50">
            Jersey: #{playerData.jerseyNumber}
          </span>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name" className="text-sm font-medium text-slate-300">
            Player Name
          </Label>
          <Input
            id="name"
            name="name"
            value={playerData.name}
            onChange={handleChange}
            variant="bordered"
            required
            placeholder="Enter player name"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="age" className="text-sm font-medium text-slate-300">
            Age
          </Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={playerData.age}
            onChange={handleChange}
            variant="bordered"
            required
            placeholder="Enter age"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="photo" className="text-sm font-medium text-slate-300">
            Profile Photo URL
          </Label>
          <Input
            id="photo"
            name="photo"
            value={playerData.photo}
            onChange={handleChange}
            variant="bordered"
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="bio" className="text-sm font-medium text-slate-300">
            Bio
          </Label>
          <Input
            id="bio"
            name="bio"
            value={playerData.bio}
            onChange={handleChange}
            variant="bordered"
            placeholder="Write something about yourself..."
          />
        </div>

        <Button
          type="submit"
          color="primary"
          isLoading={loading}
          className="mt-4 w-full font-semibold py-6 bg-blue-600 hover:bg-blue-700 text-white"
          startContent={!loading && <Save size={18} />}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}