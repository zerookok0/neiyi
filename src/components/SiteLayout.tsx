import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useCart } from '../store/cart';
import { CheckIcon } from './icons';

/** Scrolls to top on route change (preserves hash anchors). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

function CartToast() {
  const { toast } = useCart();
  return (
    <div
      className={`pointer-events-none fixed inset-x-0 z-[70] flex justify-center transition-all duration-400 ${
        toast ? 'bottom-8 opacity-100' : 'bottom-5 opacity-0'
      }`}
      aria-live="polite"
    >
      <div className="flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-ivory shadow-[0_16px_40px_-16px_rgba(31,28,26,0.6)]">
        <CheckIcon size={15} />
        <span className="font-sans text-[12px] tracking-[0.03em]">{toast}</span>
      </div>
    </div>
  );
}

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-sans focus:text-[12px] focus:text-ivory"
      >
        Bỏ qua điều hướng
      </a>
      <div className="hidden bg-ink py-2 text-center md:block">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-ivory/70">
          Miễn phí vận chuyển cho đơn từ 1.500.000₫ · Đổi size miễn phí trong 07 ngày
        </p>
      </div>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartToast />
    </div>
  );
}
