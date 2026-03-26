'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  /** id + optionLabel 조합으로 장바구니 내 고유 식별 */
  cartKey: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  optionLabel?: string; // e.g. "Ice · Large · 바닐라"
};

type CartState = {
  tableNo?: string;
  items: CartItem[];
  placedOrderIds: string[];
  setTable: (no: string) => void;
  add: (
    item: Omit<CartItem, 'cartKey' | 'quantity'>,
    quantity?: number,
  ) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  addPlacedOrderId: (id: string) => void;
  clear: () => void;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      tableNo: undefined,
      items: [],
      placedOrderIds: [],
      setTable: (no) => set({ tableNo: no }),

      add: (item, qty = 1) =>
        set((state) => {
          const cartKey = `${item.id}__${item.optionLabel ?? ''}`;
          const found = state.items.find((i) => i.cartKey === cartKey);
          if (found) {
            return {
              items: state.items.map((i) =>
                i.cartKey === cartKey
                  ? { ...i, quantity: i.quantity + qty }
                  : i,
              ),
            };
          }
          return {
            items: [...state.items, { ...item, cartKey, quantity: qty }],
          };
        }),

      updateQuantity: (cartKey, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.cartKey === cartKey ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        })),

      addPlacedOrderId: (id) =>
        set((state) => ({
          placedOrderIds: [id, ...state.placedOrderIds].slice(0, 20), // 최근 20개만 보관
        })),

      clear: () => set({ items: [] }),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'lunaire-cart',
    },
  ),
);
