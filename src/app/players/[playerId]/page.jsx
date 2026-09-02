import { getSinglePlayer } from '@/lib/api/player';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from "@heroui/react";

const PlayersDetailsPage = async ({ params }) => {
    const resolvedParams = await params;
    const { playerId } = resolvedParams; 
    const player = await getSinglePlayer(playerId);

    if (!player || player.error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-2xl text-slate-700 font-bold">Player not found!</p>
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

    return (
        <main className="min-h-screen bg-slate-50 p-6 md:p-12 flex items-center justify-center">
            <Card className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                <div className="p-0">
                    <div className="flex flex-col md:flex-row">
                        
                        {/* Player Image / Initials Section */}
                        <div className="md:w-1/2 relative bg-slate-200 h-[400px] md:h-auto min-h-[400px] flex items-center justify-center">
                            {player.image ? (
                                <Image 
                                    src={player.image} 
                                    alt={player.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                    <span className="text-6xl md:text-8xl font-black text-white tracking-widest">
                                        {getInitials(player.name)}
                                    </span>
                                </div>
                            )}

                            {/* Jersey Number Overlay */}
                            <div className="absolute top-4 left-4 bg-blue-600 text-white font-black text-3xl w-16 h-16 flex items-center justify-center rounded-full shadow-lg border-4 border-white z-10">
                                {player.number}
                            </div>
                        </div>

                        {/* Player Details Section */}
                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <span className="uppercase tracking-widest text-sm font-bold text-blue-600 mb-2">
                                {player.title}
                            </span>
                            
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                                {player.name}
                            </h1>
                            
                            <div className="border-t border-slate-100 pt-6 mt-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Position</p>
                                        <p className="font-bold text-lg text-slate-900">{player.title}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Squad Number</p>
                                        <p className="font-bold text-lg text-slate-900">{player.number}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Back Button */}
                            <Link 
                                href="/players" 
                                className="mt-10 inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors w-fit"
                            >
                                <span className="mr-2">←</span> Back to Squad
                            </Link>
                        </div>

                    </div>
                </div>
            </Card>
        </main>
    );
};

export default PlayersDetailsPage;