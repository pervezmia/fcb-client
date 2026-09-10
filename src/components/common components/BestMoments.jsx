// "use client";

// import React from "react";
// import Image from "next/image";
// import { containerVariants, itemVariants } from "@/lib/motion/motion";
// import { motion } from "framer-motion";

// export default function MatchMomentsSection() {
//   const moments = [
//     {
//       id: 1,
//       title: "Epic Victory Celebration 🏆",
//       image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80",
//       isNew: true,
//     },
//     {
//       id: 2,
//       title: "Stunning Free Kick Goal ⚽",
//       image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&auto=format&fit=crop&q=80",
//       isNew: true,
//     },
//     {
//       id: 3,
//       title: "Brilliant Dribble & Assist ⚡",
//       image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80",
//       isNew: true,
//     },
//     {
//       id: 4,
//       title: "Crucial Defensive Block 🛡️",
//       image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&auto=format&fit=crop&q=80",
//       isNew: true,
//     },
//     {
//       id: 5,
//       title: "Man of the Match Cheers 🥇",
//       image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
//       isNew: true,
//     },
//   ];

//   return (
//     <section className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-white">
//       <div className="max-w-7xl mx-auto space-y-6">
        
//         {/* Section Heading matching FCB Theme */}
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
//             Best Moments of the Match
//           </h2>
//           <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
//             Captured on lens 📸
//           </span>
//         </div>

//         {/* Grid Container */}
//         <motion.div 
//         variants={containerVariants}
//         initial={"hidden"}
//         whileHover={"show"}
//         viewport={{ once: true, margin: "-50px" }}
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           {moments.map((moment) => (
//             <motion.div 
//               key={moment.id} 
//               variants={itemVariants}
//               whileHover={{y: -4}}
//               className="relative group overflow-hidden rounded-2xl bg-slate-800 border border-slate-700/60 aspect-[3/4] shadow-xl transition-transform duration-300 hover:scale-[1.02]"
//             >
//               {/* Background Image */}
//               <Image
//                 src={moment.image}
//                 alt={moment.title}
//                 fill
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
//                 className="object-cover transition-transform duration-500 group-hover:scale-110"
//               />

//               {/* Dark Gradient Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>

//               {/* Fixed NEW Badge */}
//               {moment.isNew && (
//                 <div className="absolute top-3 right-3 z-10">
//                   <span className="bg-white text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow-md tracking-wider">
//                     NEW
//                   </span>
//                 </div>
//               )}

//               {/* Title / Caption at the bottom */}
//               <div className="absolute bottom-0 inset-x-0 p-4 z-10">
//                 <p className="text-sm font-semibold text-slate-100 drop-shadow-md truncate">
//                   {moment.title}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//       </div>
//     </section>
//   );
// }

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/motion/motion";

export default function MatchMomentsSection() {
  const moments = [
    {
      id: 1,
      title: "Epic Victory Celebration 🏆",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80",
      isNew: true,
    },
    {
      id: 2,
      title: "Stunning Free Kick Goal ⚽",
      image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&auto=format&fit=crop&q=80",
      isNew: true,
    },
    {
      id: 3,
      title: "Brilliant Dribble & Assist ⚡",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80",
      isNew: true,
    },
    {
      id: 4,
      title: "Crucial Defensive Block 🛡️",
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&auto=format&fit=crop&q=80",
      isNew: true,
    },
    {
      id: 5,
      title: "Man of the Match Cheers 🥇",
      image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
      isNew: true,
    },
  ];

  return (
    <section className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Section Heading matching FCB Theme */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Best Moments of the Match
          </h2>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
            Captured on lens 📸
          </span>
        </div>

        {/* Grid Container with Framer Motion Stagger Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {moments.map((moment) => (
            <motion.div 
              key={moment.id} 
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="relative group overflow-hidden rounded-2xl bg-slate-800 border border-slate-700/60 aspect-[3/4] shadow-xl transition-shadow duration-300 hover:shadow-2xl"
            >
              {/* Background Image */}
              <Image
                src={moment.image}
                alt={moment.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>

              {/* Fixed NEW Badge */}
              {moment.isNew && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-white text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow-md tracking-wider">
                    NEW
                  </span>
                </div>
              )}

              {/* Title / Caption at the bottom */}
              <div className="absolute bottom-0 inset-x-0 p-4 z-10">
                <p className="text-sm font-semibold text-slate-100 drop-shadow-md truncate">
                  {moment.title}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}