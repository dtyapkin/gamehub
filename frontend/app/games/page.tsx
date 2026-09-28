import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { GameGrid } from "@/components/games/GameGrid";
import { Footer } from "@/components/layout/Footer";
import gamesData from "@/data/games.json";
import { RightSidebarExtra } from "@/components/layout/RightSidebarExtra";
import { RightSidebar } from "@/components/layout/RighrSidebar";
import { getAdsForPage } from "@/lib/strapiAds";
import AdBanner from "@/components/adbanner/page";

export const metadata = {
  title: "All Games — GameHub",
  description: "Browse all available games",
};

// Реклама подтягивается из Strapi во время рендера страницы. На этапе
// сборки переменная STRAPI_API_URL ещё недоступна, поэтому статическая
// генерация запекала бы пустую рекламу навсегда: страница отдавалась бы
// без блоков. Принудительный рендер на каждый запрос решает это.
export const dynamic = "force-dynamic";
export default async function AllGamesPage() {
  const games = gamesData.games;
  const ads = await getAdsForPage("all_games");

  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <div className="max-w-360 mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex gap-4 sm:gap-6">
          <div className="hidden lg:block shrink-0">
            <Sidebar />
          </div>
          <main className="flex-1 min-w-0 mainTwo">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
              🎮 Все Игры
            </h1>
            <p className="text-gray-400 mb-8">
              Все онлайн-игры на одном сайте: полная коллекция бесплатных игр на
              любой вкус. Аркады, стратегии, гонки, стрелялки, головоломки,
              симуляторы и приключения — играй без регистрации и скачивания, на
              русском.
            </p>
            {ads.top && (
              <AdBanner
                position="top"
                page="all_games"
                blockId={ads.top}
                className="w-full max-w-4xl mx-auto mb-6"
              />
            )}
            {/* GameGrid теперь сам управляет responsive сеткой */}
            <GameGrid title="" games={games} />
            {ads.bottom && (
              <AdBanner
                position="bottom"
                page="all_games"
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
            <RightSidebar page="all_games" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
