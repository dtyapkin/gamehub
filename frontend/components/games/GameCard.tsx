"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import { cn } from "@/lib/utils";
import type { Game } from "@/types";
import { useFavorites } from "@/hooks/useFavorites";

interface GameCardProps {
  game: Game;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

export function GameCard({
  game,
  variant = "default",
  className,
}: GameCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(game.id);

  // Компактный вариант — для горизонтальных рядов (Trending Now)
  if (variant === "compact") {
    return (
      <Link
        href={`/games/${game.slug}`}
        className={cn(
          "group block flex-shrink-0 w-[120px] sm:w-[140px] md:w-[160px]",
          className,
        )}
      >
        <div className="relative  aspect-square rounded-xl overflow-hidden mb-2">
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="140px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="text-xs sm:text-xs font-normal text-white truncate">
          {game.title}
        </h3>
        <StarRating rating={game.rating} />
      </Link>
    );
  }

  // Стандартная карточка — для сетки
  return (
    <Link href={`/games/${game.slug}`} className={cn("group block", className)}>
      <div className="relative aspect-square rounded-xl overflow-hidden mb-2 bg-dark-light">
        <Image
          src={game.coverImage}
          alt={game.title}
          fill
          loading="lazy"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
        />

        {/* Кнопка избранного — показываем только на десктопе и планшете */}
        {/* <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(game.id);
          }}
          className={cn(
            "absolute top-1.5 right-1.5 p-1 rounded-full backdrop-blur-sm transition-all sm:top-2 sm:right-2 sm:p-1.5",
            isFav
              ? "bg-red-500 text-white"
              : "bg-black/30 text-white/70 hover:text-white",
          )}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className="w-3 h-3 sm:w-3.5 sm:h-3.5"
            fill={isFav ? "currentColor" : "none"}
          />
        </button> */}

        {/* Бейджи */}
        {game.isNew && (
          <span className="absolute top-1.5 left-1.5 bg-green-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
            NEW
          </span>
        )}
        {game.isTrending && (
          <span className="absolute bottom-1.5 left-1.5 bg-orange-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-0.5">
            🔥 HOT
          </span>
        )}
        <div className="absolute  inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-end justify-center">
          <p className="text-white leading-tight font-xs sm:text-base font-normal text-center  drop-shadow-md">
            {game.title}
          </p>
        </div>
      </div>

      <h3 className="text-xs sm:text-sm font-normal text-white truncate group-hover:text-primary-light transition-colors">
        {game.title}
      </h3>
      <StarRating rating={game.rating} />
    </Link>
  );
}
