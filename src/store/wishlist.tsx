import { createContext, useCallback, useContext, type ReactNode } from 'react';
import { usePersistentState } from '../lib/usePersistentState';

type WishlistContextValue = {
  ids: string[];
  has: (productId: string) => boolean;
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
  count: number;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = usePersistentState<string[]>('velora:wishlist', []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id: string) =>
      setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev])),
    [setIds],
  );

  const remove = useCallback((id: string) => setIds((prev) => prev.filter((x) => x !== id)), [setIds]);

  return (
    <WishlistContext.Provider value={{ ids, has, toggle, remove, count: ids.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
