"use client";

import { GameGrid } from "@/components/games/GameGrid";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RightSidebarExtra } from "@/components/layout/RightSidebarExtra";
import { Sidebar } from "@/components/layout/Sidebar";
import { useGameStore } from "@/store/gameStore";

export default function RecentlyPlayedPage() {
  const recentlyPlayed = useGameStore((s) => s.recentlyPlayed);

  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <div className="max-w-360 mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex gap-4 sm:gap-6">
          <div className="hidden lg:block shrink-0">
            <Sidebar />
          </div>
          <main className="flex-1 min-w-0 mainTwo">
            <h1 className="text-3xl font-bold text-white mb-2">
              🕐 Недавно сыгранные
            </h1>
            <p className="text-gray-400 mb-8">
              Игры, в которые вы недавно играли
            </p>
            {recentlyPlayed.length > 0 ? (
              <GameGrid title="" games={recentlyPlayed} columns={5} />
            ) : (
              <div className="text-center py-20">
                <p className="text-6xl mb-4"></p>
                <p className="text-gray-400 text-lg">
                  Никаких недавно сыгранных игр
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Начните играть в игры, и они появятся здесь
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

    //   <div className="min-h-screen bg-dark">
    //     <Header />
    //     <div className="max-w-7xl mx-auto px-4 py-8">
    //       <h1 className="text-3xl font-bold text-white mb-2">
    //         🕐 Recently Played
    //       </h1>
    //       <p className="text-gray-400 mb-8">Games you played recently</p>
    //       {recentlyPlayed.length > 0 ? (
    //         <GameGrid title="" games={recentlyPlayed} columns={5} />
    //       ) : (
    //         <div className="text-center py-20">
    //           <p className="text-6xl mb-4"></p>
    //           <p className="text-gray-400 text-lg">No recently played games</p>
    //           <p className="text-gray-500 text-sm mt-2">
    //             Start playing games and they will appear here
    //           </p>
    //         </div>
    //       )}
    //     </div>
    //     <Footer />
    //   </div>
  );
}
