"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number; // ← quantity로 변경
};

type CartState = {
  tableNo?: string;
  items: CartItem[];
  setTable: (no: string) => void;
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      tableNo: undefined,
      items: [],
      setTable: (no) => set({ tableNo: no }),

      add: (item, qty = 1) =>
        set((state) => {
          const found = state.items.find((i) => i.id === item.id);
          if (found) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: qty }] };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        })),

      clear: () => set({ items: [] }),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "lunaire-cart",
    }
  )
);
