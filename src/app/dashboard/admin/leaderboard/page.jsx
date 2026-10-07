import Leaderboard from "@/components/Leaderboard";

export const metadata = {
  title: "Leaderboard | FC Boraitola",
  description: "See where every FC Boraitola player stands: ranks, matches played and status.",
};

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Leaderboard />
    </main>
  );
}