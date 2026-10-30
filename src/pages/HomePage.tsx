import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { ProductCard } from '../components/ProductCard';
import { RatingStars } from '../components/RatingStars';
import { GarmentArt } from '../components/GarmentArt';
import {
  ArrowRight,
  BraGlyph,
  PantyGlyph,
  HomewearGlyph,
  ShapewearGlyph,
  LeafIcon,
  RefreshIcon,
  ShieldIcon,
} from '../components/icons';
import { Wordmark } from '../components/Wordmark';
import { usePageTitle } from '../components/PageTopBar';
import { products } from '../data/products';
import { categories, collections, benefits, testimonials } from '../data/catalog';
import { IMG } from '../data/types';
import { formatVND, cx } from '../lib/format';
import type { Audience } from '../data/types';

const HERO_SLIDES = [
  {
    image: IMG.mood1,
    eyebrow: 'Bộ sưu tập Thu Đông 2025',
    title: 'Vẻ đẹp bắt đầu\n từ cảm giác.',
    text: 'Dịu dàng trên da, tự tin trong từng khoảnh khắc.',
  },
  {
    image: IMG.mood3,
    eyebrow: 'Dành cho nữ',
    title: 'Mặc như\n không mặc.',
    text: 'Áo ngực không gọng, quần lót seamless, phom theo số đo người Việt.',
  },
  {
    image: IMG.mood6,
    eyebrow: 'Dành cho nam',
    title: 'Thoáng mát\n cả ngày dài.',
    text: 'Trunk túi nâng đỡ, áo lót cotton giữ phom — dòng Daily Motion.',
  },
];

export function HomePage() {
  usePageTitle('Trang chủ');
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <>
      <Hero />
      <AudienceSplit />
      <CategoryStrip />
      <CollectionFeature />
      <ProductRow
        eyebrow="Được yêu thích nhất"
        title="Bán chạy tại VÉLORA"
        items={bestSellers}
        link="/danh-muc"
      />
      <Benefits />
      <EditorialCampaign />
      <ProductRow
        eyebrow="Vừa lên kệ"
        title="Sản phẩm mới"
        items={newArrivals}
        link="/danh-muc"
      />
      <Philosophy />
      <Testimonials />
      <Newsletter />
    </>
  );
}

function Hero() {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), 6500);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  const slide = HERO_SLIDES[index];

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink">
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.image}
          className={cx(
            'absolute inset-0 transition-opacity duration-[1400ms] ease-silk',
            i === index ? 'opacity-100' : 'opacity-0',
          )}
        >
          <img
            src={s.image}
            alt={s.eyebrow}
            className="editorial-img h-full w-full object-cover"
            style={{ objectPosition: '50% 32%' }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/30" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_100%,rgba(31,28,26,0.55),transparent_62%)]" />

      <div className="relative flex h-full flex-col justify-end px-6 pb-24 pt-24 text-ivory md:justify-center md:pb-24 md:pl-[7vw]">
        <div className="max-w-[540px]">
          <p key={`e-${index}`} className="animate-fadeIn font-sans text-[10px] uppercase tracking-wide3 text-ivory/70">
            {slide.eyebrow}
          </p>
          <h1 key={`t-${index}`} className="display-xl mt-4 whitespace-pre-line animate-riseIn text-ivory">
            {slide.title}
          </h1>
          <p
            key={`s-${index}`}
            className="mt-5 max-w-[340px] animate-riseIn font-sans text-[13.5px] font-light leading-relaxed text-ivory/78"
          >
            {slide.text}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/nu" className="btn-light group">
              Bộ sưu tập Nữ
              <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <Link to="/nam" className="btn btn border border-ivory/40 text-ivory hover:bg-ivory hover:text-ink">
              Bộ sưu tập Nam
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[26px] flex items-center justify-between px-6 md:bottom-9 md:px-[7vw]">
        <div className="flex items-center gap-3 font-sans text-[10.5px] tracking-[0.14em] text-ivory/70">
          <span className="text-ivory">0{index + 1}</span>
          <span className="h-px w-10 bg-ivory/35" />
          <span>0{HERO_SLIDES.length}</span>
        </div>
        <div className="flex gap-1.5">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Chuyển đến ảnh ${i + 1}`}
              className={cx(
                'h-[2px] transition-all duration-500',
                i === index ? 'w-8 bg-ivory' : 'w-4 bg-ivory/40',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceSplit() {
  const cards: { key: Audience; title: string; copy: string; to: string; garment: 'bra' | 'trunk' }[] = [
    {
      key: 'women',
      title: 'Nữ',
      copy: 'Áo ngực, quần lót và đồ mặc nhà — mềm trên da, đúng phom.',
      to: '/nu',
      garment: 'bra',
    },
    {
      key: 'men',
      title: 'Nam',
      copy: 'Trunk, boxer brief, áo lót và đồ mặc nhà — thoáng mát, giữ phom.',
      to: '/nam',
      garment: 'trunk',
    },
  ];

  return (
    <section className="mx-auto -mt-px w-full max-w-[1180px] px-4 pt-10 md:px-8 md:pt-14">
      <div className="grid grid-cols-2 gap-3 md:gap-5">
        {cards.map((c, i) => (
          <Reveal key={c.key} delay={i * 80}>
            <Link
              to={c.to}
              className="tap group flex h-full flex-col overflow-hidden rounded-[18px] border border-ink/[0.08] bg-cream/45"
            >
              <div className="aspect-[4/3] overflow-hidden md:aspect-[16/10]">
                <div className="h-full w-full transition-transform duration-700 ease-silk group-hover:scale-[1.04]">
                  <GarmentArt
                    kind={c.garment}
                    color={c.key === 'women' ? '#D9BDAE' : '#3A3B3D'}
                    className="h-full w-full"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between p-4 md:p-6">
                <div>
                  <p className="eyebrow">{c.key === 'women' ? 'Women' : 'Men'}</p>
                  <h2 className="display-md mt-2">{c.title}</h2>
                  <p className="mt-2 font-sans text-[11.5px] leading-relaxed text-smoke md:text-[12.5px]">
                    {c.copy}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-[10.5px] uppercase tracking-wide2 text-ink/70 group-hover:text-ink">
                  Xem bộ sưu tập <ArrowRight size={13} className="transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const catGlyph = {
  bra: BraGlyph,
  bralette: BraGlyph,
  camisole: HomewearGlyph,
  panty: PantyGlyph,
  brief: PantyGlyph,
  boxer: PantyGlyph,
  trunk: PantyGlyph,
  pajama: HomewearGlyph,
  shapewear: ShapewearGlyph,
  vest: BraGlyph,
} as const;

function CategoryStrip() {
  const featured = [
    categories.find((c) => c.id === 'ao-nguc')!,
    categories.find((c) => c.id === 'quan-lot-nu')!,
    categories.find((c) => c.id === 'quan-lot-nam')!,
    categories.find((c) => c.id === 'ao-lot-nam')!,
    categories.find((c) => c.id === 'do-mac-nha-nu')!,
  ];

  return (
    <section className="mx-auto w-full max-w-[1180px] px-4 pt-10 md:px-8 md:pt-14">
      <Reveal>
        <div className="flex items-end justify-between px-1">
          <h2 className="font-sans text-[12px] uppercase tracking-wide2 text-ink/70">Danh mục</h2>
          <Link to="/danh-muc-tat-ca" className="link-arrow">
            Xem tất cả <ArrowRight size={13} />
          </Link>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <ul className="mt-5 grid grid-cols-5 gap-2 md:gap-4">
          {featured.map((c) => {
            const Glyph = catGlyph[c.garment] ?? BraGlyph;
            return (
              <li key={c.id}>
                <Link to={`/danh-muc/${c.slug}`} className="tap group flex flex-col items-center gap-2.5">
                  <span className="grid aspect-square w-full max-w-[84px] place-items-center rounded-full border border-ink/10 bg-cream/60 text-mocha transition-all duration-500 ease-silk group-hover:border-ink/25 group-hover:bg-cream">
                    <Glyph size={24} />
                  </span>
                  <span className="text-center font-sans text-[9.5px] leading-tight tracking-[0.02em] text-ink/75 group-hover:text-ink md:text-[10.5px]">
                    {c.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}

function CollectionFeature() {
  return (
    <section className="mx-auto mt-12 w-full max-w-[1180px] px-4 md:mt-20 md:px-8">
      <Reveal>
        <div className="overflow-hidden rounded-[20px] bg-cream/70 md:grid md:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-6 py-9 md:order-1 md:px-12 md:py-14">
            <p className="eyebrow">Bộ sưu tập mới</p>
            <h2 className="display-lg mt-4 whitespace-pre-line">{'Tự tin là một dạng\nquyến rũ.'}</h2>
            <p className="mt-4 max-w-[340px] body-sm">
              Thiết kế tinh tế cho cả nữ và nam. Chất liệu mềm mại như làn da thứ hai, để bạn cảm thấy
              dễ chịu từ sáng đến tối.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <Link to="/nu" className="btn-outline group">
                Dành cho nữ
              </Link>
              <Link to="/nam" className="btn-outline group">
                Dành cho nam
              </Link>
            </div>
          </div>
          <div className="media order-1 aspect-[4/3] md:order-2 md:aspect-auto md:h-full">
            <img src={IMG.mood3} alt="Bộ sưu tập Thu Đông 2025" className="editorial-img" loading="lazy" />
          </div>
        </div>
      </Reveal>

      <div className="mt-3 grid grid-cols-2 gap-3 md:mt-4 md:grid-cols-4 md:gap-4">
        {collections.map((col, i) => (
          <Reveal key={col.id} delay={i * 70}>
            <Link
              to={`/danh-muc?bo-suu-tap=${col.id}`}
              className="tap group relative block overflow-hidden rounded-[14px] border border-ink/[0.08] bg-cream/50"
            >
              <div className="aspect-[4/3]">
                <div className="h-full w-full transition-transform duration-700 ease-silk group-hover:scale-[1.04]">
                  <GarmentArt
                    kind={col.id === 'daily-motion' ? 'trunk' : col.id === 'modal-premium' ? 'brief' : 'bra'}
                    color={
                      col.id === 'thu-dong-2025'
                        ? '#8C6E5A'
                        : col.id === 'daily-motion'
                          ? '#2E3A4B'
                          : col.id === 'modal-premium'
                            ? '#9A9793'
                            : '#E3C9B7'
                    }
                    className="h-full w-full"
                  />
                </div>
              </div>
              <div className="p-3.5">
                <p className="font-sans text-[8.5px] uppercase tracking-[0.16em] text-taupe">{col.kicker}</p>
                <p className="mt-1 font-serif text-[16px] leading-tight text-ink">{col.name}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProductRow({
  eyebrow,
  title,
  items,
  link,
}: {
  eyebrow: string;
  title: string;
  items: typeof products;
  link: string;
}) {
  return (
    <section className="mx-auto mt-12 w-full max-w-[1180px] px-4 md:mt-20 md:px-8">
      <Reveal>
        <div className="flex items-end justify-between px-1">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="section-title mt-2">{title}</h2>
          </div>
          <Link to={link} className="link-arrow shrink-0">
            Xem tất cả <ArrowRight size={13} />
          </Link>
        </div>
      </Reveal>

      <div className="no-scrollbar -mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:px-0">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={i * 60} className="w-[46%] shrink-0 snap-start md:w-auto">
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const benefitGlyphs = {
  soft: LeafIcon,
  air: RefreshIcon,
  fit: RefreshIcon,
  nopush: ShieldIcon,
} as const;

function Benefits() {
  return (
    <section className="mx-auto mt-14 w-full max-w-[1180px] px-4 md:mt-24 md:px-8">
      <Reveal>
        <div className="rounded-[20px] border border-ink/[0.08] bg-cream/40 px-5 py-8 md:px-10 md:py-10">
          <div className="mb-7 text-center">
            <p className="eyebrow">Vì sao chọn VÉLORA</p>
            <h2 className="section-title mt-2">Thoải mái như chưa từng mặc</h2>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4 md:gap-8">
            {benefits.map((b) => {
              const Glyph = benefitGlyphs[b.icon];
              return (
                <li key={b.title} className="flex flex-col items-center text-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/10 bg-ivory text-mocha">
                    <Glyph size={20} />
                  </span>
                  <p className="mt-3.5 font-sans text-[12.5px] font-medium tracking-[0.02em] text-ink">
                    {b.title}
                  </p>
                  <p className="mt-1.5 max-w-[190px] font-sans text-[11px] leading-relaxed text-smoke">
                    {b.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

function EditorialCampaign() {
  return (
    <section className="relative mt-14 h-[480px] w-full overflow-hidden md:mt-24 md:h-[580px]">
      <img
        src={IMG.mood3}
        alt="VÉLORA — Đồng hành cùng bạn trong mọi khoảnh khắc"
        className="editorial-img h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/10" />
      <div className="absolute inset-x-0 bottom-0 px-6 pb-10 text-ivory md:px-[7vw] md:pb-16">
        <Reveal>
          <p className="font-sans text-[10px] uppercase tracking-wide3 text-ivory/70">VÉ VÉLORA</p>
          <h2 className="display-lg mt-3 max-w-[420px] whitespace-pre-line">
            {'Đồng hành cùng bạn\ntrong mọi khoảnh khắc.'}
          </h2>
          <p className="mt-4 max-w-[340px] font-sans text-[13px] leading-relaxed text-ivory/75">
            VÉLORA ra đời từ niềm tin rằng mỗi người — dù là phụ nữ hay nam giới — đều xứng đáng được
            mặc những món đồ vừa vặn với chính mình.
          </p>
          <Link to="/cau-chuyen" className="btn-light group mt-6">
            Tìm hiểu thêm
            <ArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="mx-auto mt-14 w-full max-w-[1180px] px-4 md:mt-24 md:px-8">
      <div className="grid items-center gap-7 md:grid-cols-2 md:gap-14">
        <Reveal className="order-2 md:order-1">
          <p className="eyebrow">Triết lý VÉLORA</p>
          <h2 className="display-md mt-3 whitespace-pre-line">{'Thấu hiểu\ncơ thể bạn.'}</h2>
          <p className="mt-5 body-sm">
            Chúng tôi bắt đầu bằng việc lắng nghe: về chiếc áo hằn vai sau tám giờ làm việc, về cảm giác
            bí bách của đồ lót cotton dày trong khí hậu nóng ẩm. Từ đó, mỗi thiết kế VÉLORA — cho cả nữ
            và nam — được cân chỉnh theo số đo người Việt.
          </p>
          <ul className="mt-7 space-y-4">
            {[
              { t: 'Chất liệu an toàn', d: 'Cotton hữu cơ, modal bạch đàn và ren dệt mềm.' },
              { t: 'May tại TP.HCM', d: 'Xưởng nhỏ, mỗi sản phẩm được kiểm tra thủ công.' },
              { t: 'Phom theo người Việt', d: 'Số đo từ hơn 2.000 khách hàng đầu tiên, cả nam và nữ.' },
            ].map((f) => (
              <li key={f.t} className="flex gap-4 border-b border-ink/[0.08] pb-4">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-mocha" />
                <div>
                  <p className="font-sans text-[12.5px] font-medium text-ink">{f.t}</p>
                  <p className="mt-1 font-sans text-[11.5px] leading-relaxed text-smoke">{f.d}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/cau-chuyen" className="link-arrow mt-7">
            Đọc câu chuyện <ArrowRight size={13} />
          </Link>
        </Reveal>

        <Reveal delay={120} className="order-1 md:order-2">
          <div className="media aspect-[4/5] rounded-[18px]">
            <img src={IMG.mood5} alt="Chất liệu và chế tác VÉLORA" className="editorial-img" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mt-14 bg-cream/45 py-12 md:mt-24 md:py-16">
      <div className="mx-auto w-full max-w-[1180px] px-4 md:px-8">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">Khách hàng nói gì</p>
            <h2 className="section-title mt-2">Được tin chọn mỗi ngày</h2>
          </div>
        </Reveal>
        <div className="no-scrollbar -mx-4 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:px-0">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 70} className="w-[82%] shrink-0 snap-start md:w-auto">
              <figure className="flex h-full flex-col justify-between rounded-[16px] border border-ink/[0.07] bg-ivory p-5">
                <div>
                  <RatingStars rating={5} />
                  <blockquote className="mt-3 font-serif text-[16px] font-light italic leading-relaxed text-ink/85">
                    “{t.quote}”
                  </blockquote>
                </div>
                <figcaption className="mt-5 border-t border-ink/[0.08] pt-3">
                  <p className="font-sans text-[11.5px] font-medium text-ink">{t.name}</p>
                  <p className="font-sans text-[10.5px] text-smoke">{t.city}</p>
                  <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.1em] text-taupe">
                    {t.product}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  return (
    <section className="mx-auto mt-14 w-full max-w-[1180px] px-4 md:mt-24 md:px-8">
      <Reveal>
        <div className="overflow-hidden rounded-[20px] bg-ink px-6 py-10 text-ivory md:px-14 md:py-14">
          <div className="grid items-center gap-8 md:grid-cols-[1.1fr_1fr]">
            <div>
              <Wordmark tone="ivory" className="text-[13px]" />
              <h2 className="display-md mt-4 text-ivory">Nhận tin từ VÉLORA</h2>
              <p className="mt-3 max-w-[340px] font-sans text-[12.5px] leading-relaxed text-ivory/65">
                Bộ sưu tập mới, hướng dẫn chọn size và ưu đãi dành riêng cho khách hàng thân thiết.
                Không quảng cáo dày đặc.
              </p>
            </div>
            <div>
              {done ? (
                <div className="rounded-xl border border-ivory/20 px-5 py-6">
                  <p className="font-serif text-[20px]">Cảm ơn bạn đã đăng ký.</p>
                  <p className="mt-2 font-sans text-[12px] text-ivory/65">
                    Chúng tôi sẽ gửi lời chào đầu tiên tới {email} trong vài ngày tới.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email.trim()) setDone(true);
                  }}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email của bạn"
                    aria-label="Email đăng ký nhận tin"
                    className="w-full rounded-full border border-ivory/25 bg-transparent px-5 py-3.5 font-sans text-[13px] text-ivory placeholder:text-ivory/40 focus:border-ivory/60 focus:outline-none"
                  />
                  <button type="submit" className="btn-light shrink-0">
                    Đăng ký
                  </button>
                </form>
              )}
              <p className="mt-3 font-sans text-[10.5px] text-ivory/40">
                Bằng việc đăng ký, bạn đồng ý nhận email từ VÉLORA. Có thể huỷ bất cứ lúc nào.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function PriceTag({ price, compareAt }: { price: number; compareAt?: number }) {
  return (
    <span className="flex items-baseline gap-2">
      <span className="font-sans text-[14px] font-medium text-ink">{formatVND(price)}</span>
      {compareAt && (
        <span className="font-sans text-[11.5px] text-smoke/60 line-through">{formatVND(compareAt)}</span>
      )}
    </span>
  );
}
