/** Vietnam dong formatting: 1290000 -> "1.290.000₫" */
export const formatVND = (value: number) =>
  new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 0 }).format(value) + '₫';

export const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ');

export const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();

export const starsFor = (rating: number) => Math.round(rating * 2) / 2;

export const FREE_SHIPPING_THRESHOLD = 1500000;
export const SHIPPING_FEE = 35000;

export const COUPONS: Record<string, { type: 'percent' | 'fixed'; value: number; label: string }> = {
  VELORA10: { type: 'percent', value: 10, label: 'Giảm 10% cho đơn hàng đầu tiên' },
  CHAOMUNG: { type: 'fixed', value: 150000, label: 'Giảm 150.000₫ cho khách mới' },
};

export const cartLineTotal = (price: number, qty: number) => price * qty;
