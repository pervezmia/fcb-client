// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   Button,
//   Dropdown,
//   Label,
//   Description,
// } from "@heroui/react";
// import { Bars, Shield, Xmark } from "@gravity-ui/icons";
// import { authClient, useSession } from "@/lib/auth-client";

// const navLinks = [
//   {
//     name: "Players",
//     href: "/players",
//   },
//   {
//     name: "Fixtures",
//     href: "/fixtures",
//   },
//   {
//     name: "Dashboard",
//     href: "/dashboard",
//   },
// ];

// const fcbTeams = [
//   {
//     name: "FC Boraitola",
//     href: "/fcb-teams/fc-boraitola",
//   },
//   {
//     name: "Boraitola Tigers",
//     href: "/fcb-teams/boraitola-tigers",
//   },
//   {
//     name: "Club",
//     href: "/fcb-teams/club",
//   },
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const { data: session, isPending } = useSession();

//   const [isOpen, setIsOpen] = useState(false);

//   // Menu open থাকলে body scroll lock
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   // Route change হলে menu close + scroll top
//   useEffect(() => {
//     setIsOpen(false);
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   // Active route check
//   const isActive = (href) => {
//     return pathname === href || pathname.startsWith(`${href}/`);
//   };

//   // Sign out
//   const handleSignOut = async () => {
//     await authClient.signOut({
//       fetchOptions: {
//         onSuccess: () => {
//           router.push("/login");
//         },
//       },
//     });
//   };

//   return (
//     <nav className="sticky top-0 z-50 w-full overflow-x-hidden border-b border-blue-500/20 bg-slate-900 text-white">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">

//           {/* ================= LOGO ================= */}
//           <Link href="/" className="flex items-center gap-2">
//             <div className="flex items-center gap-3 justify-center md:justify-start">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center border border-white/20">
//                     <Shield className="w-6 h-6 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-black tracking-tight text-white">
//                     FCB <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-500">Boraitola</span>
//                 </h2>
//             </div>
//           </Link>

//           {/* ================= DESKTOP NAV ================= */}
//           <div className="hidden items-center gap-6 md:flex">

//             {/* Reusable Nav Links */}
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`text-sm font-medium transition-colors hover:text-blue-400 ${
//                   isActive(link.href)
//                     ? "text-blue-400"
//                     : "text-slate-300"
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}

//             {/* FCB Teams Dropdown */}
//             <Dropdown>
//               <Button
//                 variant="light"
//                 className="h-auto min-w-0 bg-transparent p-0 text-sm font-medium text-slate-300 hover:text-blue-400"
//               >
//                 FCB Teams

//                 <svg
//                   className="ml-1 inline h-4 w-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </Button>

//               <Dropdown.Popover className="w-[200px] rounded-xl border border-slate-800 bg-slate-900 shadow-xl">
//                 <Dropdown.Menu
//                   onAction={(key) => router.push(key)}
//                 >
//                   {fcbTeams.map((team) => (
//                     <Dropdown.Item
//                       key={team.href}
//                       textValue={team.name}
//                       className="cursor-pointer rounded-lg p-2 hover:bg-slate-800"
//                     >
//                       <Label className="cursor-pointer text-slate-300 hover:text-blue-400">
//                         {team.name}
//                       </Label>
//                     </Dropdown.Item>
//                   ))}
//                 </Dropdown.Menu>
//               </Dropdown.Popover>
//             </Dropdown>
//           </div>

//           {/* ================= DESKTOP AUTH ================= */}
//           <div className="hidden items-center gap-4 md:flex">

//             {isPending ? (
//               <div className="h-8 w-8 animate-pulse rounded-full bg-slate-800" />
//             ) : session ? (
//               <Dropdown>
//                 <Button
//                   isIconOnly
//                   className="h-auto min-w-0 rounded-full bg-transparent p-0"
//                 >
//                   <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-blue-500/50 transition-all hover:border-blue-500">
//                     <Image
//                       src={
//                         session.user?.image ||
//                         "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
//                       }
//                       alt="Profile"
//                       fill
//                       sizes="36px"
//                       className="object-cover"
//                     />
//                   </div>
//                 </Button>

//                 <Dropdown.Popover className="w-52 rounded-xl border border-slate-800 bg-slate-900 p-1 shadow-xl">
//                   <Dropdown.Menu>

//                     {/* User Info */}
//                     <Dropdown.Item
//                       key="user-info"
//                       textValue="User Info"
//                       className="mb-1 border-b border-slate-800 pb-2"
//                     >
//                       <Label className="font-semibold text-white">
//                         {session.user?.name}
//                       </Label>

//                       <Description className="truncate text-xs text-slate-400">
//                         {session.user?.email}
//                       </Description>
//                     </Dropdown.Item>

//                     {/* Profile */}
//                     <Dropdown.Item
//                       key="profile"
//                       textValue="Profile"
//                       className="rounded-lg hover:bg-slate-800"
//                     >
//                       <Link
//                         href="/profile"
//                         className="block w-full py-1 text-slate-300 hover:text-blue-400"
//                       >
//                         Profile
//                       </Link>
//                     </Dropdown.Item>

//                     {/* Logout */}
//                     <Dropdown.Item
//                       key="logout"
//                       textValue="Sign Out"
//                       className="rounded-lg text-red-400 hover:bg-red-950/30"
//                       onClick={handleSignOut}
//                     >
//                       <span className="block w-full py-1">
//                         Sign Out
//                       </span>
//                     </Dropdown.Item>

//                   </Dropdown.Menu>
//                 </Dropdown.Popover>
//               </Dropdown>
//             ) : (
//               <div className="flex items-center gap-3">
//                 <Link href="/login">
//                   <Button
//                     variant="light"
//                     className="text-sm font-medium text-slate-300 hover:text-white"
//                   >
//                     Login
//                   </Button>
//                 </Link>

//                 <Link href="/register">
//                   <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-red-600 text-sm font-medium text-white">
//                     Register
//                   </Button>
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* ================= MOBILE TOGGLE ================= */}
//           <div className="flex items-center md:hidden">
//             <Button
//               isIconOnly
//               variant="flat"
//               onPress={() => setIsOpen(!isOpen)}
//               aria-label="Toggle Menu"
//               className="h-10 min-w-10 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 hover:text-white"
//             >
//               {isOpen ? (
//                 <Xmark className="h-6 w-6" />
//               ) : (
//                 <Bars className="h-6 w-6" />
//               )}
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* ================= MOBILE MENU ================= */}
//       {isOpen && (
//         <div className="fixed inset-0 top-16 z-40 overflow-y-auto bg-slate-900 md:hidden">
//           <div className="flex flex-col gap-2 px-6 pb-10 pt-8">

//             {/* Reusable Nav Links */}
//             <div className="flex flex-col gap-6">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   onClick={() => setIsOpen(false)}
//                   className={`text-2xl font-semibold transition-colors ${
//                     isActive(link.href)
//                       ? "text-blue-400"
//                       : "text-slate-200 hover:text-blue-400"
//                   }`}
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//             </div>

//             {/* FCB Teams */}
//             <div className="mt-2">
//               <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 FCB Teams
//               </p>

//               <div className="flex flex-col gap-4 pl-1">
//                 {fcbTeams.map((team) => (
//                   <Link
//                     key={team.href}
//                     href={team.href}
//                     onClick={() => setIsOpen(false)}
//                     className={`text-lg transition-colors ${
//                       isActive(team.href)
//                         ? "text-blue-400"
//                         : "text-slate-300 hover:text-blue-400"
//                     }`}
//                   >
//                     {team.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Divider */}
//             <div className="my-8 border-t border-slate-800" />

//             {/* ================= MOBILE AUTH ================= */}
//             <div className="flex flex-col gap-3">

//               {session ? (
//                 <>
//                   {/* User Info */}
//                   <div className="mb-2 flex items-center gap-3">
//                     <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-blue-500/50">
//                       <Image
//                         src={
//                           session.user?.image ||
//                           "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
//                         }
//                         alt="Profile"
//                         fill
//                         sizes="40px"
//                         className="object-cover"
//                       />
//                     </div>

//                     <div className="min-w-0">
//                       <p className="truncate font-semibold text-white">
//                         {session.user?.name}
//                       </p>

//                       <p className="truncate text-xs text-slate-400">
//                         {session.user?.email}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Profile */}
//                   <Link
//                     href="/profile"
//                     onClick={() => setIsOpen(false)}
//                     className="w-full rounded-xl bg-slate-800 py-3 text-center text-base font-medium text-white"
//                   >
//                     Profile
//                   </Link>

//                   {/* Sign Out */}
//                   <button
//                     onClick={() => {
//                       setIsOpen(false);
//                       handleSignOut();
//                     }}
//                     className="w-full rounded-xl bg-red-950/30 py-3 text-center text-base font-medium text-red-400"
//                   >
//                     Sign Out
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   {/* Login */}
//                   <Link
//                     href="/login"
//                     onClick={() => setIsOpen(false)}
//                     className="w-full rounded-xl bg-slate-800 py-3 text-center text-base font-medium text-white"
//                   >
//                     Login
//                   </Link>

//                   {/* Register */}
//                   <Link
//                     href="/register"
//                     onClick={() => setIsOpen(false)}
//                     className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-red-600 py-3.5 text-center text-base font-semibold text-white shadow-lg"
//                   >
//                     Sign Up
//                   </Link>
//                 </>
//               )}

//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button, Dropdown, Label, Description } from "@heroui/react";
import { Bars, Shield, Xmark } from "@gravity-ui/icons";
import { authClient, useSession } from "@/lib/auth-client";

const navLinks = [
  {
    name: "Players",
    href: "/players",
  },
  {
    name: "Fixtures",
    href: "/fixtures",
  },
  {
    name: "Dashboard",
    href: "/dashboard/player",
  },
];

const fcbTeams = [
  {
    name: "FC Boraitola",
    href: "/fcb-teams/fc-boraitola",
  },
  {
    name: "Boraitola Tigers",
    href: "/fcb-teams/boraitola-tigers",
  },
  
];

export default function Navbar() {
  const pathname = usePathname();
  
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  // console.log(pathname);
  

  // Menu open থাকলে body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Route change হলে menu close + scroll top
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  if(pathname.includes("dashboard")){
    return null;
  }
  // Active route check
  const isActive = (href) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Sign out
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full overflow-x-hidden border-b border-blue-500/20 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* ================= LOGO ================= */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center border border-white/20">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                FCB{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-500">
                  Boraitola
                </span>
              </h2>
            </div>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden items-center gap-6 md:flex">
            {/* Reusable Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  isActive(link.href) ? "text-blue-400" : "text-slate-300"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* FCB Teams Dropdown */}
            {/* FCB Teams Dropdown */}
            <Dropdown>
              <Button
                variant="light"
                className="h-auto min-w-0 bg-transparent p-0 text-sm font-medium text-slate-300 hover:text-blue-400"
              >
                FCB Teams
                <svg
                  className="ml-1 inline h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>

              <Dropdown.Popover className="w-[200px] rounded-xl border border-slate-800 bg-slate-900 shadow-xl">
                <Dropdown.Menu>
                  {fcbTeams.map((team) => (
                    <Dropdown.Item
                      key={team.href}
                      textValue={team.name}
                      className="cursor-pointer rounded-lg p-0 hover:bg-slate-800"
                    >
                      <Link
                        href={team.href}
                        className="block w-full px-3 py-2 text-slate-300 hover:text-blue-400"
                      >
                        {team.name}
                      </Link>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>

          {/* ================= DESKTOP AUTH ================= */}
          <div className="hidden items-center gap-4 md:flex">
            {isPending ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-slate-800" />
            ) : session ? (
              <Dropdown>
                <Button
                  isIconOnly
                  className="h-auto min-w-0 rounded-full bg-transparent p-0"
                >
                  <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-blue-500/50 transition-all hover:border-blue-500">
                    <Image
                      src={
                        session.user?.image ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                      }
                      alt="Profile"
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                </Button>

                <Dropdown.Popover className="w-52 rounded-xl border border-slate-800 bg-slate-900 p-1 shadow-xl">
                  <Dropdown.Menu>
                    {/* User Info */}
                    <Dropdown.Item
                      key="user-info"
                      textValue="User Info"
                      className="mb-1 flex flex-col  border-b border-slate-800 pb-2"
                    >
                      <Label className="font-semibold text-white">
                        {session.user?.name}
                      </Label>

                      <Description className="truncate text-xs text-slate-400">
                        {session.user?.email}
                      </Description>
                    </Dropdown.Item>

                    {/* Profile */}
                    <Dropdown.Item
                      key="profile"
                      textValue="Profile"
                      className="rounded-lg hover:bg-slate-800"
                    >
                      <Link
                        href="/dashboard/player"
                        className="block w-full py-1 text-slate-300 hover:text-blue-400"
                      >
                        Profile
                      </Link>
                    </Dropdown.Item>

                    {/* Logout */}
                    <Dropdown.Item
                      key="logout"
                      textValue="Sign Out"
                      className="rounded-lg text-red-400 hover:bg-red-950/30"
                      onClick={handleSignOut}
                    >
                      <span className="block w-full py-1">Sign Out</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button
                    variant="light"
                    className="text-sm font-medium text-slate-300 hover:text-white"
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/register">
                  <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-red-600 text-sm font-medium text-white">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <div className="flex items-center md:hidden">
            <Button
              isIconOnly
              variant="flat"
              onPress={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className="h-10 min-w-10 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 hover:text-white"
            >
              {isOpen ? (
                <Xmark className="h-6 w-6" />
              ) : (
                <Bars className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 overflow-y-auto bg-slate-900 md:hidden">
          <div className="flex flex-col gap-2 px-6 pb-10 pt-8">
            {/* Reusable Nav Links */}
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-semibold transition-colors ${
                    isActive(link.href)
                      ? "text-blue-400"
                      : "text-slate-200 hover:text-blue-400"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* FCB Teams */}
            <div className="mt-2">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                FCB Teams
              </p>

              <div className="flex flex-col gap-4 pl-1">
                {fcbTeams.map((team) => (
                  <Link
                    key={team.href}
                    href={team.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg transition-colors ${
                      isActive(team.href)
                        ? "text-blue-400"
                        : "text-slate-300 hover:text-blue-400"
                    }`}
                  >
                    {team.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-slate-800" />

            {/* ================= MOBILE AUTH ================= */}
            <div className="flex flex-col gap-3">
              {session ? (
                <>
                  {/* User Info */}
                  <div className="mb-2 flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-blue-500/50">
                      <Image
                        src={
                          session.user?.image ||
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                        }
                        alt="Profile"
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white">
                        {session.user?.name}
                      </p>

                      <p className="truncate text-xs text-slate-400">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>

                  {/* Profile */}
                  <Link
                    href="/dashboard/player"
                    onClick={() => setIsOpen(false)}
                    className="w-full rounded-xl bg-slate-800 py-3 text-center text-base font-medium text-white"
                  >
                    Profile
                  </Link>

                  {/* Sign Out */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleSignOut();
                    }}
                    className="w-full rounded-xl bg-red-950/30 py-3 text-center text-base font-medium text-red-400"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  {/* Login */}
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full rounded-xl bg-slate-800 py-3 text-center text-base font-medium text-white"
                  >
                    Login
                  </Link>

                  {/* Register */}
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-red-600 py-3.5 text-center text-base font-semibold text-white shadow-lg"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
