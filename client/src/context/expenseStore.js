import { create } from "zustand";

export const useExpenseStore = create((set) => ({
  expenses: [],
  setExpenses: (expenses) => set({ expenses }),

  selectedMonth: new Date().toISOString().slice(0, 7), // YYYY-MM
  setSelectedMonth: (month) => set({ selectedMonth: month }),
}));
