import { create } from 'zustand';
import { Category } from '.prisma/client';

interface State {
   activeId: number;
   setActiveId: (activeId: number) => void;
}

export const useCategoryStore = create<State>()((set) => ({
   activeId: 1,
   setActiveId: (activeId: number) => set({ activeId }),
}));
