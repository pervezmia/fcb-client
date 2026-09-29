import { getSinglePlayer } from '@/lib/api/player';
import React from 'react';
import { Card } from "@heroui/react";
import Profile from '@/components/players/Profile';
import { Trophy } from "lucide-react";

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

    return (
        <main className="min-h-screen bg-slate-950 p-4 sm:p-6 md:p-12 flex items-center justify-center">
            <div className="max-w-4xl w-full space-y-6">
                
                {/* Total Matches Played Highlight Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-slate-800 text-slate-200 border border-slate-700">
                            <Trophy className="size-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-slate-400">Career Statistics</h4>
                            <p className="text-white font-bold text-base">Total Matches Played</p>
                        </div>
                    </div>
                    <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl">
                        <span className="text-lg font-extrabold text-white">{player.matches || 0}</span>
                    </div>
                </div>

                {/* Profile Component Card */}
                <Card className="w-full bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
                    <div className="p-0">
                        <Profile player={player} />
                    </div>
                </Card>

            </div>
        </main>
    );
};

export default PlayersDetailsPage;