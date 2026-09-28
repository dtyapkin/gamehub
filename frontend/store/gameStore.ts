import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Game } from '@/types';

interface GameStore {
  recentlyPlayed: Game[];
  addRecentlyPlayed: (game: Game) => void;
  clearRecentlyPlayed: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      recentlyPlayed: [],
      addRecentlyPlayed: (game) =>
        set((state) => {
          const filtered = state.recentlyPlayed.filter((g) => g.id !== game.id);
          return { recentlyPlayed: [game, ...filtered].slice(0, 20) };
        }),
      clearRecentlyPlayed: () => set({ recentlyPlayed: [] }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      selectedCategory: null,
      setSelectedCategory: (category) => set({ selectedCategory: category }),
    }),
    {
      name: 'game-store',
      partialize: (state) => ({
        recentlyPlayed: state.recentlyPlayed,
      }),
    }
  )
);