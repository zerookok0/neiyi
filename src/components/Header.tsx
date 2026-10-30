import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Wordmark } from './Wordmark';
import { BagIcon, MenuIcon, SearchIcon, CloseIcon, ArrowRight, HeartIcon } from './icons';
import { useCart } from '../store/cart';
import { useWishlist } from '../store/wishlist';
import { cx, normalize } from '../lib/format';
import { products } from '../data/products';
import { categories } from '../data/catalog';

const NAV_LINKS = [
  { to: '/danh-muc', label: 'Tất cả' },
  { to: '/nu', label: 'Nữ' },
  { to: '/nam', label: 'Nam' },
  { to: '/cau-chuyen', label: 'Câu chuyện' },
  { to: '/lien-he', label: 'Liên hệ' },
];

export function Header() {
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Over the hero the header floats over imagery; elsewhere it is a solid bar.
  const transparent = isHome && !scrolled;
  const iconTone = transparent ? 'text-ivory' : 'text-ink';

  return (
    <>
      <header
        className={cx(
          'inset-x-0 top-0 z-40 transition-all duration-500 ease-silk',
          transparent
            ? 'absolute bg-transparent md:top-[33px]'
            : 'fixed border-b border-ink/[0.07] bg-ivory/92 backdrop-blur-xl',
        )}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="mx-auto flex h-[60px] w-full max-w-[1180px] items-center justify-between px-5 md:h-[68px] md:px-8">
          <div className="flex items-center gap-5">
            <Wordmark tone={transparent ? 'ivory' : 'ink'} className="text-[15px] md:text-[16px]" />
            <nav className="hidden items-center gap-5 md:flex" aria-label="Điều hướng chính">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cx(
                    'font-sans text-[11px] uppercase tracking-wide2 transition-colors duration-300',
                    transparent ? 'text-ivory/80 hover:text-ivory' : 'text-ink/65 hover:text-ink',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Tìm kiếm sản phẩm"
              className={cx('tap grid h-10 w-10 place-items-center rounded-full transition-colors', iconTone)}
            >
              <SearchIcon size={19} />
            </button>
            <Link
              to="/yeu-thich"
              aria-label={`Yêu thích${wishCount > 0 ? `, ${wishCount} sản phẩm` : ''}`}
              className={cx('tap relative hidden h-10 w-10 place-items-center rounded-full transition-colors sm:grid', iconTone)}
            >
              <HeartIcon size={19} />
              {wishCount > 0 && (
                <span className="absolute right-1 top-1.5 h-1.5 w-1.5 rounded-full bg-rose" />
              )}
            </Link>
            <Link
              to="/gio-hang"
              aria-label={`Giỏ hàng${count > 0 ? `, ${count} sản phẩm` : ''}`}
              className={cx('tap relative grid h-10 w-10 place-items-center rounded-full transition-colors', iconTone)}
            >
              <BagIcon size={19} />
              {count > 0 && (
                <span className="absolute right-1 top-1 grid h-[15px] min-w-[15px] place-items-center rounded-full bg-rose px-1 font-sans text-[9px] font-medium leading-none text-ivory">
                  {count}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Mở menu"
              className={cx('tap grid h-10 w-10 place-items-center rounded-full transition-colors', iconTone)}
            >
              <MenuIcon size={20} />
            </button>
          </div>
        </div>
      </header>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchSheet open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function MenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const women = categories.filter((c) => c.audience === 'women');
  const men = categories.filter((c) => c.audience === 'men');

  return (
    <div
      className={cx(
        'fixed inset-0 z-[60] transition-all duration-400',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      <div
        className={cx(
          'absolute inset-0 bg-ink/35 transition-opacity duration-400',
          open ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />
      <aside
        className={cx(
          'absolute inset-y-0 right-0 flex w-[88%] max-w-[400px] flex-col bg-ivory transition-transform duration-500 ease-silk',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <Wordmark className="text-[14px]" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng menu"
            className="tap grid h-9 w-9 place-items-center rounded-full hover:bg-cream"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-6">
          {[
            { title: 'Nữ', items: women },
            { title: 'Nam', items: men },
          ].map((group) => (
            <div key={group.title} className="mb-6">
              <p className="eyebrow mb-3">{group.title}</p>
              <ul className="space-y-0.5">
                {group.items.map((c) => (
                  <li key={c.id}>
                    <Link
                      to={`/danh-muc/${c.slug}`}
                      onClick={onClose}
                      className="group flex items-center justify-between py-2"
                    >
                      <span className="font-serif text-[20px] font-light">{c.name}</span>
                      <ArrowRight
                        size={16}
                        className="text-taupe transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="my-6 h-px bg-ink/10" />

          <ul className="space-y-3.5">
            {[
              { to: '/danh-muc', label: 'Tất cả sản phẩm' },
              { to: '/cau-chuyen', label: 'Câu chuyện VÉLORA' },
              { to: '/yeu-thich', label: 'Sản phẩm yêu thích' },
              { to: '/tai-khoan', label: 'Tài khoản của tôi' },
              { to: '/lien-he', label: 'Liên hệ & hỗ trợ' },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={onClose}
                  className="font-sans text-[13px] tracking-[0.04em] text-ink/75 hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-ink/10 bg-cream/60 px-6 py-5">
          <p className="body-sm">
            Hotline <span className="text-ink">1900 2828</span> · 9:00 – 21:00 hằng ngày
          </p>
          <p className="mt-1 body-sm">85 Lý Tự Trọng, Quận 1, TP.HCM</p>
        </div>
      </aside>
    </div>
  );
}

function SearchSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQ('');
      window.setTimeout(() => inputRef.current?.focus(), 260);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const term = normalize(q.trim());
  const results = term
    ? products
        .filter(
          (p) =>
            normalize(p.name).includes(term) ||
            normalize(p.subtitle).includes(term) ||
            normalize(p.description).includes(term),
        )
        .slice(0, 4)
    : [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/danh-muc?q=${encodeURIComponent(q.trim())}`);
    onClose();
  };

  return (
    <div
      className={cx(
        'fixed inset-0 z-[60] transition-opacity duration-300',
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-ink/35" onClick={onClose} />
      <div
        className={cx(
          'absolute inset-x-0 top-0 bg-ivory transition-transform duration-500 ease-silk',
          open ? 'translate-y-0' : '-translate-y-full',
        )}
        role="dialog"
        aria-label="Tìm kiếm"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="mx-auto w-full max-w-[820px] px-5 py-5 md:px-8 md:py-8">
          <div className="mb-4 flex items-center justify-between md:mb-6">
            <span className="eyebrow">Tìm kiếm</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng tìm kiếm"
              className="tap grid h-9 w-9 place-items-center rounded-full hover:bg-cream"
            >
              <CloseIcon size={18} />
            </button>
          </div>

          <form onSubmit={submit} className="flex items-center gap-3 border-b border-ink/20 pb-3">
            <SearchIcon size={20} className="shrink-0 text-taupe" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Bạn đang tìm gì? Ví dụ: trunk cotton nam"
              aria-label="Nhập từ khoá tìm kiếm"
              className="w-full bg-transparent font-serif text-[19px] font-light outline-none placeholder:font-sans placeholder:text-[13px] placeholder:text-smoke/60 md:text-[22px]"
            />
            <button type="submit" className="shrink-0 text-ink/60 hover:text-ink" aria-label="Tìm">
              <ArrowRight size={19} />
            </button>
          </form>

          {results.length > 0 && (
            <ul className="mt-5 divide-y divide-ink/[0.08]">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/san-pham/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 py-3"
                  >
                    <span
                      className="h-11 w-11 shrink-0 rounded-md ring-1 ring-ink/10"
                      style={{ backgroundColor: p.colors[0].hex }}
                    />
                    <span className="flex-1">
                      <span className="block font-sans text-[13px] text-ink">{p.name}</span>
                      <span className="block font-sans text-[11.5px] text-smoke">{p.subtitle}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {term && results.length === 0 && (
            <p className="mt-6 body-sm">
              Không tìm thấy sản phẩm phù hợp cho “{q}”. Bạn thử “áo ngực”, “trunk”, “cotton” hoặc
              “đồ mặc nhà” nhé.
            </p>
          )}

          {!term && (
            <div className="mt-6">
              <p className="eyebrow mb-3">Gợi ý cho bạn</p>
              <div className="flex flex-wrap gap-2">
                {['Áo ngực', 'Trunk nam', 'Quần lót seamless', 'Áo lót cotton', 'Đồ mặc nhà'].map((s) => (
                  <button key={s} type="button" onClick={() => setQ(s)} className="chip-idle">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
