import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, createStorefrontCheckout } from '@/lib/shopify';

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  checkoutUrl: string | null;
  
  // Actions
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  createCheckout: () => Promise<string | null>;
  
  // Computed
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      checkoutUrl: null,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({ items: [...items, item] });
        }
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variantId !== variantId)
        });
      },

      clearCart: () => {
        set({ items: [], checkoutUrl: null });
      },

      createCheckout: async () => {
        const { items } = get();
        if (items.length === 0) return null;

        set({ isLoading: true });
        try {
          const checkoutUrl = await createStorefrontCheckout(items);
          set({ checkoutUrl, isLoading: false });
          return checkoutUrl;
        } catch (error) {
          console.error('Failed to create checkout:', error);
          set({ isLoading: false });
          return null;
        }
      },

      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 
          0
        );
      },
    }),
    {
      name: 'alojas-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
