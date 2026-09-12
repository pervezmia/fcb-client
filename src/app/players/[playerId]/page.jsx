import { getSinglePlayer } from '@/lib/api/player';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from "@heroui/react";
import Profile from '@/components/players/Profile';





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
            <Card className="max-w-4xl w-full bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-blue-500/20">
                <div className="p-0">
                    <Profile player={player}></Profile>
                </div>
            </Card>
        </main>
    );
};

export default PlayersDetailsPage;