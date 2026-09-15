import AdminProfileContent from "@/components/admin/AdminProfileContent";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getAdmin } from "@/lib/action/admin/admin";

export const metadata = {
  title: "Admin Profile - FCB Management",
  description: "View and manage your admin profile information.",
  robots: {
    index: false,
    follow: false,
  },
};

function StatusMessage({ children }) {
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <p className="text-muted-foreground">{children}</p>
    </div>
  );
}

export default async function AdminProfilePage() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  // ১. সেশন চেক
  if (!session?.user) {
    return <StatusMessage>Please sign in to view the admin profile.</StatusMessage>;
  }

  // ২. সিকিউরিটি চেক: ইউজার কি আসলেই অ্যাডমিন?
  if (session.user.role !== "admin") {
    return (
      <StatusMessage>
        Access Denied: You do not have admin privileges.
      </StatusMessage>
    );
  }

  // ৩. অ্যাকশন থেকে অ্যাডমিন ডাটা ফেচ করা
  let adminData = null;
  let fetchErrorDetail = null;

  try {
    adminData = await getAdmin();
  } catch (error) {
    fetchErrorDetail = `Fetch failed: ${error.message}`;
  }

  // ৪. ডাটা না পেলে এরর মেসেজ
  if (!adminData) {
    return (
      <StatusMessage>
        No admin profile found or failed to load data.
        {fetchErrorDetail && (
          <span className="block mt-2 text-xs text-red-400">
            Debug: {fetchErrorDetail}
          </span>
        )}
      </StatusMessage>
    );
  }

  // ৫. সাকসেসফুল রেন্ডার
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <AdminProfileContent initialData={adminData} session={session} />
      </div>
    </div>
  );
}