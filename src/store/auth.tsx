import { createContext, useCallback, useContext, type ReactNode } from 'react';
import { usePersistentState } from '../lib/usePersistentState';
import type { CartLine } from './cart';

export type Address = {
  id: string;
  label: string;
  name: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  isDefault: boolean;
};

export type Order = {
  id: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered';
  lines: CartLine[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  address: Address;
};

export type User = {
  name: string;
  email: string;
  phone: string;
};

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => { ok: boolean; message?: string };
  register: (name: string, email: string, phone: string, password: string) => { ok: boolean; message?: string };
  logout: () => void;
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id' | 'isDefault'> & { isDefault?: boolean }) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  orders: Order[];
  placeOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_PASSWORD = 'velora123';

export const ORDER_STATUS_LABEL: Record<Order['status'], string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao hàng',
  delivered: 'Đã giao',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = usePersistentState<User | null>('velora:user', null);
  const [addresses, setAddresses] = usePersistentState<Address[]>('velora:addresses', []);
  const [orders, setOrders] = usePersistentState<Order[]>('velora:orders', []);

  const login = useCallback(
    (email: string, password: string) => {
      if (!email.trim() || !password.trim()) {
        return { ok: false, message: 'Vui lòng nhập đầy đủ email và mật khẩu.' };
      }
      if (password !== DEMO_PASSWORD) {
        return {
          ok: false,
          message: 'Mật khẩu chưa đúng. Bản demo dùng mật khẩu: velora123',
        };
      }
      const nameFromEmail = email
        .split('@')[0]
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      setUser({ name: nameFromEmail, email, phone: '' });
      return { ok: true };
    },
    [setUser],
  );

  const register = useCallback(
    (name: string, email: string, phone: string, password: string) => {
      if (!name.trim() || !email.trim() || !password.trim()) {
        return { ok: false, message: 'Vui lòng điền họ tên, email và mật khẩu.' };
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { ok: false, message: 'Email chưa đúng định dạng.' };
      }
      if (password.length < 6) {
        return { ok: false, message: 'Mật khẩu cần tối thiểu 6 ký tự.' };
      }
      setUser({ name, email, phone });
      return { ok: true };
    },
    [setUser],
  );

  const logout = useCallback(() => setUser(null), [setUser]);

  const addAddress = useCallback(
    (address: Omit<Address, 'id' | 'isDefault'> & { isDefault?: boolean }) => {
      const id = `addr-${Date.now()}`;
      setAddresses((prev) => {
        const makeDefault = address.isDefault || prev.length === 0;
        const next = makeDefault ? prev.map((a) => ({ ...a, isDefault: false })) : prev;
        return [...next, { ...address, id, isDefault: makeDefault }];
      });
    },
    [setAddresses],
  );

  const removeAddress = useCallback(
    (id: string) => setAddresses((prev) => prev.filter((a) => a.id !== id)),
    [setAddresses],
  );

  const setDefaultAddress = useCallback(
    (id: string) =>
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id }))),
    [setAddresses],
  );

  const placeOrder = useCallback(
    (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
      const full: Order = {
        ...order,
        id: `VL${Date.now().toString().slice(-8)}`,
        createdAt: new Date().toISOString(),
        status: 'pending',
      };
      setOrders((prev) => [full, ...prev]);
      return full;
    },
    [setOrders],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        addresses,
        addAddress,
        removeAddress,
        setDefaultAddress,
        orders,
        placeOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export const DEMO_ACCOUNT = { email: 'minhthu@velora.vn', password: DEMO_PASSWORD };
export const DEFAULT_DEMO_HINT = DEMO_PASSWORD;
