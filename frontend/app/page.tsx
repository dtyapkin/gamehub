import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { GameGrid } from "@/components/games/GameGrid";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { Footer } from "@/components/layout/Footer";
import gamesData from "@/data/games.json";
import categoriesData from "@/data/categories.json";
//import nftsData from "@/data/nfts.json";
import HeroBanner from "@/components/games/HeroBanner";
import { getAdsForPage } from "@/lib/strapiAds";
import AdBanner from "@/components/adbanner/page";
import { RightSidebar } from "@/components/layout/RighrSidebar";
import { GameRow } from "@/components/games/GameRow";

// Реклама подтягивается из Strapi во время рендера страницы. На этапе
// сборки переменная STRAPI_API_URL ещё недоступна, поэтому статическая
// генерация запекала бы пустую рекламу навсегда: страница отдавалась бы
// без блоков. Принудительный рендер на каждый запрос решает это.
export const dynamic = "force-dynamic";
//
// Альтернатива, если динамический рендер страниц начнёт мешать по скорости
// (это касается 474 страниц игр): заменить force-dynamic на ISR. Страницы
// снова собираются статически, реклама обновляется раз в час. Минус - первый
// час после деплоя сайт будет без блоков. Одновременно с force-dynamic
// revalidate использовать нельзя, Next.js на это ругается.
// export const revalidate = 3600;
export default async function HomePage() {
  const ads = await getAdsForPage("home");

  console.log("📢 ADS FROM STRAPI:", ads);

  const games = gamesData.games;
  const categories = categoriesData.categories;
  //const nfts = nftsData.nfts;

  const trendingGames = games.filter((g) => g.isTrending);
  const popularGames = games.filter((g) => g.isPopular);
  const newGames = games.filter((g) => g.isNew);

  //   const testBlockIds: Record<string, string> = {
  //     "home-top": "R-A-123456-1",
  //     "home-bottom": "R-A-123456-2",
  //   };

  return (
    <div className="min-h-screen bg-dark">
      <Header />

      <div className="max-w-360 mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex gap-4 sm:gap-3">
          <div className="hidden lg:block shrink-0">
            <Sidebar />
          </div>

          <main className="flex-1 min-w-0 p-3 mainTwo">
            <div className="mb-0 sm:mb-0"></div>
            <div className="">
              <HeroBanner />
            </div>
            <GameRow
              title="Трендовые игры"
              games={trendingGames}
              viewAllHref="/trending"
            />
            <section className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-normal text-white">
                  Топ Категорий
                </h2>
                <a
                  href="/categories"
                  className="text-xs sm:text-sm text-primary-light hover:text-primary transition-colors flex items-center gap-1"
                >
                  Смотреть все <span>›</span>
                </a>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
                {categories.slice(0, 6).map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
                {/* {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))} */}
              </div>
            </section>
            {/* Рендерим ТОЛЬКО если blockId существует */}
            {ads.top && (
              <AdBanner
                position="top"
                page="home"
                blockId={ads.top}
                className="w-full max-w-4xl mx-auto mb-6"
              />
            )}
            {/* Временно, для тестов В page.tsx: */}
            {/* <AdBanner
              position="top"
              page="home"
              blockId={ads.top || testBlockIds["home-top"]} // Фоллбэк на тестовый ID
              className="w-full max-w-4xl mx-auto mb-4"
            /> */}
            <GameGrid title="Новые игры" games={newGames} viewAllHref="/new" />
            {ads.infeed && (
              <AdBanner
                position="infeed"
                page="home"
                blockId={ads.infeed}
                className="w-full max-w-4xl mx-auto mb-6"
              />
            )}
            <GameGrid
              title="Популярные игры"
              games={popularGames}
              viewAllHref="/popular"
            />
            {/* Рендерим ТОЛЬКО если blockId существует */}
            {ads.bottom && (
              <AdBanner
                position="bottom"
                page="home"
                blockId={ads.bottom}
                className="w-full max-w-4xl mx-auto mb-6"
              />
            )}
            {/* <GameGrid
              title="Трендовые игры"
              games={trendingGames}
              viewAllHref="/trending"
            /> */}
          </main>

          <div className="hidden xl:block shrink-0 mainTwo">
            {/* <RightSidebar /> */}
            <RightSidebar page="home" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
