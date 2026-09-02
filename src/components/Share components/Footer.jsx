"use client";

import React from "react";
import Link from "next/link";
import { Link as HeroUILink } from "@heroui/react";
import { Shield } from "@gravity-ui/icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Fixtures", href: "/fixtures" },
    { name: "Players", href: "/players" },
    { name: "Tables", href: "/tables" },
    { name: "About Club", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // সোশ্যাল আইকনগুলোর সম্পূর্ণ ও সঠিক SVG পাথ
  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      svgPath: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    },
    {
      name: "Twitter",
      href: "#",
      svgPath: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
    },
    {
      name: "Instagram",
      href: "#",
      svgPath: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M17.5 2h-11a4.5 4.5 0 0 0-4.5 4.5v11a4.5 4.5 0 0 0 4.5 4.5h11a4.5 4.5 0 0 0 4.5-4.5v-11a4.5 4.5 0 0 0-4.5-4.5z",
    },
    {
      name: "YouTube",
      href: "#",
      svgPath: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
    },
  ];

  return (
    <footer className="bg-slate-950 text-white border-t border-blue-500/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          
          {/* Column 1: Brand & Info */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center border border-white/20">
                    <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white">
                    FCB <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-500">Boraitola</span>
                </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md mx-auto md:mx-0">
              The official hub for FC Boraitola fans and players. Stay updated with all match fixtures, player stats, and club news.
            </p>
          </div>

          {/* Column 2: Quick Links (Next.js Link directly wrapping HeroUI Link without legacyBehavior) */}
          <div className="space-y-4 text-center">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                Quick Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 justify-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="inline-block">
                    <HeroUILink as="span" className="text-slate-400 hover:text-blue-400 text-sm transition-colors cursor-pointer">
                      {link.name}
                    </HeroUILink>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social & Legal */}
          <div className="space-y-6 text-center md:text-right">
            <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                    Follow Us
                </h3>
                <div className="flex items-center gap-4 justify-center md:justify-end">
                  {socialLinks.map((social) => (
                    <Link key={social.name} href={social.href} className="inline-block">
                      <HeroUILink 
                          as="span"
                          aria-label={social.name}
                          className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-blue-400 transition-all cursor-pointer"
                      >
                        <svg 
                          className="w-4 h-4 fill-current" 
                          viewBox="0 0 24 24"
                        >
                          <path d={social.svgPath} />
                        </svg>
                      </HeroUILink>
                    </Link>
                  ))}
                </div>
            </div>
            <div className="space-y-2">
                <p className="text-xs text-slate-500">
                    © {currentYear} FC Boraitola. All rights reserved.
                </p>
                <div className="flex gap-4 text-xs text-slate-500 justify-center md:justify-end">
                    <Link href="/privacy">
                      <HeroUILink as="span" className="text-xs text-slate-500 hover:text-slate-300 cursor-pointer">Privacy Policy</HeroUILink>
                    </Link>
                    <Link href="/terms">
                      <HeroUILink as="span" className="text-xs text-slate-500 hover:text-slate-300 cursor-pointer">Terms of Service</HeroUILink>
                    </Link>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-slate-800 text-center">
            <p className="text-[10px] text-slate-600 tracking-widest uppercase">
                Powered by FC Boraitola Tech Team | Design Style: Pro Club v3
            </p>
        </div>
      </div>
    </footer>
  );
}