import React from "react";
import PlayersPageClient from "@/components/players/PlayersPage";
import PlayersPage from "@/components/players/PlayersPage";

export const metadata = {
  title: "Squad & Players Directory | FCB Hub - FC Boraitola",
  description: "Explore the official squad rosters, goalkeepers, defenders, midfielders, and forwards of FC Boraitola across all teams and categories.",
  keywords: "FC Boraitola players, squad, men's team, u21, u18, women team, football players",
  openGraph: {
    title: "Squad & Players Directory | FCB Hub - FC Boraitola",
    description: "Explore the official squad rosters, goalkeepers, defenders, midfielders, and forwards of FC Boraitola across all teams and categories.",
    url: "https://yourdomain.com/players",
    siteName: "FCB Hub",
    type: "website",
  },
};

export default function PlayersParentPage() {
  return (
    <main className="min-h-screen bg-white">
      <PlayersPage></PlayersPage>
    </main>
  );
}