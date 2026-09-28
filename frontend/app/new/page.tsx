import AdBanner from "@/components/adbanner/page";
import { GameGrid } from "@/components/games/GameGrid";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RightSidebar } from "@/components/layout/RighrSidebar";
// import { RightSidebarExtra } from "@/components/layout/RightSidebarExtra";
import { Sidebar } from "@/components/layout/Sidebar";
import gamesData from "@/data/games.json";
import { getAdsForPage } from "@/lib/strapiAds";

// Реклама подтягивается из Strapi во время рендера страницы. На этапе
// сборки переменная STRAPI_API_URL ещё недоступна, поэтому статическая
// генерация запекала бы пустую рекламу навсегда: страница отдавалась бы
// без блоков. Принудительный рендер на каждый запрос решает это.
export const dynamic = "force-dynamic";
export default async function NewGamesPage() {
  const ads = await getAdsForPage("new_games");
  const games = gamesData.games.filter((g) => g.isNew);

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
              ✨ Новые Игры
            </h1>
            <p className="text-gray-400 mb-8">
              Новые онлайн-игры 2026 года: свежие релизы, новинки игровой
              индустрии и только что вышедшие игры. Играй первым бесплатно, без
              регистрации и скачивания — на ПК и телефоне, в браузере.
            </p>
            {ads.top && (
              <AdBanner
                position="top"
                page="new_games"
                blockId={ads.top}
                className="w-full max-w-4xl mx-auto mb-6"
              />
            )}
            {games.length > 0 ? (
              <GameGrid title="" games={games} columns={5} />
            ) : (
              <p className="text-gray-400">Нет новых игр. Проверь позже!</p>
            )}
            {ads.bottom && (
              <AdBanner
                position="bottom"
                page="new_games"
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
            <RightSidebar page="new_games" />
          </div>
        </div>
      </div>
      <Footer />
    </div>

    // <div className="min-h-screen bg-dark">
    //   <Header />
    //   <div className="max-w-7xl mx-auto px-4 py-8">
    //     <h1 className="text-3xl font-bold text-white mb-2">✨ New Games</h1>
    //     <p className="text-gray-400 mb-8">Recently added games</p>
    //     {games.length > 0 ? (
    //       <GameGrid title="" games={games} columns={5} />
    //     ) : (
    //       <p className="text-gray-400">No new games yet. Check back soon!</p>
    //     )}
    //   </div>
    //   <Footer />
    // </div>
  );
}
