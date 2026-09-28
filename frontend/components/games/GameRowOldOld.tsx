"use client";

import { GameCard } from "./GameCard";
import { useDragScroll } from "@/hooks/useDragScroll";
import type { Game } from "@/types";

interface GameRowProps {
  title: string;
  games: Game[];
  viewAllHref?: string;
}

export function GameRow({ title, games, viewAllHref }: GameRowProps) {
  const { ref, isDragging, handlers } = useDragScroll<HTMLDivElement>();

  return (
    <section className="mb-6 sm:mb-8 min-w-0">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-normal text-white flex items-center gap-2 mt-4">
          <span className="text-orange-500">🔥</span> {title}
        </h2>
        {viewAllHref && (
          <a
            href={viewAllHref}
            className="text-xs sm:text-sm text-primary-light hover:text-primary transition-colors flex items-center gap-1"
          >
            Смотреть все <span>›</span>
          </a>
        )}
      </div>

      <div
        ref={ref}
        {...handlers}
        className={[
          "flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-3 sm:mx-0 px-3 sm:px-0",
          isDragging ? "cursor-grabbing select-none" : "cursor-grab",
        ].join(" ")}
      >
        {games.map((game) => (
          <div key={game.id} className="shrink-0">
            <GameCard game={game} variant="compact" />
          </div>
        ))}
      </div>
    </section>
  );
}
