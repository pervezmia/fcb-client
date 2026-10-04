"use client";

import { authClient } from "@/lib/auth-client";
import MyPositionCard from "./MyPositionCard";
import Podium from "./Podium";
import LeaderboardTable from "./LeaderboardTable";

export default function LeaderboardClient({ ranked }) {
  const { data: session, isPending } = authClient.useSession();

  const hasGoals = ranked.some((p) => Number(p.goals) > 0);
  const hasAssists = ranked.some((p) => Number(p.assists) > 0);

  const me = session?.user
    ? ranked.find(
        (p) =>
          (p.userId && p.userId === session.user.id) ||
          (p.email && p.email === session.user.email),
      )
    : null;

  return (
    <div className="space-y-10">
      <MyPositionCard
        me={me}
        ranked={ranked}
        hasGoals={hasGoals}
        isLoggedIn={!!session?.user}
        isPending={isPending}
      />
      <Podium players={ranked.filter((p) => p.rank <= 3).slice(0, 3)} hasGoals={hasGoals} />
      <LeaderboardTable
        ranked={ranked}
        meId={me?._id}
        hasGoals={hasGoals}
        hasAssists={hasAssists}
      />
    </div>
  );
}