import TigersTeamContent from '@/components/team/TigersTeamContent';
import React from 'react';

// SEO Friendly Metadata for Boraitola Tigers
export const metadata = {
  title: "Boraitola Tigers - Official Team Profile & Roster",
  description: "Discover the fierce spirit, legacy, and roster of Boraitola Tigers. Built with raw energy, determination, and competitive excellence.",
  keywords: ["Boraitola Tigers", "Tigers Team", "Football Squad", "Boraitola Club", "Team Profile"],
  openGraph: {
    title: "Boraitola Tigers - Official Team Profile",
    description: "Explore the official profile, stats, and achievements of Boraitola Tigers.",
    images: ["https://i.ibb.co.com/Rp34KHCD/rsz-g-photo-1.png"],
  },
};

const BoraitolaTigers = () => {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
            {/* Tigers Team Content Child Component */}
            <TigersTeamContent />
        </main>
    );
};

export default BoraitolaTigers;