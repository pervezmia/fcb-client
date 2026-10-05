import { backendURL } from "../core/core";

// Backend e kono image na thakle ei default gulo dekhabe
export const DEFAULT_HERO_IMAGES = [
  { src: "https://i.ibb.co.com/jv4WtJkD/rsz-fp-2.png", alt: "FC Boraitola Team Photo 1" },
  { src: "https://i.ibb.co.com/Rp34KHCD/rsz-g-photo-1.png", alt: "FC Boraitola Team Photo 2" },
  { src: "https://i.ibb.co.com/0yd7p6xQ/rsz-grp.png", alt: "FC Boraitola Team Photo 3" },
  { src: "https://i.ibb.co.com/fzL6gbWZ/rsz-1received-1506183590387606-1.png", alt: "FC Boraitola Team Photo 4" },
  { src: "https://i.ibb.co.com/hxY7C9K4/rsz-1received-731628236450162.png", alt: "FC Boraitola Team Photo 5" },
];

// fallback: false dile (admin page) default dekhabe na, ja DB te ache shudhu tai
export const getHeroImages = async (limit = 5, { fallback = true } = {}) => {
  try {
    const res = await fetch(`${backendURL}/hero-images?limit=${limit}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch hero images");
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data;
  } catch (error) {
    console.error("getHeroImages error:", error);
  }
  return fallback ? DEFAULT_HERO_IMAGES : [];
};