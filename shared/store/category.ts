import { create } from 'zustand';
import { Category } from '.prisma/client';

interface State {
   activeId: number;
   setActiveId: (activeId: number) => void;
   sortRankCategory: Category[];
   setSortRankCategory: (rank: Category[]) => void;
}

export const useCategoryStore = create<State>()((set) => ({
   activeId: 1,
   setActiveId: (activeId: number) => set({ activeId }),
   sortRankCategory: [],
   setSortRankCategory: (categories: Category[]) =>
      set({ sortRankCategory: categories }),
}));
