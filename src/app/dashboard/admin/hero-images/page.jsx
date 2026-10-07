import ManageHeroImages from "@/components/dashboard/admin/ManageHeroImages";
import { getAllHeroImages } from "@/lib/api/heroImageApi";

export const metadata = {
  title: "Manage Hero Slider | Admin Dashboard",
  description: "Add photos to the library and choose which ones appear in the FC Boraitola homepage slider.",
};

export default async function ManageHeroImagesPage() {
  const images = await getAllHeroImages();

  return (
    <main className="w-full min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl">
        <ManageHeroImages initialImages={images} />
      </div>
    </main>
  );
}