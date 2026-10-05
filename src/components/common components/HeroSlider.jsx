import HeroImageSlider from "./HeroImageSlider";
import { getHeroImages } from "@/lib/api/heroImageApi";

export default async function HeroSlider() {
  const images = await getHeroImages(5);

  // DB te kichu na thakle slider nijer default 5 ta image dekhabe
  return <HeroImageSlider images={images.length > 0 ? images : undefined} />;
}