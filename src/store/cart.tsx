import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Product } from '../data/types';
import type { GarmentKind } from '../components/GarmentArt';
import { usePersistentState } from '../lib/usePersistentState';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE, COUPONS } from '../lib/format';

export type CartLine = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  subtitle: string;
  garment: GarmentKind;
  colorHex: string;
  price: number;
  colorId: string;
  colorName: string;
  size: string;
  qty: number;
  maxQty?: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  couponCode: string | null;
  couponError: string | null;
  addLine: (product: Product, colorId: string, size: string, qty?: number) => void;
  updateQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  toast: string | null;
  dismissToast: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = usePersistentState<CartLine[]>('velora:cart', []);
  const [couponCode, setCouponCode] = usePersistentState<string | null>('velora:coupon', null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const flash = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const addLine = useCallback(
    (product: Product, colorId: string, size: string, qty = 1) => {
      const color = product.colors.find((c) => c.id === colorId) ?? product.colors[0];
      const key = `${product.id}-${colorId}-${size}`;
      setLines((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing) {
          return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
        }
        return [
          ...prev,
          {
            key,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            subtitle: product.subtitle,
            garment: product.garment,
            colorHex: color.hex,
            price: product.price,
            colorId,
            colorName: color.name,
            size,
            qty,
          },
        ];
      });
      flash('Đã thêm vào giỏ hàng');
    },
    [flash, setLines],
  );

  const updateQty = useCallback(
    (key: string, qty: number) => {
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => l.key !== key)
          : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(qty, 99) } : l)),
      );
    },
    [setLines],
  );

  const removeLine = useCallback(
    (key: string) => setLines((prev) => prev.filter((l) => l.key !== key)),
    [setLines],
  );

  const clearCart = useCallback(() => {
    setLines([]);
    setCouponCode(null);
  }, [setLines, setCouponCode]);

  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.price * l.qty, 0), [lines]);
  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);

  const discount = useMemo(() => {
    if (!couponCode) return 0;
    const coupon = COUPONS[couponCode];
    if (!coupon) return 0;
    return coupon.type === 'percent'
      ? Math.round((subtotal * coupon.value) / 100)
      : Math.min(coupon.value, subtotal);
  }, [couponCode, subtotal]);

  const shippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal - discount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  }, [subtotal, discount]);

  const total = Math.max(0, subtotal - discount + shippingFee);

  const applyCoupon = useCallback(
    (raw: string) => {
      const code = raw.trim().toUpperCase();
      if (!code) {
        setCouponError('Vui lòng nhập mã giảm giá.');
        return false;
      }
      if (!COUPONS[code]) {
        setCouponError('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
        return false;
      }
      setCouponCode(code);
      setCouponError(null);
      flash('Đã áp dụng mã giảm giá');
      return true;
    },
    [flash, setCouponCode],
  );

  const removeCoupon = useCallback(() => {
    setCouponCode(null);
    setCouponError(null);
  }, [setCouponCode]);

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    discount,
    shippingFee,
    total,
    couponCode,
    couponError,
    addLine,
    updateQty,
    removeLine,
    clearCart,
    applyCoupon,
    removeCoupon,
    toast,
    dismissToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
