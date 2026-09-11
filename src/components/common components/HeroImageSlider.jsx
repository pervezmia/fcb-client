'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const images = [
  { src: 'https://i.ibb.co.com/jv4WtJkD/rsz-fp-2.png', alt: 'FC Boraitola Team Photo 1' },
  { src: 'https://i.ibb.co.com/Rp34KHCD/rsz-g-photo-1.png', alt: 'FC Boraitola Team Photo 2' },
  { src: 'https://i.ibb.co.com/0yd7p6xQ/rsz-grp.png', alt: 'FC Boraitola Team Photo 3' },
  { src: 'https://i.ibb.co.com/fzL6gbWZ/rsz-1received-1506183590387606-1.png', alt: 'FC Boraitola Team Photo 4' },
  { src: 'https://i.ibb.co.com/hxY7C9K4/rsz-1received-731628236450162.png', alt: 'FC Boraitola Team Photo 5' },
];

export default function HeroImageSlider() {
  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-950 backdrop-blur-xl">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect={'fade'}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="w-full h-[380px] sm:h-[480px] lg:h-[550px]"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="relative  w-full h-full flex items-center justify-center bg-slate-950">
            {/* ব্যাকগ্রাউন্ডে একটা ব্লার ইফেক্ট দেওয়া যাতে চারপাশে খালি জায়গায় জঘন্য না লাগে */}
            <div className="absolute inset-0 opacity-30 filter blur-xl scale-110 pointer-events-none">
              <Image
                src={img.src}
                alt=""
                fill
                className="object-cover"
              />
            </div>

            {/* মূল ইমেজ যা কোনোভাবেই ক্রপ হবে না (object-contain) */}
            <div className="relative w-full h-full p-2 sm:p-4 flex items-center justify-center">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover sm:object-contain drop-shadow-2xl"
                priority={index === 0}
                unoptimized={true} // external link এর ক্ষেত্রে কোয়ালিটি লস ঠেকাতে unoptimized দিতে পারো
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-6 left-4 right-4 text-center z-10">
              <span className="text-xs sm:text-sm bg-blue-600/30 text-blue-200 border border-blue-400/30 px-4 py-1.5 rounded-full font-semibold backdrop-blur-md shadow-lg">
                ⚡ FC Boraitola Squad Moments
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}