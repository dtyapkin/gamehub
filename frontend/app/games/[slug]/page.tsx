import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  Clock,
  Download,
  Gamepad2,
  Users,
  Calendar,
  Globe,
  Shield,
  Monitor,
  ChevronRight,
  Play,
  ThumbsUp,
  MessageCircle,
  Flag,
  ExternalLink,
} from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import { GameCard } from "@/components/games/GameCard";
import { Footer } from "@/components/layout/Footer";
import gamesData from "@/data/games.json";
import { cn, formatNumber } from "@/lib/utils";
import type { Game } from "@/types";
import GameCardTwo from "@/components/games/GameCardTwo";
import AdBanner from "@/components/adbanner/page";
import { getAdsForPage } from "@/lib/strapiAds";

interface GameDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all games
export async function generateStaticParams() {
  return gamesData.games.map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata({ params }: GameDetailPageProps) {
  const { slug } = await params;
  const game = gamesData.games.find((g) => g.slug === slug);

  if (!game) return { title: "Game Not Found" };

  return {
    title: `${game.title} — Play Free Online | GameHub`,
    description: game.description,
    openGraph: {
      title: `${game.title} — Play Free Online`,
      description: game.description,
      images: [game.coverImage],
    },
  };
}

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
export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const ads = await getAdsForPage("game_detail");
  const { slug } = await params;
  const game = gamesData.games.find((g) => g.slug === slug);

  if (!game) {
    notFound();
  }

  const relatedGames = gamesData.games
    .filter(
      (g) =>
        g.id !== game.id &&
        g.categories.some((c) => game.categories.includes(c)),
    )
    .slice(0, 5);

  const allGames = gamesData.games;

  return (
    <div className="min-h-screen bg-dark">
      {/* Breadcrumb Navigation */}

      <nav className="bg-dark-lighter/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Главная
            </Link>

            <ChevronRight className="w-3 h-3 text-gray-600" />
            <Link
              href="/games"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Игры
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-white font-medium">{game.title}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            sizes="auto"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-dark/60 via-dark/80 to-dark" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-12">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Назад В Игры
          </Link>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Game Cover */}
            <div className="shrink-0">
              <div className="relative w-50 h-50 md:w-60 md:h-60 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={game.coverImage}
                  alt={game.title}
                  fill
                  sizes="auto"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Game Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {game.isTrending && (
                  <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    🔥 В Тренде
                  </span>
                )}
                {game.isNew && (
                  <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Новые
                  </span>
                )}
                {game.isPopular && (
                  <span className="bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    ⭐ Популярные
                  </span>
                )}
                <span className="bg-white/10 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  {game.ageRating}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                {game.title}
              </h1>
              <p className="text-lg text-gray-300 mb-4">{game.titleRu}</p>

              {/* Rating & Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <StarRating rating={game.rating} size="md" />
                  {/* <span className="text-gray-400 text-sm">
                    ({formatNumber(game.ratingCount)} отзывов)
                  </span> */}
                </div>
                {/* <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{formatNumber(game.plays)} игроков</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{formatNumber(game.likes)} лайков</span>
                </div> */}
              </div>

              {/* Developer & Publisher */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                <span>
                  Разработка:{" "}
                  <span className="text-white font-medium">
                    {game.developer}
                  </span>
                </span>
                {/* <span>•</span>
                <span>
                  Издатель:{" "}
                  <span className="text-white font-medium">
                    {game.publisher}
                  </span>
                </span> */}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-primary text-white font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
                >
                  <Play className="w-5 h-5" fill="currentColor" /> Играть
                </Link>
                {/* <button className="inline-flex items-center gap-2 bg-white/10 text-white font-medium px-5 py-3 rounded-full hover:bg-white/20 transition-colors">
                  <Heart className="w-4 h-4" /> Favorite
                </button>
                <button className="inline-flex items-center gap-2 bg-white/10 text-white font-medium px-5 py-3 rounded-full hover:bg-white/20 transition-colors">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="inline-flex items-center gap-2 bg-white/10 text-white font-medium px-5 py-3 rounded-full hover:bg-white/20 transition-colors">
                  <Flag className="w-4 h-4" /> Report
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}

          <div className="flex-1 min-w-0">
            {ads.top && (
              <AdBanner
                position="top"
                page="game_detail"
                blockId={ads.top}
                className="w-full max-w-4xl mx-auto mb-6"
              />
            )}
            {/* Game Embed / Screenshot */}
            <section className="mb-8">
              <div className="relative aspect-video bg-dark-light rounded-2xl overflow-hidden">
                {/* <iframe
                  src="https://small-games.info/s/l/m/mambo_2.gif"
                  className="w-full h-full border-none"
                  allowFullScreen
                  allow-pointer-lock
                  allow="autoplay; fullscreen"
                  title="Level Devil"
                /> */}
                <Image
                  //   src="/images/mambo_2.gif"
                  src={game.screenshots[0] || game.coverImage}
                  alt={`${game.title} gameplay`}
                  fill
                  sizes="auto"
                  className="object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Link
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors group"
                  >
                    <Play
                      className="w-8 h-8 md:w-10 md:h-10 text-white ml-1 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                    />
                  </Link>
                </div>
              </div>
            </section>

            {/* Screenshots Gallery */}
            {/* {game.screenshots.length > 1 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">
                  Скрин экрана
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {game.screenshots.map((screenshot, i) => (
                    <div
                      key={i}
                      className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
                    >
                      <Image
                        src={screenshot}
                        alt={`${game.title} screenshot ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )} */}
            {/* Ad Banner 2 - Bottom Position */}
            {/* <AdBanner position="top" className="mb-8" /> */}

            {/* Description */}
            <section className="mb-8">
              <h2 className="text-xl font-normal text-white mb-4">Описание</h2>
              <div className="bg-dark-light rounded-2xl p-6">
                <p className="text-gray-300 leading-relaxed mb-4">
                  {game.description}
                </p>
                <p className="text-gray-400 leading-relaxed">
                  {game.descriptionRu}
                </p>
              </div>
            </section>

            {ads.infeed && (
              <AdBanner
                position="infeed"
                page="game_detail"
                blockId={ads.infeed}
                className="w-full max-w-4xl mx-auto mb-6"
              />
            )}
            <section className="mb-8">
              <h2 className="text-xl font-normal text-white mb-4">
                Как Играть
              </h2>
              <div className="bg-dark-light rounded-2xl p-6">
                <p className="text-gray-300 leading-relaxed mb-4">
                  {game.gameDescription}
                </p>
                {/* <p className="text-gray-400 leading-relaxed">
                  {game.gameDescription}
                </p> */}
              </div>
            </section>

            {/* Game Details Grid */}
            <section className="mb-8">
              <h2 className="text-xl font-normal text-white mb-4">
                Детали Игры
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem
                  icon={Calendar}
                  label="Дата выхода"
                  value={game.releaseDate}
                />
                <DetailItem
                  icon={Clock}
                  label="Игра"
                  value={game.lastUpdated}
                />
                <DetailItem
                  icon={Download}
                  label="Технология"
                  value={game.fileSize}
                />
                <DetailItem
                  icon={Shield}
                  label="Возраст"
                  value={game.ageRating}
                />
                <DetailItem
                  icon={Globe}
                  label="Языки"
                  value={game.languages.join(", ").toUpperCase()}
                />
                <DetailItem
                  icon={Monitor}
                  label="Платформы"
                  value={game.platforms.join(", ").toUpperCase()}
                />
              </div>
            </section>
            {/* Ad Banner 2 - Bottom Position */}
            {/* <AdBanner position="bottom" className="mb-8" /> */}

            {/* Tags */}
            <section className="mb-8">
              <h2 className="text-xl font-normal text-white mb-4">Теги</h2>
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/games?tag=${tag}`}
                    className="bg-dark-light text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-primary/20 hover:text-primary-light transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </section>

            {/* Categories */}
            <section className="mb-8">
              <h2 className="text-xl font-normal text-white mb-4">Категории</h2>
              <div className="flex flex-wrap gap-2">
                {game.categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/categories/${cat}`}
                    className="bg-primary/20 text-primary-light px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/30 transition-colors capitalize"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </section>

            {ads.bottom && (
              <AdBanner
                position="bottom"
                page="game_detail"
                blockId={ads.bottom}
                className="w-full max-w-4xl mx-auto mb-6"
              />
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="w-full lg:w-[320px] shrink-0">
            {/* Play Button Sticky */}
            <div className="sticky top-4 space-y-4">
              <Link
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-primary text-white font-bold py-4 rounded-2xl text-center hover:opacity-90 transition-opacity shadow-lg shadow-primary/30 text-lg"
              >
                <Play className="w-6 h-6 inline mr-2" fill="currentColor" />{" "}
                Играть
              </Link>

              {/* Quick Info */}
              <div className="bg-dark-light rounded-2xl p-5">
                <h3 className="text-white font-normal mb-4">Информация</h3>
                <div className="space-y-3">
                  <InfoRow label="Разработчик: " value={game.developer} />
                  {/* <InfoRow label="Издатель: " value={game.publisher} /> */}
                  <InfoRow label="Жанр: " value={game.category} />
                  {/* <InfoRow label="Цена" value={game.price} /> */}
                  <InfoRow label="Рейтинг: " value={`${game.rating} / 5`} />
                </div>
              </div>
              {/* Ad Banner 2 - Bottom Position */}
              {/* <AdBanner position="sidebar" className="mb-8" /> */}

              {/* Ad Banner 2 - Bottom Position */}
              {/* <AdBanner position="bottom" className="mb-8" /> */}

              {/* External Link */}
              {/* <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-white/10 text-gray-300 font-medium py-3 rounded-xl hover:bg-white/5 transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" /> Играть в Яндекс Играх
              </a> */}
              {ads.sidebar_top && (
                <AdBanner
                  position="sidebar_top"
                  page="game_detail"
                  blockId={ads.sidebar_top}
                  className="w-full max-w-4xl mx-auto mb-6"
                />
              )}
              {ads.sidebar_bottom && (
                <AdBanner
                  position="sidebar_bottom"
                  page="game_detail"
                  blockId={ads.sidebar_bottom}
                  className="w-full max-w-4xl mx-auto mb-6"
                />
              )}
            </div>
          </aside>
        </div>

        {/*         
        {relatedGames.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {relatedGames.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          </section>
        )}

        
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">More Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {allGames
              .filter((g) => g.id !== game.id)
              .slice(0, 10)
              .map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
          </div>
        </section> */}

        {/* Related Games */}
        {relatedGames.length > 0 && (
          <section className="mt-8 sm:mt-12">
            <h2 className="text-xl sm:text-2xl font-normal text-white mb-4 sm:mb-6">
              Ваи Также может Понравиться
            </h2>
            {/* Mobile: 2, Tablet: 3, Desktop: 5 */}
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {relatedGames.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          </section>
        )}

        {/* All Games */}
        <section className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-normal text-white mb-4 sm:mb-6">
            Больше Игр
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {allGames
              .filter((g) => g.id !== game.id)
              .slice(0, 10)
              .map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

// Helper Components
function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-dark-light rounded-xl p-4 flex items-start gap-3">
      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary-light" />
      </div>
      <div>
        <p className="text-gray-500 text-xs mb-0.5">{label}</p>
        <p className="text-white font-medium text-sm">{value}</p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-white font-medium text-sm capitalize">{value}</span>
    </div>
  );
}
