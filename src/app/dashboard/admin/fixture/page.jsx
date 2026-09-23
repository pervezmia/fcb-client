import CreateFixtureForm from "@/components/dashboard/admin/CreateFixtureForm";

export const metadata = {
  title: "Create Fixture | FC Boraitola Admin",
  description: "Add a new match fixture to the FC Boraitola schedule.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CreateFixturePage() {
  return <CreateFixtureForm />;
}