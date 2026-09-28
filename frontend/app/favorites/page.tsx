"use client";

import { GameGrid } from "@/components/games/GameGrid";
import { Footer } from "@/components/layout/Footer";
import { useFavorites } from "@/hooks/useFavorites";
import gamesData from "@/data/games.json";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { RightSidebarExtra } from "@/components/layout/RightSidebarExtra";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const games = gamesData.games.filter((g) => favorites.includes(g.id));

  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <div className="max-w-360 mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex gap-4 sm:gap-6">
          <div className="hidden lg:block shrink-0">
            <Sidebar />
          </div>
          <main className="flex-1 min-w-0 mainTwo">
            <h1 className="text-3xl font-bold text-white mb-2">❤️ Любимые</h1>
            <p className="text-gray-400 mb-8">Ваши сахраненные игры</p>{" "}
            {games.length > 0 ? (
              <GameGrid title="" games={games} columns={5} />
            ) : (
              <div className="text-center py-20">
                <p className="text-6xl mb-4">❤️</p>
                <p className="text-gray-400 text-lg">Нет любимых игр</p>
                <p className="text-gray-500 text-sm mt-2">
                  Сликни на иконку сердца, чтобы добавить
                </p>
              </div>
            )}
          </main>
          <div className="hidden xl:block shrink-0">
            <RightSidebarExtra />
          </div>
        </div>
      </div>
      <Footer />
    </div>

    // <div className="min-h-screen bg-dark">
    //   <Header />
    //   <div className="max-w-7xl mx-auto px-4 py-8">
    //     <Sidebar />
    //     <h1 className="text-3xl font-bold text-white mb-2">❤️ Favorites</h1>
    //     <p className="text-gray-400 mb-8">Your saved games</p>
    //     {games.length > 0 ? (
    //       <GameGrid title="" games={games} columns={5} />
    //     ) : (
    //       <div className="text-center py-20">
    //         <p className="text-6xl mb-4">❤️</p>
    //         <p className="text-gray-400 text-lg">No favorites yet</p>
    //         <p className="text-gray-500 text-sm mt-2">
    //           Click the heart icon on any game to add it here
    //         </p>
    //       </div>
    //     )}
    //   </div>
    //   <Footer />
    // </div>
  );
}
