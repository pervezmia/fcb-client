import { getSinglePlayer } from '@/lib/api/player';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from "@heroui/react";
import { ArrowLeft, Calendar, ShieldCheck, MapPin } from "@gravity-ui/icons";

const statusStyles = {
    Active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Injured: "bg-red-500/15 text-red-400 border-red-500/30",
    Suspended: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

const teamLabels = {
    "fc-boraitola": "FC Boraitola",
    "boraitola-tigers": "Boraitola Tigers",
    "club": "Club",
};

const PlayersDetailsPage = async ({ params }) => {
    const resolvedParams = await params;
    const { playerId } = resolvedParams;
    const player = await getSinglePlayer(playerId);

    if (!player || player.error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <p className="text-2xl text-slate-300 font-bold">Player not found!</p>
            </div>
        );
    }

    const getInitials = (name) => {
        if (!name) return "FC";
        const parts = name.trim().split(" ");
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const statusClass = statusStyles[player.status] || statusStyles.Active;
    const teamLabel = teamLabels[player.team] || player.team;

    return (
        <main className="min-h-screen bg-slate-950 p-4 sm:p-6 md:p-12 flex items-center justify-center">
            <Card className="max-w-4xl w-full bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-blue-500/20">
                <div className="p-0">
                    <div className="flex flex-col md:flex-row">

                        {/* Player Image / Initials Section */}
                        <div className="md:w-1/2 relative bg-slate-800 h-[360px] md:h-auto min-h-[420px] flex items-center justify-center">
                            {player.photo ? (
                                <Image
                                    src={player.photo}
                                    alt={player.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                    <span className="text-6xl md:text-8xl font-black text-white tracking-widest">
                                        {getInitials(player.name)}
                                    </span>
                                </div>
                            )}

                            {/* Gradient overlay for legibility on small screens */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent md:hidden" />

                            {/* Jersey Number Overlay */}
                            <div className="absolute top-4 left-4 bg-gradient-to-br from-blue-600 to-red-600 text-white font-black text-2xl md:text-3xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full shadow-lg border-4 border-slate-900 z-10">
                                {player.jerseyNumber ?? "-"}
                            </div>

                            {/* Status Badge Overlay */}
                            <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full border backdrop-blur-md ${statusClass}`}>
                                {player.status || "Active"}
                            </span>
                        </div>

                        {/* Player Details Section */}
                        <div className="md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                            <span className="uppercase tracking-widest text-xs font-bold text-blue-400 mb-2">
                                {player.position}
                            </span>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1 leading-tight">
                                {player.name}
                            </h1>

                            <p className="flex items-center gap-1.5 text-sm text-slate-400 mb-6">
                                <ShieldCheck className="w-4 h-4 text-blue-400" />
                                {teamLabel}
                            </p>

                            {/* Info Grid */}
                            <div className="border-t border-slate-800 pt-6">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Position</p>
                                        <p className="font-bold text-base text-white">{player.position || "—"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Squad Number</p>
                                        <p className="font-bold text-base text-white">{player.jerseyNumber ?? "—"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Age</p>
                                        <p className="font-bold text-base text-white">{player.age ? `${player.age} yrs` : "—"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> Nationality
                                        </p>
                                        <p className="font-bold text-base text-white">{player.nationality || "—"}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-slate-500 mb-1 uppercase tracking-wide flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> Joined Club
                                        </p>
                                        <p className="font-bold text-base text-white">{formatDate(player.joinedDate)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            {player.bio && (
                                <div className="border-t border-slate-800 mt-6 pt-6">
                                    <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">About</p>
                                    <p className="text-sm text-slate-300 leading-relaxed">{player.bio}</p>
                                </div>
                            )}

                            {/* Back Button */}
                            <Link
                                href="/players"
                                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-blue-400 transition-colors w-fit"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back to Squad
                            </Link>
                        </div>

                    </div>
                </div>
            </Card>
        </main>
    );
};

export default PlayersDetailsPage;