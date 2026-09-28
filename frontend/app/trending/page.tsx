import AdBanner from "@/components/adbanner/page";
import { GameGrid } from "@/components/games/GameGrid";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RightSidebar } from "@/components/layout/RighrSidebar";
import { RightSidebarExtra } from "@/components/layout/RightSidebarExtra";
import { Sidebar } from "@/components/layout/Sidebar";
import gamesData from "@/data/games.json";
import { getAdsForPage } from "@/lib/strapiAds";

export default async function TrendingPage() {
  const ads = await getAdsForPage("trending");
  const games = gamesData.games.filter((g) => g.isTrending);
  const game = gamesData.games;

  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <div className="max-w-360 mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex gap-4 sm:gap-6">
          <div className="hidden lg:block shrink-0 ">
            <Sidebar />
          </div>
          <main className="flex-1 min-w-0 mainTwo">
            <h1 className="text-3xl font-bold text-white  mb-2">
              🔥 Трендовые игры
            </h1>
            <p className="text-gray-400 mb-8">
              Игры в тренде онлайн: что сейчас на пике популярности и в топе
              игроков. Самые горячие новинки и трендовые игры бесплатно, без
              регистрации, на русском языке — для ПК и телефона.
            </p>
            {ads.top && (
              <AdBanner
                position="top"
                page="trending"
                blockId={ads.top}
                className="w-full max-w-4xl mx-auto mb-6"
              />
            )}
            <GameGrid title="" games={games} columns={5} />
            {ads.bottom && (
              <AdBanner
                position="bottom"
                page="trending"
                blockId={ads.bottom}
                className="w-full max-w-4xl mx-auto mb-6"
              />
            )}
          </main>
          {/* <div className="hidden xl:block shrink-0">
            <RightSidebarExtra />
          </div> */}
          <div className="hidden xl:block shrink-0 mainTwo">
            {/* <RightSidebar /> */}
            <RightSidebar page="trending" />
          </div>
        </div>
      </div>
      <Footer />
    </div>

    // <div className="min-h-screen bg-dark">
    //   <Header />
    //   <div className="max-w-7xl mx-auto px-4 py-8">
    //     <h1 className="text-3xl font-bold text-white mb-2">
    //       🔥 Trending Games
    //     </h1>
    //     <p className="text-gray-400 mb-8">Most popular games right now</p>
    //     <GameGrid title="" games={games} columns={5} />
    //   </div>
    //   <Footer />
    // </div>
  );
}
