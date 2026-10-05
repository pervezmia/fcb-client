import ManagePlayersTable from "@/components/dashboard/admin/ManagePlayersTable";

export const metadata = {
  title: "Manage Players | Admin Dashboard",
  description: "Control player status, roles and access for FC Boraitola.",
};

export default function ManagePlayersPage() {
  return (
    <main className="w-full min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl">
        <ManagePlayersTable />
      </div>
    </main>
  );
}