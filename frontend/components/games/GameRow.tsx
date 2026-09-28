"use client";

import ScrollContainer from "react-indiana-drag-scroll";
import { GameCard } from "./GameCard";
import type { Game } from "@/types";

interface GameRowProps {
  title: string;
  games: Game[];
  viewAllHref?: string;
}

export function GameRow({ title, games, viewAllHref }: GameRowProps) {
  return (
    <section className="mb-6 sm:mb-8">
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
      <ScrollContainer
        horizontal
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 cursor-grab"
      >
        {games.slice(0, 15).map((game) => (
          <div key={game.id} className="shrink-0">
            <GameCard game={game} variant="compact" />
          </div>
        ))}
        {/* {visibleGames.map((game) => (
          <div key={game.id} className="shrink-0">
            <GameCard game={game} variant="compact" />
          </div>
        ))} */}
      </ScrollContainer>
      {/* Горизонтальный скролл — карточки не сжимаются */}
      {/* <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-3 sm:mx-0 px-3 sm:px-0"> */}
      {/* {games.map((game) => (
          <div key={game.id} className="shrink-0">
            <GameCard game={game} variant="compact" />
          </div>
        ))} */}
      {/* {games.slice(0, 10).map((game) => (
          <div key={game.id} className="shrink-0">
            <GameCard game={game} variant="compact" />
          </div>
        ))} */}
      {/* </div> */}
    </section>
  );
}
