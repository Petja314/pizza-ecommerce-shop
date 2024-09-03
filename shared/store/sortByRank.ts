import { create } from 'zustand';
import { Category } from '.prisma/client';
import { categories } from '@/prisma/constants';

interface State {
   sortRankCategory: Category[];
   setSortRankCategory: (rank: Category[]) => void;
}

export const useCategoryRankStore = create<State>()((set) => ({
   sortRankCategory: [],
   setSortRankCategory: (categories: Category[]) =>
      set({ sortRankCategory: categories }),
}));
