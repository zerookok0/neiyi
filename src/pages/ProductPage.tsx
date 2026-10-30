import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PageTopBar, usePageTitle } from '../components/PageTopBar';
import { RatingStars } from '../components/RatingStars';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { GarmentArt } from '../components/GarmentArt';
import {
  ArrowRight,
  BagIcon,
  CheckIcon,
  ChevronDown,
  CloseIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  RefreshIcon,
  RulerIcon,
  ShieldIcon,
  TruckIcon,
} from '../components/icons';
import { findProduct, products } from '../data/products';
import { categories } from '../data/catalog';
import { cx, formatVND } from '../lib/format';
import { useCart } from '../store/cart';
import { useWishlist } from '../store/wishlist';

export function ProductPage() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const product = findProduct(slug);
  const { addLine } = useCart();
  const { has, toggle } = useWishlist();

  const [colorId, setColorId] = useState(product?.colors[0].id ?? '');
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('chat-lieu');

  usePageTitle(product?.name ?? 'Sản phẩm');

  const related = useMemo(
    () =>
      product
        ? products
            .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
            .concat(products.filter((p) => p.id !== product.id && p.audience === product.audience))
            .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
            .slice(0, 4)
        : [],
    [product],
  );

  if (!product) {
    return (
      <>
        <PageTopBar backTo="/danh-muc" title="Không tìm thấy sản phẩm" />
        <div className="mx-auto max-w-[560px] px-5 py-20 text-center">
          <h1 className="display-md">Sản phẩm không còn tồn tại</h1>
          <p className="mt-3 body-sm">Có thể sản phẩm đã được gỡ hoặc đường dẫn chưa đúng.</p>
          <Link to="/danh-muc" className="btn-dark mt-7">
            Xem tất cả sản phẩm
          </Link>
        </div>
      </>
    );
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const liked = has(product.id);
  const selectedColor = product.colors.find((c) => c.id === colorId) ?? product.colors[0];

  const handleAdd = (goToCart = false) => {
    if (!size) {
      setSizeError(true);
      document.getElementById('size-selector')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSizeError(false);
    addLine(product, colorId, size, qty);
    if (goToCart) navigate('/gio-hang');
  };

  const accordions = [
    {
      id: 'chat-lieu',
      title: 'Chất liệu & hướng dẫn giữ',
      content: (
        <div className="space-y-3">
          <ul className="space-y-1.5">
            {product.materials.map((m) => (
              <li key={m} className="flex gap-2.5 font-sans text-[12.5px] text-smoke">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-taupe" />
                {m}
              </li>
            ))}
          </ul>
          <ul className="space-y-1.5 border-t border-ink/[0.08] pt-3">
            {product.care.map((c) => (
              <li key={c} className="flex gap-2.5 font-sans text-[12.5px] text-smoke">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-taupe" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'do-ho-tro',
      title: 'Độ nâng đỡ & phom dáng',
      content: <p className="font-sans text-[12.5px] leading-relaxed text-smoke">{product.support}</p>,
    },
    {
      id: 'van-chuyen',
      title: 'Vận chuyển & đổi trả',
      content: (
        <ul className="space-y-2.5 font-sans text-[12.5px] leading-relaxed text-smoke">
          <li>Nội thành TP.HCM & Hà Nội: 1–2 ngày làm việc.</li>
          <li>Các tỉnh thành khác: 2–4 ngày làm việc.</li>
          <li>Miễn phí vận chuyển cho đơn từ 1.500.000₫.</li>
          <li>Đổi size miễn phí 1 lần trong 07 ngày, sản phẩm còn nguyên tem mác.</li>
        </ul>
      ),
    },
  ];

  return (
    <>
      <PageTopBar backTo={category ? `/danh-muc/${category.slug}` : '/danh-muc'} title={product.name}>
        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-label={liked ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
          aria-pressed={liked}
          className="tap grid h-9 w-9 place-items-center rounded-full hover:bg-cream"
        >
          <HeartIcon size={19} filled={liked} className={liked ? 'text-rose' : 'text-ink'} />
        </button>
        <Link
          to="/gio-hang"
          aria-label="Giỏ hàng"
          className="tap grid h-9 w-9 place-items-center rounded-full hover:bg-cream"
        >
          <BagIcon size={19} />
        </Link>
      </PageTopBar>

      <div className="mx-auto w-full max-w-[1180px] md:grid md:grid-cols-2 md:gap-12 md:px-8 md:pt-8">
        {/* Gallery: colour variants of the drawn garment, plus one lifestyle frame */}
        <div className="md:sticky md:top-[170px] md:self-start">
          <div className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto md:block md:space-y-3">
            {product.colors.map((c) => (
              <div key={c.id} className="w-full shrink-0 snap-center">
                <div className="media aspect-[4/5] md:rounded-[18px]">
                  <GarmentArt
                    kind={product.garment}
                    color={c.hex}
                    label={`${c.name} · ${product.subtitle.split(' · ')[0]}`}
                    className="h-full w-full"
                  />
                </div>
              </div>
            ))}
            {product.lifestyle && (
              <div className="w-full shrink-0 snap-center">
                <div className="media aspect-[4/5] md:rounded-[18px]">
                  <img
                    src={product.lifestyle}
                    alt={`${product.name} — ảnh phong cách`}
                    className="editorial-img h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
          <p className="mt-2 px-5 font-sans text-[10px] uppercase tracking-[0.14em] text-taupe md:px-0">
            {product.colors.length} màu · {product.sizes.length} size
          </p>
        </div>

        <div className="px-5 pt-6 md:px-0 md:pt-0">
          <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.14em] text-taupe">
            <Link to="/danh-muc" className="hover:text-ink">
              Cửa hàng
            </Link>
            <span>/</span>
            <Link to={`/danh-muc/${category?.slug}`} className="hover:text-ink">
              {category?.name}
            </Link>
          </div>

          <h1 className="mt-3 font-serif text-[26px] font-light leading-tight md:text-[32px]">
            {product.name}
          </h1>
          <p className="mt-1 font-sans text-[12.5px] text-smoke">{product.subtitle}</p>

          <div className="mt-3 flex items-center gap-2.5">
            <RatingStars rating={product.rating} />
            <span className="font-sans text-[11.5px] text-smoke">
              {product.rating.toFixed(1)} · {product.reviewCount} đánh giá
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-sans text-[21px] font-medium tracking-[0.01em]">
              {formatVND(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="font-sans text-[13px] text-smoke/60 line-through">
                {formatVND(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="mt-4 body-sm">{product.description}</p>

          {/* Colour */}
          <div className="mt-7">
            <div className="flex items-baseline justify-between">
              <p className="field-label mb-0">Màu sắc</p>
              <p className="font-sans text-[11.5px] text-ink/70">{selectedColor.name}</p>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorId(c.id)}
                  aria-label={c.name}
                  aria-pressed={colorId === c.id}
                  className={cx(
                    'grid h-9 w-9 place-items-center rounded-full transition-all duration-300',
                    colorId === c.id
                      ? 'ring-[1.5px] ring-ink ring-offset-[3px] ring-offset-ivory'
                      : 'ring-1 ring-ink/15 hover:ring-ink/40',
                  )}
                  style={{ backgroundColor: c.hex }}
                >
                  {colorId === c.id && <CheckIcon size={13} className="text-ivory/90 drop-shadow" />}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-6" id="size-selector">
            <div className="flex items-baseline justify-between">
              <p className="field-label mb-0">Kích thước</p>
              <button
                type="button"
                onClick={() => setGuideOpen(true)}
                className="inline-flex items-center gap-1.5 font-sans text-[11px] text-mocha underline decoration-ink/20 underline-offset-4 hover:text-ink"
              >
                <RulerIcon size={14} /> Hướng dẫn chọn size
              </button>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  aria-pressed={size === s}
                  className={cx(
                    'min-w-[54px] rounded-lg border px-3 py-2.5 font-sans text-[12px] transition-all duration-300',
                    size === s
                      ? 'border-ink bg-ink text-ivory'
                      : 'border-ink/15 text-ink/75 hover:border-ink/45',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="mt-2 font-sans text-[11.5px] text-[#B4533F]">
                Vui lòng chọn kích thước trước khi thêm vào giỏ.
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="mt-6 flex items-center justify-between">
            <p className="field-label mb-0">Số lượng</p>
            <div className="flex items-center gap-1 rounded-full border border-ink/15 px-1">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Giảm số lượng"
                className="tap grid h-8 w-8 place-items-center rounded-full hover:bg-cream"
              >
                <MinusIcon size={14} />
              </button>
              <span className="w-7 text-center font-sans text-[13px]">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                aria-label="Tăng số lượng"
                className="tap grid h-8 w-8 place-items-center rounded-full hover:bg-cream"
              >
                <PlusIcon size={14} />
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <button type="button" onClick={() => handleAdd(false)} className="btn-dark w-full">
              <BagIcon size={16} />
              Thêm vào giỏ hàng
            </button>
            <button type="button" onClick={() => handleAdd(true)} className="btn-outline w-full">
              Mua ngay
            </button>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-3 rounded-[14px] bg-cream/55 px-4 py-4 sm:grid-cols-3">
            {[
              { icon: TruckIcon, t: 'Giao 1–2 ngày', d: 'Nội thành TP.HCM & Hà Nội' },
              { icon: RefreshIcon, t: 'Đổi size miễn phí', d: 'Trong 07 ngày' },
              { icon: ShieldIcon, t: 'Thanh toán an toàn', d: 'COD hoặc chuyển khoản' },
            ].map((s) => (
              <li key={s.t} className="flex items-start gap-2.5">
                <s.icon size={17} className="mt-0.5 shrink-0 text-mocha" />
                <div>
                  <p className="font-sans text-[11.5px] font-medium text-ink">{s.t}</p>
                  <p className="font-sans text-[10.5px] text-smoke">{s.d}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-7 border-t border-ink/[0.09]">
            {accordions.map((a) => {
              const open = openAccordion === a.id;
              return (
                <div key={a.id} className="border-b border-ink/[0.09]">
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(open ? null : a.id)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between py-4 text-left"
                  >
                    <span className="font-sans text-[12.5px] tracking-[0.03em] text-ink">{a.title}</span>
                    <ChevronDown
                      size={16}
                      className={cx('text-taupe transition-transform duration-400', open && 'rotate-180')}
                    />
                  </button>
                  <div
                    className={cx(
                      'grid transition-all duration-400 ease-silk',
                      open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-4">{a.content}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <section className="mx-auto mt-14 w-full max-w-[1180px] px-4 pb-6 md:mt-20 md:px-8">
        <Reveal>
          <div className="flex items-end justify-between">
            <h2 className="section-title">Có thể bạn cũng thích</h2>
            <Link to={`/danh-muc/${category?.slug}`} className="link-arrow shrink-0">
              Xem thêm <ArrowRight size={13} />
            </Link>
          </div>
        </Reveal>
        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-7 md:grid-cols-4 md:gap-5">
          {related.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {guideOpen && (
        <SizeGuideModal audience={product.audience} onClose={() => setGuideOpen(false)} />
      )}
    </>
  );
}

function SizeGuideModal({ audience, onClose }: { audience: string; onClose: () => void }) {
  const womenRows = [
    ['A70', '63 – 67 cm', '75 – 79 cm'],
    ['A75', '68 – 72 cm', '80 – 84 cm'],
    ['B75', '68 – 72 cm', '85 – 89 cm'],
    ['B80', '73 – 77 cm', '90 – 94 cm'],
    ['C80', '73 – 77 cm', '95 – 99 cm'],
    ['C85', '78 – 82 cm', '100 – 104 cm'],
  ];
  const menRows = [
    ['M', '76 – 81 cm', '94 – 99 cm'],
    ['L', '81 – 86 cm', '99 – 104 cm'],
    ['XL', '86 – 94 cm', '104 – 111 cm'],
    ['XXL', '94 – 102 cm', '111 – 118 cm'],
  ];
  const rows = audience === 'men' ? menRows : womenRows;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center md:items-center"
      role="dialog"
      aria-label="Hướng dẫn chọn size"
    >
      <div className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]" onClick={onClose} />
      <div className="safe-bottom relative max-h-[88vh] w-full overflow-y-auto rounded-t-[22px] bg-ivory px-5 py-6 md:max-w-[560px] md:rounded-[20px] md:px-8 md:py-8">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="eyebrow">Bảng size</p>
            <h2 className="mt-1.5 font-serif text-[24px] font-light">Hướng dẫn chọn size</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="tap grid h-9 w-9 place-items-center rounded-full hover:bg-cream"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <p className="body-sm">
          Dùng thước dây mềm đo sát cơ thể, không siết chặt. Nếu số đo nằm giữa hai size, nên chọn size
          lớn hơn để thoải mái hơn.
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[360px] border-collapse text-left">
            <thead>
              <tr className="border-b border-ink/15">
                <th className="py-2.5 font-sans text-[10.5px] uppercase tracking-[0.1em] text-mocha">Size</th>
                <th className="py-2.5 font-sans text-[10.5px] uppercase tracking-[0.1em] text-mocha">
                  {audience === 'men' ? 'Vòng eo' : 'Vòng chân ngực'}
                </th>
                <th className="py-2.5 font-sans text-[10.5px] uppercase tracking-[0.1em] text-mocha">
                  {audience === 'men' ? 'Vòng hông' : 'Vòng đỉnh ngực'}
                </th>
              </tr>
            </thead>
            <tbody className="font-sans text-[12.5px]">
              {rows.map((row) => (
                <tr key={row[0]} className="border-b border-ink/[0.07]">
                  <td className="py-2.5 font-medium text-ink">{row[0]}</td>
                  <td className="py-2.5 text-smoke">{row[1]}</td>
                  <td className="py-2.5 text-smoke">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 rounded-[12px] bg-cream/60 px-4 py-3.5">
          <p className="font-sans text-[12px] font-medium text-ink">
            {audience === 'men' ? 'Quần lót & đồ mặc nhà nam' : 'Quần lót & bộ mặc nhà nữ'}
          </p>
          <p className="mt-1 font-sans text-[11.5px] leading-relaxed text-smoke">
            {audience === 'men'
              ? 'M: 55–65 kg · L: 65–75 kg · XL: 75–85 kg · XXL: 85–95 kg.'
              : 'S: 45–52 kg · M: 52–60 kg · L: 60–68 kg · XL: 68–78 kg.'}{' '}
            Vòng eo và vòng hông là hai số đo quan trọng nhất khi chọn.
          </p>
        </div>

        <button type="button" onClick={onClose} className="btn-dark mt-6 w-full">
          Đã hiểu
        </button>
      </div>
    </div>
  );
}
