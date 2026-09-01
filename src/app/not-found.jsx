"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { LayoutSideContent } from "@gravity-ui/icons";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-900 text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20"></div>

      <div className="max-w-md w-full text-center space-y-6 relative z-10">
        {/* Icon / Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 shadow-xl mb-2 text-blue-500">
          <LayoutSideContent className="w-10 h-10" />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-6xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
            404
          </h1>
          <h2 className="text-2xl font-bold text-slate-100">
            Page Not Found
          </h2>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            We couldn't find the page you were looking for. It might have been moved, deleted, or never existed in FCB Hub.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-xl text-sm font-semibold px-6 py-3 shadow-lg shadow-blue-600/20 hover:opacity-90 transition-opacity">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}