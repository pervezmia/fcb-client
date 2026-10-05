import ManageHeroImages from "@/components/dashboard/admin/ManageHeroImages";
import { getHeroImages } from "@/lib/api/heroImageApi";

export const metadata = {
  title: "Manage Hero Slider | Admin Dashboard",
  description: "Add or remove the photos shown in the FC Boraitola homepage slider.",
};

export default async function ManageHeroImagesPage() {
  const images = await getHeroImages(50);

  return (
    <main className="w-full min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl">
        <ManageHeroImages initialImages={images} />
      </div>
    </main>
  );
}