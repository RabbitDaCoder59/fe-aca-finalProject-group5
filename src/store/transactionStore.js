import { create } from 'zustand';

export const useTransactionStore = create((set) => ({
  transactions: [],
  
  addTransaction: (transaction) => 
    set((state) => ({
      transactions: [...state.transactions, { ...transaction, id: Date.now() }]
    })),
    
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id)
    })),
    
  updateTransaction: (id, updatedTransaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) => 
        t.id === id ? { ...t, ...updatedTransaction } : t
      )
    })),
    
  clearTransactions: () => set({ transactions: [] })
}));
