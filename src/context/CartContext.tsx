'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

export type CartItem = {
  id: string;
  slug: string;
  nameEn: string;
  nameFr: string;
  nameAr: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = { items: CartItem[]; open: boolean };

type CartAction =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE_QTY'; id: string; qty: number }
  | { type: 'CLEAR' }
  | { type: 'TOGGLE' }
  | { type: 'OPEN' }
  | { type: 'CLOSE' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, quantity: i.quantity + action.item.quantity } : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.item] };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case 'UPDATE_QTY':
      if (action.qty < 1) return { ...state, items: state.items.filter((i) => i.id !== action.id) };
      return {
        ...state,
        items: state.items.map((i) => (i.id === action.id ? { ...i, quantity: action.qty } : i)),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    case 'TOGGLE':
      return { ...state, open: !state.open };
    case 'OPEN':
      return { ...state, open: true };
    case 'CLOSE':
      return { ...state, open: false };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  total: number;
  count: number;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], open: false }, (init) => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('alfassia_cart');
      if (saved) return { ...init, items: JSON.parse(saved) };
    }
    return init;
  });

  useEffect(() => {
    localStorage.setItem('alfassia_cart', JSON.stringify(state.items));
  }, [state.items]);

  const total = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = state.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
