import { Product } from '@/cms-types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type CartItem = {
  product: Product
  quantity: number
}

type CartState = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  clearCart: () => void
  increaseQuantity: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  updateQuantity: (productId: number, newQuantity: number) => void // Added function
  setUserDetails: (id_client: string, id_agent: string, agentName: string, agentPrenom: string, clientName: string, clientPrenom: string, clientPoints: string) => void; // Added to the CartState
  id_client: string,
  id_agent: string,
  agentName: string,
  agentPrenom: string,
  clientName: string,
  clientPrenom: string,
  clientPoints: string,
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      id_client: "",
      id_agent: "",
      agentName: "",
      agentPrenom: "",
      clientName: "",
      clientPrenom: "",
      clientPoints: "",


      addItem: (product) =>
        set((state) => {
          return { items: [...state.items, { product, quantity: 1 }] }
        }),
      removeItem: (id: number) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.product.id !== id
          ),
        })),
      clearCart: () => set({ items: [] }),
      increaseQuantity: (productId: number) =>
        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item.product.id === productId) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
          return { items: updatedItems };
        }),
      decreaseQuantity: (productId: number) =>
        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item.product.id === productId) {
              return item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item;
            }
            return item;
          });
          return { items: updatedItems };
        }),
      updateQuantity: (productId: number, newQuantity: number) =>
        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item.product.id === productId) {
              return { ...item, quantity: newQuantity };
            }
            return item;
          });
          return { items: updatedItems};
        }),
      setUserDetails: (id_client: string, id_agent: string, agentName: string, agentPrenom: string, clientName: string, clientPrenom: string, clientPoints: string) =>
        set(state => ({
          ...state, id_client, id_agent, agentName, agentPrenom, clientName, clientPrenom, clientPoints
        })),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)