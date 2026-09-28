import { CategoryCard } from "@/components/categories/CategoryCard";
import { GameGrid } from "@/components/games/GameGrid";
import { Footer } from "@/components/layout/Footer";
import gamesData from "@/data/games.json";
import categoriesData from "@/data/categories.json";
import { Sidebar } from "@/components/layout/Sidebar";
import AdBanner from "@/components/adbanner/page";
import { RightSidebarExtra } from "@/components/layout/RightSidebarExtra";
import { Header } from "@/components/layout/Header";
import { RightSidebar } from "@/components/layout/RighrSidebar";
import { getAdsForPage } from "@/lib/strapiAds";

export default async function NewGamesPage() {
  const ads = await getAdsForPage("categories");
  //const games = gamesData.games.filter((g) => g.isNew);
  const categories = categoriesData.categories;

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
              📂 Все Категории
            </h1>
            <p className="text-gray-400 mb-8">
              Все категории онлайн-игр: жанры и подборки для ПК и телефона.
              Найди свои любимые игры — аркады, экшн, стратегии, гонки,
              симуляторы, головоломки, игры для детей, мальчиков и девочек.
              Бесплатно, без регистрации, в браузере.
            </p>
            {/* GameGrid теперь сам управляет responsive сеткой */}

            {/* Ad Banner 2 - Bottom Position */}
            {/* <AdBanner position="bottom" className="mb-8" /> */}
            {ads.top && (
              <AdBanner
                position="bottom"
                page="categories"
                blockId={ads.top}
                className="w-full max-w-4xl mx-auto mb-6"
              />
            )}

            <section className="mb-6 sm:mb-8">
              <div className="flex items-start justify-between mb-4">
                {/* <h2 className="text-lg sm:text-xl font-bold text-white">
                  Top Categories
                </h2> */}
                {/* <a
                  href="/categories"
                  className="text-xs sm:text-sm text-primary-light hover:text-primary transition-colors flex items-center gap-1"
                >
                  View All <span>›</span>
                </a> */}
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </section>
            {ads.bottom && (
              <AdBanner
                position="bottom"
                page="categories"
                blockId={ads.bottom}
                className="w-full max-w-4xl mx-auto mb-6"
              />
            )}
            {/* Ad Banner 2 - Bottom Position */}
            {/* <AdBanner position="bottom" className="mb-8" /> */}
          </main>
          {/* Right Sidebar — Desktop XL only */}
          {/* <div className="hidden xl:block shrink-0">
            <RightSidebarExtra />
          </div> */}
          <div className="hidden xl:block shrink-0 mainTwo">
            {/* <RightSidebar /> */}
            <RightSidebar page="categories" />
          </div>
        </div>
      </div>
      <Footer />
    </div>

    // <div className="min-h-screen bg-dark">
    //   <div className="max-w-7xl mx-auto px-4 py-8">
    //     <div className="hidden lg:block flex-shrink-0">
    //       <Sidebar />
    //     </div>
    //     <main className="flex-1 min-w-0">
    //       <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
    //         All Categories
    //       </h1>

    //       <section className="mb-6 sm:mb-8">
    //         <div className="flex items-center justify-between mb-4">
    //           <h2 className="text-lg sm:text-xl font-bold text-white">
    //             Top Categories
    //           </h2>
    //           <a
    //             href="/categories"
    //             className="text-xs sm:text-sm text-primary-light hover:text-primary transition-colors flex items-center gap-1"
    //           >
    //             View All <span>›</span>
    //           </a>
    //         </div>
    //         <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
    //           {categories.map((category) => (
    //             <CategoryCard key={category.id} category={category} />
    //           ))}
    //         </div>
    //       </section>
    //     </main>
    //   </div>
    //   <Footer />
    // </div>
  );
}
