import React from "react";
import FixturesPage from "@/components/fixtures/FixturesPage";
import {getAllFixturesData } from "@/lib/api/fixturesData";

export const metadata = {
  title: "Fixtures & Results | FCB Hub - FC Boraitola",
  description: "Explore monthly match fixtures, upcoming schedules, match centre details, and results for FC Boraitola teams.",
  keywords: "FC Boraitola fixtures, match schedule, football matches, FCB Hub results",
  openGraph: {
    title: "Fixtures & Results | FCB Hub - FC Boraitola",
    description: "Explore monthly match fixtures, upcoming schedules, match centre details, and results for FC Boraitola teams.",
    url: "https://yourdomain.com/fixtures",
    siteName: "FCB Hub",
    type: "website",
  },
};

export default async function FixtureParentPage() {
  const fixturesData = await getAllFixturesData();
  return (
    <main className="min-h-screen bg-slate-900">
      <FixturesPage fixturesData={fixturesData}/>
    </main>
  );
}