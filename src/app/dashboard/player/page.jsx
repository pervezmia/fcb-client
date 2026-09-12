import PlayerProfileForm from "@/components/dashboard/player/PlayerProfileForm";

export const metadata = {
  title: "Player Profile - FCB Management",
  description: "Manage your player profile information, name, and photo.",
};

export default async function PlayerProfilePage() {
  
    console.log();
  const initialPlayerData = {
    name: "Rakibul Hasan",
    photo: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400",
    jerseyNumber: 10,
    age: 24,
    nationality: "Bangladeshi",
    team: "fc-boraitola",
    position: "Midfielder",
    status: "Active",
    bio: "Creative midfielder known for pinpoint through balls and set-piece delivery. Club captain since 2024.",
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <PlayerProfileForm initialData={initialPlayerData} />
    </div>
  );
}