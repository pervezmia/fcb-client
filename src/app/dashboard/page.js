import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "Dashboard Overview - FCB Management",
};

export default async function DashboardPage() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome back, {session?.user?.name || "User"}</h1>
      <p className="text-slate-400">This is your main dashboard overview panel.</p>
    </div>
  );
}