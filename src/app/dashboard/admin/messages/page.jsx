import ManageMessages from "@/components/dashboard/admin/ManageMessages";

export const metadata = {
  title: "Messages | Admin Dashboard",
  description: "Read and manage messages sent from the FC Boraitola contact page.",
};

export default function MessagesPage() {
  return (
    <main className="w-full min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl">
        <ManageMessages />
      </div>
    </main>
  );
}