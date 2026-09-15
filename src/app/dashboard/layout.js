import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export const metadata = {
  title: "Dashboard - FCB Management",
  description: "Manage your club, players, and admin settings efficiently.",
};

export default async function DashboardLayout({ children }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin");
  }

  // ইউজার সেশন থেকে রোল বের করা (ডিফল্টভাবে "player" ধরতে পারো)
  const userRole = session?.user?.role || "player";

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* বড় স্ক্রিনের জন্য সাইডবার */}
      <DashboardSidebar userRole={userRole} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* ন্যাভবার (যেখানে মোবাইল মেনু বা হ্যামবার্গার টগল হ্যান্ডেল হবে) */}
        <DashboardNavbar session={session} />

        <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-4 lg:p-6 bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
}