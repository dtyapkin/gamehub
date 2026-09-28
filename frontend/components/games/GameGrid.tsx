"use client";

import { GameCard } from "./GameCard";
import type { Game } from "@/types";
import { cn } from "@/lib/utils";

interface GameGridProps {
  title: string;
  games: Game[];
  viewAllHref?: string;
  columns?: number;
  className?: string;
}

export function GameGrid({
  title,
  games,
  viewAllHref,
  columns = 5,
  className,
}: GameGridProps) {
  return (
    <section className={cn("mb-8", className)}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-normal text-white flex items-center gap-2">
            <span className="text-yellow-400">⭐</span> {title}
          </h2>
          {viewAllHref && (
            <a
              href={viewAllHref}
              className="text-sm text-primary-light hover:text-primary transition-colors flex items-center gap-1"
            >
              Смотреть все <span>›</span>
            </a>
          )}
        </div>
      )}

      {/*
        Responsive grid:
        - Mobile (< 640px): 2 колонки
        - Tablet (640px – 1024px): 3 колонки
        - Desktop (1024px – 1280px): 4 колонки
        - Desktop XL (> 1280px): 5 колонок
      */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}
