"use client";

import { useState } from "react";
import { Menu, Search, Bell, User } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden sticky top-0 z-30 bg-dark/95 backdrop-blur-md border-b border-dark-lighter">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-dark-lighter text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {/* <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div> */}
            <span className="text-lg font-bold text-white">
              Online<span className="text-primary-light">Game</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-dark-lighter text-gray-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-dark-lighter text-gray-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button> */}
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
