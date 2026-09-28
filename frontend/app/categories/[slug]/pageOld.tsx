// import { notFound } from "next/navigation";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";
// import { GameGrid } from "@/components/games/GameGrid";
// import { Footer } from "@/components/layout/Footer";
// import gamesData from "@/data/games.json";
// import categoriesData from "@/data/categories.json";

// interface CategoryPageProps {
//   params: Promise<{ slug: string }>;
// }

// export async function generateStaticParams() {
//   return categoriesData.categories.map((cat) => ({
//     slug: cat.slug,
//   }));
// }

// export default async function CategoryPage({ params }: CategoryPageProps) {
//   const { slug } = await params;
//   const category = categoriesData.categories.find((c) => c.slug === slug);

//   if (!category) notFound();

//   const games = gamesData.games.filter((g) => g.categories.includes(slug));

//   return (
//     <div className="min-h-screen bg-dark">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
//         <Link
//           href="/"
//           className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 sm:mb-6 transition-colors"
//         >
//           <ArrowLeft className="w-4 h-4" /> Back to Home
//         </Link>

//         <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
//           <div
//             className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
//             style={{ backgroundColor: category.color }}
//           >
//             <span className="text-2xl sm:text-3xl">🎮</span>
//           </div>
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-white">
//               {category.name}
//             </h1>
//             <p className="text-gray-400 text-sm sm:text-base">
//               {category.description}
//             </p>
//             <p className="text-xs sm:text-sm text-primary-light mt-1">
//               {games.length} games
//             </p>
//           </div>
//         </div>

//         <GameGrid title="" games={games} />
//       </div>
//       <Footer />
//     </div>
//   );
// }

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { GameGrid } from "@/components/games/GameGrid";
import { Footer } from "@/components/layout/Footer";
import gamesData from "@/data/games.json";
import categoriesData from "@/data/categories.json";
import {
  Sword,
  Map,
  Flag,
  Star,
  Puzzle,
  Target,
  type LucideIcon,
} from "lucide-react";
import AdBanner from "@/components/adbanner/page";

const ICON_MAP: Record<string, LucideIcon> = {
  Sword,
  Map,
  Flag,
  Star,
  Puzzle,
  Target,
};

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categoriesData.categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoriesData.categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const games = gamesData.games.filter((g) => g.categories.includes(slug));

  const IconComponent = ICON_MAP[category.icon] || Puzzle;

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 sm:mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Назад в Главную
        </Link>

        {/* Category Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: category.color }}
          >
            <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {category.name}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              {category.description}
            </p>
            <p className="text-xs sm:text-sm text-primary-light mt-1">
              {games.length} games
            </p>
          </div>
        </div>

        {/* Ad Banner 1 - Top Position */}
        {/* <AdBanner position="sidebar" className="mb-6" /> */}

        {/* <AdBanner position="top" className="mb-6" /> */}

        {/* Games Grid */}
        {games.length > 0 ? (
          <GameGrid title="" games={games} />
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-dark-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Sword className="w-10 h-10 text-gray-600" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Нет игр в этой категории
            </h2>
            <p className="text-gray-400 mb-6">
              Зайдите позже, чтобы узнать о новых дополнениях
            </p>
            <Link
              href="/games"
              className="inline-flex items-center gap-2 bg-gradient-primary text-white font-bold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Просмотрите все игры
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
