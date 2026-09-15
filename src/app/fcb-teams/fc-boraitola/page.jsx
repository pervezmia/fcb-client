import PlayersPage from '@/components/players/PlayersPage';
import TeamProfileContent from '@/components/team/TeamProfileContent';
import React from 'react';

// SEO Friendly Metadata
export const metadata = {
  title: "FC Boraitola - First & Senior Team Profile | Official Club",
  description: "Explore the official profile of FC Boraitola, the premier and most senior football team. Discover our legacy, squad, stats, and achievements.",
  keywords: ["FC Boraitola", "Senior Team", "Football Club", "Boraitola Football", "Team Profile"],
  openGraph: {
    title: "FC Boraitola - First & Senior Team Profile",
    description: "The pride of Boraitola. Check out the official roster, history, and achievements of our senior team.",
    images: ["https://i.ibb.co.com/jv4WtJkD/rsz-fp-2.png"],
  },
};

const FcBoraitola = () => {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
            {/* Team Profile Child Component */}
            <TeamProfileContent />
            
            {/* Optional Players List component if needed
            <div className="max-w-7xl mx-auto px-4 py-8">
                <PlayersPage />
            </div> */}
        </main>
    );
};

export default FcBoraitola;