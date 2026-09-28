// import Link from "next/link";
// import {
//   Sword,
//   Map,
//   Flag,
//   Puzzle,
//   Target,
//   type LucideIcon,
// } from "lucide-react";
// import type { Category } from "@/types";

// const ICON_MAP: Record<string, LucideIcon> = {
//   Sword,
//   Map,
//   Flag,

//   Puzzle,
//   Target,
// };

// interface CategoryCardProps {
//   category: Category;
// }

// export function CategoryCard({ category }: CategoryCardProps) {
//   const IconComponent = ICON_MAP[category.icon] || Puzzle;

//   return (
//     <Link
//       href={`/categories/${category.slug}`}
//       className="group flex flex-col items-center gap-1.5 sm:gap-2"
//     >
//       <div
//         className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
//         style={{ backgroundColor: category.color }}
//       >
//         <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
//       </div>
//       <span className="text-[10px] sm:text-xs md:text-sm font-medium text-white text-center leading-tight">
//         {category.name}
//       </span>
//     </Link>
//   );
// }

"use client";

import Link from "next/link";
import {
  Sword,
  Map,
  Flag,
  Star,
  Puzzle,
  Target,
  Asterisk,
  Box,
  Skull,
  Ghost,
  Crown,
  Cat,
  Palette,
  Music,
  Car,
  Fish,
  Gamepad2,
  Joystick,
  Shield,
  Flame,
  Bug,
  Zap,
  Circle,
  Wind,
  Key,
  Dice5,
  Spade,
  BookOpen,
  Grid3x3,
  Anchor,
  ChefHat,
  Sparkles,
  Cog,
  Blocks,
  Castle,
  Hammer,
  GraduationCap,
  Globe,
  Crosshair,
  UserX,
  Tv,
  Smile,
  Building2,
  Layers,
  Lightbulb,
  Grid2x2,
  Music2,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Sword,
  Map,
  Flag,
  Star,
  Puzzle,
  Target,
  Asterisk,
  Box,
  Skull,
  Ghost,
  Crown,
  Cat,
  Palette,
  Music,
  Car,
  Fish,
  Gamepad2,
  Joystick,
  Shield,
  Flame,
  Bug,
  Zap,
  Circle,
  Wind,
  Key,
  Dice5,
  Spade,
  BookOpen,
  Grid3x3,
  Anchor,
  ChefHat,
  Sparkles,
  Cog,
  Blocks,
  Castle,
  Hammer,
  GraduationCap,
  Globe,
  Crosshair,
  UserX,
  Tv,
  Smile,
  Building2,
  Layers,
  Lightbulb,
  Grid2x2,
  Music2,
};

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = ICON_MAP[category.icon] || Puzzle;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex flex-col items-center gap-1.5 sm:gap-2 transition-transform hover:scale-105"
    >
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: category.color }}
      >
        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
      </div>
      <span className="text-[10px] sm:text-xs md:text-sm font-medium text-white text-center leading-tight">
        {category.name}
      </span>
    </Link>
  );
}
