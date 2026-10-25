"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  Gamepad2,
  Flame,
  Sparkles,
  Star,
  LayoutGrid,
  Heart,
  Clock,
  Crown,
  Medal,
  Mars,
  Venus,
  type LucideIcon,
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { PremiumCard } from "@/components/ui/PremiumCard";
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
  Medal,
  Mars,
  Venus,
};

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "w-60 bg-dark-light rounded-2xl p-4 flex flex-col gap-1 h-fit sticky top-4",
        className,
      )}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 px-3 py-3 mb-2">
        <div className="flex text-center justify-center">
          <Image
            src="/logo.png"
            width={40}
            height={25}
            alt="logo"
            //fill
            className="object-cover w-auto h-auto"
          />
        </div>
        {/* <Gamepad2 className="w-5 h-5 text-white" /> */}

        <span className="text-lg font-bold text-white">
          Online<span className="text-primary-light"> Game</span>
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon] || Gamepad2;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
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

      {/* Premium Card */}
      {/* <div className="mt-4">
        <PremiumCard />
      </div> */}
    </aside>
  );
}
