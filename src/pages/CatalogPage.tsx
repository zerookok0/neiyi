import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { PageTopBar, usePageTitle } from '../components/PageTopBar';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { ChevronDown, CloseIcon, FilterIcon, ArrowRight } from '../components/icons';
import { products, productsByCategory } from '../data/products';
import { categories, collections } from '../data/catalog';
import { cx, normalize } from '../lib/format';
import type { Audience } from '../data/types';

type SortKey = 'popular' | 'price-asc' | 'price-desc' | 'newest';

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'popular', label: 'Phổ biến' },
  { key: 'price-asc', label: 'Giá thấp đến cao' },
  { key: 'price-desc', label: 'Giá cao đến thấp' },
  { key: 'newest', label: 'Mới nhất' },
];

const SIZE_GROUPS = [
  { label: 'Size áo ngực', values: ['A70', 'A75', 'B75', 'B80', 'C80', 'C85'] },
  { label: 'Size nữ (quần & bộ)', values: ['S', 'M', 'L', 'XL'] },
  { label: 'Size nam', values: ['M', 'L', 'XL', 'XXL'] },
];

const PRICE_RANGES = [
  { id: 'all', label: 'Tất cả', min: 0, max: Infinity },
  { id: 'under-500', label: 'Dưới 500.000₫', min: 0, max: 500000 },
  { id: '500-1000', label: '500.000₫ – 1.000.000₫', min: 500000, max: 1000000 },
  { id: 'over-1000', label: 'Trên 1.000.000₫', min: 1000000, max: Infinity },
];

export function CatalogPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [sort, setSort] = useState<SortKey>('popular');
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [priceRange, setPriceRange] = useState('all');

  const activeCategory = categories.find((c) => c.slug === slug);
  usePageTitle(activeCategory ? activeCategory.name : 'Tất cả sản phẩm');

  const collectionFilter = searchParams.get('bo-suu-tap');
  const query = searchParams.get('q') ?? '';
  const base = activeCategory ? productsByCategory(activeCategory.id) : products;

  useEffect(() => {
    setSizes([]);
    setColors([]);
    setAudiences(activeCategory ? [activeCategory.audience] : []);
    setPriceRange('all');
    setSort('popular');
  }, [slug, activeCategory]);

  const allColors = useMemo(() => {
    const map = new Map<string, { id: string; name: string; hex: string }>();
    base.forEach((p) => p.colors.forEach((c) => map.set(c.id, c)));
    return Array.from(map.values());
  }, [base]);

  const filtered = useMemo(() => {
    const term = normalize(query.trim());
    const range = PRICE_RANGES.find((r) => r.id === priceRange) ?? PRICE_RANGES[0];

    let list = base.filter((p) => {
      if (collectionFilter && p.collectionId !== collectionFilter) return false;
      if (audiences.length && !audiences.includes(p.audience)) return false;
      if (term && !normalize(`${p.name} ${p.subtitle} ${p.description}`).includes(term)) return false;
      if (sizes.length && !sizes.some((s) => p.sizes.includes(s))) return false;
      if (colors.length && !colors.some((c) => p.colors.some((pc) => pc.id === c))) return false;
      if (p.price < range.min || p.price > range.max) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return Number(!!b.isNew) - Number(!!a.isNew) || b.rating - a.rating;
        default:
          return b.reviewCount - a.reviewCount;
      }
    });

    return list;
  }, [base, collectionFilter, query, sizes, colors, audiences, priceRange, sort]);

  const toggleIn = <T,>(arr: T[], value: T, set: (v: T[]) => void) =>
    set(arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value]);

  const activeFilterCount =
    sizes.length +
    colors.length +
    audiences.length +
    (priceRange !== 'all' ? 1 : 0) +
    (collectionFilter ? 1 : 0);

  const clearAll = () => {
    setSizes([]);
    setColors([]);
    setAudiences([]);
    setPriceRange('all');
    if (collectionFilter) {
      const next = new URLSearchParams(searchParams);
      next.delete('bo-suu-tap');
      setSearchParams(next);
    }
  };

  return (
    <>
      <PageTopBar backTo="/" title={activeCategory ? activeCategory.name : 'Tất cả sản phẩm'}>
        <div className="px-4 pb-0 md:px-8">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-3 pt-0.5 md:mx-0 md:px-0">
            <button
              type="button"
              onClick={() => setSortOpen((v) => !v)}
              className={sortOpen ? 'chip-active' : 'chip-idle'}
              aria-expanded={sortOpen}
            >
              {SORTS.find((s) => s.key === sort)?.label}
              <ChevronDown size={13} className={cx('transition-transform', sortOpen && 'rotate-180')} />
            </button>
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className={cx('chip-idle', activeFilterCount > 0 && 'border-ink/40 text-ink')}
            >
              Bộ lọc{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
              <FilterIcon size={14} />
            </button>
            <Link to="/danh-muc" className={!activeCategory ? 'chip-active' : 'chip-idle'}>
              Tất cả
            </Link>
            <Link to="/nu" className="chip-idle">
              Nữ
            </Link>
            <Link to="/nam" className="chip-idle">
              Nam
            </Link>
          </div>
        </div>
      </PageTopBar>

      {sortOpen && (
        <div className="sticky top-[114px] z-20 border-b border-ink/[0.07] bg-ivory/98 backdrop-blur-xl md:top-[154px]">
          <ul className="mx-auto max-w-[1180px] px-4 py-2 md:px-8">
            {SORTS.map((s) => (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => {
                    setSort(s.key);
                    setSortOpen(false);
                  }}
                  className={cx(
                    'flex w-full items-center justify-between py-2.5 text-left font-sans text-[13px]',
                    sort === s.key ? 'text-ink' : 'text-smoke',
                  )}
                >
                  {s.label}
                  {sort === s.key && <span className="h-1 w-1 rounded-full bg-ink" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-8 pt-4 md:px-8 md:pt-8">
        {activeCategory && (
          <div className="mb-5">
            <p className="eyebrow">
              {activeCategory.audience === 'men' ? 'Nam' : 'Nữ'} · {activeCategory.tagline}
            </p>
            <p className="mt-1.5 max-w-[440px] body-sm">{activeCategory.description}</p>
          </div>
        )}

        {collectionFilter && (
          <div className="mb-4 flex items-center gap-2">
            <span className="chip-active">
              {collections.find((c) => c.id === collectionFilter)?.name ?? 'Bộ sưu tập'}
              <button
                type="button"
                aria-label="Bỏ lọc bộ sưu tập"
                onClick={() => {
                  const next = new URLSearchParams(searchParams);
                  next.delete('bo-suu-tap');
                  setSearchParams(next);
                }}
              >
                <CloseIcon size={12} />
              </button>
            </span>
          </div>
        )}

        <p className="mb-4 font-sans text-[11px] tracking-[0.06em] text-smoke">
          {filtered.length} sản phẩm{query ? ` cho “${query}”` : ''}
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-[16px] border border-ink/10 bg-cream/40 px-6 py-14 text-center">
            <p className="font-serif text-[22px]">Chưa có sản phẩm phù hợp</p>
            <p className="mx-auto mt-2 max-w-[320px] body-sm">
              Bạn thử bỏ một vài bộ lọc, hoặc xem toàn bộ danh mục để tìm món đồ ưng ý nhé.
            </p>
            <button type="button" onClick={clearAll} className="btn-outline mt-6">
              Xoá bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5 md:gap-y-10 lg:grid-cols-4">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i, 6) * 55}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-[16px] border border-ink/[0.08] bg-cream/40 px-5 py-6 text-center">
          <p className="font-serif text-[20px]">Chưa chắc size nào vừa?</p>
          <p className="mx-auto mt-1.5 max-w-[360px] body-sm">
            Gọi 1900 2828 hoặc nhắn Zalo, VÉLORA sẽ tư vấn số đo và đổi size miễn phí lần đầu.
          </p>
        </div>
      </section>

      <FilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        sizes={sizes}
        colors={colors}
        audiences={audiences}
        allColors={allColors}
        priceRange={priceRange}
        collectionFilter={collectionFilter}
        onToggleSize={(v) => toggleIn(sizes, v, setSizes)}
        onToggleColor={(v) => toggleIn(colors, v, setColors)}
        onToggleAudience={(v) => toggleIn(audiences, v, setAudiences)}
        onPriceRange={setPriceRange}
        onCollection={(id) => {
          const next = new URLSearchParams(searchParams);
          if (collectionFilter === id) next.delete('bo-suu-tap');
          else next.set('bo-suu-tap', id);
          setSearchParams(next);
        }}
        onClear={clearAll}
        resultCount={filtered.length}
      />
    </>
  );
}

function FilterSheet({
  open,
  onClose,
  sizes,
  colors,
  audiences,
  allColors,
  priceRange,
  collectionFilter,
  onToggleSize,
  onToggleColor,
  onToggleAudience,
  onPriceRange,
  onCollection,
  onClear,
  resultCount,
}: {
  open: boolean;
  onClose: () => void;
  sizes: string[];
  colors: string[];
  audiences: Audience[];
  allColors: { id: string; name: string; hex: string }[];
  priceRange: string;
  collectionFilter: string | null;
  onToggleSize: (v: string) => void;
  onToggleColor: (v: string) => void;
  onToggleAudience: (v: Audience) => void;
  onPriceRange: (v: string) => void;
  onCollection: (id: string) => void;
  onClear: () => void;
  resultCount: number;
}) {
  return (
    <div
      className={cx(
        'fixed inset-0 z-[65] transition-opacity duration-300',
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-ink/35" onClick={onClose} />
      <div
        className={cx(
          'absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-[22px] bg-ivory transition-transform duration-500 ease-silk md:inset-y-0 md:left-auto md:right-0 md:w-[420px] md:max-h-none md:rounded-none',
          open ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-x-full md:translate-y-0',
        )}
        role="dialog"
        aria-label="Bộ lọc sản phẩm"
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="font-sans text-[13px] font-medium tracking-[0.04em]">Bộ lọc</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng bộ lọc"
            className="tap grid h-9 w-9 place-items-center rounded-full hover:bg-cream"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <section>
            <p className="field-label">Dành cho</p>
            <div className="flex flex-wrap gap-2">
              {(['women', 'men'] as Audience[]).map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => onToggleAudience(a)}
                  className={audiences.includes(a) ? 'chip-active' : 'chip-idle'}
                >
                  {a === 'women' ? 'Nữ' : 'Nam'}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <p className="field-label">Bộ sưu tập</p>
            <div className="flex flex-wrap gap-2">
              {collections.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onCollection(c.id)}
                  className={collectionFilter === c.id ? 'chip-active' : 'chip-idle'}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </section>

          {SIZE_GROUPS.map((g) => (
            <section key={g.label} className="mt-6">
              <p className="field-label">{g.label}</p>
              <div className="flex flex-wrap gap-2">
                {g.values.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => onToggleSize(s)}
                    className={cx(
                      'min-w-[52px] rounded-lg border px-3 py-2 font-sans text-[12px] transition-all duration-300',
                      sizes.includes(s)
                        ? 'border-ink bg-ink text-ivory'
                        : 'border-ink/10 text-ink/70 hover:border-ink/35',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-6">
            <p className="field-label">Màu sắc</p>
            <div className="flex flex-wrap gap-2.5">
              {allColors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onToggleColor(c.id)}
                  aria-label={c.name}
                  aria-pressed={colors.includes(c.id)}
                  className={cx(
                    'grid h-9 w-9 place-items-center rounded-full transition-all duration-300',
                    colors.includes(c.id)
                      ? 'ring-[1.5px] ring-ink ring-offset-2 ring-offset-ivory'
                      : 'ring-1 ring-ink/10',
                  )}
                  style={{ backgroundColor: c.hex }}
                >
                  {colors.includes(c.id) && <span className="h-1 w-1 rounded-full bg-ivory/80" />}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <p className="field-label">Khoảng giá</p>
            <div className="space-y-1">
              {PRICE_RANGES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onPriceRange(r.id)}
                  className="flex w-full items-center gap-3 py-2 text-left"
                >
                  <span
                    className={cx(
                      'grid h-[18px] w-[18px] place-items-center rounded-full border transition-colors',
                      priceRange === r.id ? 'border-ink' : 'border-ink/25',
                    )}
                  >
                    {priceRange === r.id && <span className="h-[9px] w-[9px] rounded-full bg-ink" />}
                  </span>
                  <span className="font-sans text-[12.5px] text-ink/80">{r.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="safe-bottom flex items-center gap-3 border-t border-ink/10 px-5 py-4">
          <button type="button" onClick={onClear} className="btn-ghost flex-1 border-ink/15">
            Xoá tất cả
          </button>
          <button type="button" onClick={onClose} className="btn-dark flex-[1.4]">
            Xem {resultCount} sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
}

export function CategoryIndex() {
  usePageTitle('Danh mục');
  const groups = [
    { key: 'women' as Audience, label: 'Nữ', list: categories.filter((c) => c.audience === 'women') },
    { key: 'men' as Audience, label: 'Nam', list: categories.filter((c) => c.audience === 'men') },
  ];

  return (
    <>
      <PageTopBar backTo="/" title="Danh mục" />
      <section className="mx-auto w-full max-w-[1180px] px-4 pt-6 md:px-8 md:pt-10">
        <h2 className="display-md">Tất cả danh mục</h2>
        <p className="mt-3 max-w-[440px] body-sm">
          Bắt đầu từ món đồ bạn cần nhất. Mỗi danh mục đều có hướng dẫn chọn size riêng.
        </p>

        {groups.map((g) => (
          <div key={g.key} className="mt-9">
            <div className="flex items-end justify-between">
              <h3 className="section-title">{g.label}</h3>
              <Link to={g.key === 'women' ? '/nu' : '/nam'} className="link-arrow">
                Xem bộ sưu tập <ArrowRight size={13} />
              </Link>
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {g.list.map((c, i) => (
                <Reveal key={c.id} delay={i * 50}>
                  <Link
                    to={`/danh-muc/${c.slug}`}
                    className="tap group flex items-center justify-between gap-2 rounded-[12px] border border-ink/[0.08] bg-cream/40 px-3.5 py-3"
                  >
                    <span>
                      <span className="block font-sans text-[12px] text-ink">{c.name}</span>
                      <span className="mt-0.5 block font-sans text-[10px] text-smoke">{c.tagline}</span>
                    </span>
                    <ArrowRight size={14} className="shrink-0 text-taupe" />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
