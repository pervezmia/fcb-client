"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Keyboard } from "swiper/modules";
import Image from "next/image";
import { Button } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const FALLBACK_IMAGES = [
  { src: "https://i.ibb.co.com/jv4WtJkD/rsz-fp-2.png", alt: "FC Boraitola Team Photo 1" },
  { src: "https://i.ibb.co.com/Rp34KHCD/rsz-g-photo-1.png", alt: "FC Boraitola Team Photo 2" },
  { src: "https://i.ibb.co.com/0yd7p6xQ/rsz-grp.png", alt: "FC Boraitola Team Photo 3" },
  { src: "https://i.ibb.co.com/fzL6gbWZ/rsz-1received-1506183590387606-1.png", alt: "FC Boraitola Team Photo 4" },
  { src: "https://i.ibb.co.com/hxY7C9K4/rsz-1received-731628236450162.png", alt: "FC Boraitola Team Photo 5" },
];

export default function HeroImageSlider({ images = FALLBACK_IMAGES }) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  const hasMany = images.length > 1;

  return (
    <div
      className="group relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-950 shadow-2xl shadow-blue-950/30
        [&_.swiper-pagination]:bottom-3!
        [&_.swiper-pagination-bullet]:bg-white/70
        [&_.swiper-pagination-bullet]:opacity-100
        [&_.swiper-pagination-bullet-active]:bg-blue-500!
        [&_.swiper-pagination-bullet-active]:w-6
        [&_.swiper-pagination-bullet-active]:rounded-full
        [&_.swiper-pagination-bullet]:transition-all"
    >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={hasMany}
        keyboard={{ enabled: true }}
        autoplay={
          hasMany ? { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true } : false
        }
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={img._id || img.src} className="relative w-full h-full bg-slate-950">
            {/* Blur backdrop: faka jayga image er rong diye bhore */}
            <Image
              src={img.src}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover blur-2xl scale-125 opacity-70"
              unoptimized
            />

            {/* Main image: kokhono crop hobe na */}
            <Image
              src={img.src}
              alt={img.alt || "FC Boraitola Squad Moment"}
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-contain drop-shadow-2xl"
              priority={index === 0}
              unoptimized
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20 pointer-events-none" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Top-left badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="text-[11px] bg-blue-600/30 text-blue-100 border border-blue-400/30 px-3 py-1.5 rounded-full font-semibold backdrop-blur-md">
          ⚡ FC Boraitola Squad Moments
        </span>
      </div>

      {hasMany && (
        <>
          {/* Top-right counter */}
          <div className="absolute top-3 right-3 z-10">
            <span className="text-[11px] bg-slate-900/60 text-slate-100 border border-slate-600/50 px-3 py-1.5 rounded-full font-semibold backdrop-blur-md tabular-nums">
              {activeIndex + 1} / {images.length}
            </span>
          </div>

          {/* Prev / Next */}
          <Button
            isIconOnly
            size="sm"
            aria-label="Previous slide"
            onPress={() => swiperRef.current?.slidePrev()}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-slate-900/60 text-white border border-slate-600/50 backdrop-blur-md hover:bg-slate-800/80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="size-5" />
          </Button>

          <Button
            isIconOnly
            size="sm"
            aria-label="Next slide"
            onPress={() => swiperRef.current?.slideNext()}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-slate-900/60 text-white border border-slate-600/50 backdrop-blur-md hover:bg-slate-800/80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="size-5" />
          </Button>
        </>
      )}
    </div>
  );
}