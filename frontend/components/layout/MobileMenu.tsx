"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Home,
  Gamepad2,
  Flame,
  Sparkles,
  Star,
  LayoutGrid,
  Heart,
  Clock,
  Crown,
  Mars,
  Venus,
  type LucideIcon,
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Gamepad2,
  Flame,
  Sparkles,
  Star,
  LayoutGrid,
  Heart,
  Clock,
  Crown,
  Mars,
  Venus,
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Menu */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-70 bg-dark z-50 transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-lighter">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Online<span className="text-primary-light">Game</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-dark-lighter text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex flex-col gap-1 overflow-y-auto h-[calc(100%-140px)]">
          {NAV_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon] || Gamepad2;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-400 hover:text-white hover:bg-dark-lighter",
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Premium */}
        {/* <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark to-transparent">
          <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl p-4 text-white text-center">
            <Crown className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
            <h3 className="font-bold mb-1">Go Premium</h3>
            <p className="text-xs text-white/80 mb-3">Unlock all features</p>
            <button className="bg-yellow-400 text-yellow-900 font-bold px-6 py-2 rounded-full text-sm hover:bg-yellow-300 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
}
