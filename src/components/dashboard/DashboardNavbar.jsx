"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Home } from "lucide-react";
import Image from "next/image";

export default function DashboardNavbar({ session }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Header / Navbar */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          {/* মোবাইল ডিভাইসের জন্য হ্যামবার্গার বাটন */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800 focus:outline-none transition"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="text-sm font-medium text-slate-300 hidden sm:block">
            Welcome back, <span className="text-white font-semibold">{session?.user?.name || "User"}</span>
          </div>
        </div>

        {/* Right Section: Home Button & User Profile */}
        <div className="flex items-center gap-3">
          {/* হোম পেজে যাওয়ার বাটন */}
          <Link
            href="/"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-700 hover:border-blue-500/50 bg-slate-800/40 hover:bg-blue-600/10 text-slate-300 hover:text-white text-xs font-medium transition duration-200"
          >
            <Home size={15} className="text-blue-400" />
            <span>Home</span>
          </Link>

          {/* User Avatar / Profile Image Fix */}
          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session?.user?.name || "User Profile"}
                fill
                sizes="36px"
                className="object-cover"
              />
            ) : (
              <span>{session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}</span>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col shadow-2xl z-10 justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="text-xl font-bold text-blue-500 tracking-wider">
                  FCB <span className="text-white text-sm font-normal">Dashboard</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Link
                  href="/dashboard/player"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm transition"
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard/player/create"
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white font-medium text-sm transition"
                >
                  Create Player
                </Link>
                {/* <Link
                  href="/dashboard/player/profile-edit"
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white font-medium text-sm transition"
                >
                  Edit player
                </Link> */}
              </nav>
            </div>

            {/* মোবাইল ড্রয়ারের নিচেও একটি হোম বাটন যুক্ত করে দেওয়া হলো */}
            <div className="pt-4 border-t border-slate-800">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-200 text-sm font-medium transition"
              >
                <Home size={16} className="text-blue-400" />
                <span>Go Back Home</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}