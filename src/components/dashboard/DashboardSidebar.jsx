import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { navLinksAdmin, navLinksPlayer } from "./dashboardLinks";

export default async function DashboardSidebar({ userRole }) {

  console.log("Current User Role:", userRole);

  // রোল অনুযায়ী ডাইনামিক্যালি লিংক সিলেক্ট হবে
  const currentLinks = userRole === "admin" ? navLinksAdmin : navLinksPlayer;
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-md hidden md:block p-6">
      <div className="text-xl font-bold text-blue-500 mb-8 tracking-wider">
        FCB <span className="text-white text-sm font-normal">Dashboard</span>
      </div>

      <nav className="flex flex-col gap-2">
      {currentLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="px-4 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white font-medium text-sm transition"
        >
          {link.name}
        </Link>
      ))}
    </nav>
    </aside>
  );
}