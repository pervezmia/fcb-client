import { backendURL } from "../core/core";

// Slider e maximum koyta image dekhabe
export const MAX_SLIDER_IMAGES = 10;

// Ager 5 ta photo. Admin page theke ek click e library te import kora jay
export const DEFAULT_HERO_IMAGES = [
  { src: "https://i.ibb.co.com/jv4WtJkD/rsz-fp-2.png", alt: "FC Boraitola Team Photo 1" },
  { src: "https://i.ibb.co.com/Rp34KHCD/rsz-g-photo-1.png", alt: "FC Boraitola Team Photo 2" },
  { src: "https://i.ibb.co.com/0yd7p6xQ/rsz-grp.png", alt: "FC Boraitola Team Photo 3" },
  { src: "https://i.ibb.co.com/fzL6gbWZ/rsz-1received-1506183590387606-1.png", alt: "FC Boraitola Team Photo 4" },
  { src: "https://i.ibb.co.com/hxY7C9K4/rsz-1received-731628236450162.png", alt: "FC Boraitola Team Photo 5" },
];

async function fetchHeroImages(query) {
  try {
    const res = await fetch(`${backendURL}/hero-images?${query}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("getHeroImages error:", error);
    return [];
  }
}

// Homepage slider: shudhu active (dekhano) image
export const getHeroImages = (limit = MAX_SLIDER_IMAGES) =>
  fetchHeroImages(`limit=${limit}`);

// Admin page: library er shob image (hidden shoho)
export const getAllHeroImages = (limit = 100) =>
  fetchHeroImages(`all=true&limit=${limit}`);