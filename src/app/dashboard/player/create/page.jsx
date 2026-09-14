import CreatePlayerForm from '@/components/players/CreatePlayerForm';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { backendURL } from "@/lib/core/core";
import { getTokenServer } from "@/lib/action/player/gettokenserver";

const CreatePlayer = async () => {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session?.user) {
    redirect("/login");
  }

  const token = await getTokenServer();

  if (token) {
    const res = await fetch(`${backendURL}/players/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    // profile আগে থেকেই থাকলে create page skip করে
    // সরাসরি edit page এ পাঠিয়ে দেওয়া হচ্ছে
    if (res.ok) {
      redirect("/dashboard/player/profile-edit");
    }
  }

  return (
    <div>
      <CreatePlayerForm></CreatePlayerForm>
    </div>
  );
};

export default CreatePlayer;