import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardSidebar() {

    const session = await auth.api.getSession(
        {
            headers: await headers()
        }
    );
    if(!session){
        redirect("login")
    }
    console.log(session?.user);
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-md hidden md:block p-6">
      <div className="text-xl font-bold text-blue-500 mb-8 tracking-wider">
        FCB <span className="text-white text-sm font-normal">Dashboard</span>
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          href="/dashboard/player"
          className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm transition"
        >
          Overview
        </Link>
        <Link
          href="/dashboard/player/create"
          className="px-4 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white font-medium text-sm transition"
        >
          Create Player
        </Link>
      </nav>
    </aside>
  );
}