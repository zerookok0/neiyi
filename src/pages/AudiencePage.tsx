import { Link, useParams } from 'react-router-dom';
import { PageTopBar, usePageTitle } from '../components/PageTopBar';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { ArrowRight } from '../components/icons';
import { GarmentArt } from '../components/GarmentArt';
import { categories } from '../data/catalog';
import { productsByAudience } from '../data/products';
import type { Audience } from '../data/types';

const COPY: Record<
  Audience,
  { title: string; eyebrow: string; lead: string; note: string }
> = {
  women: {
    title: 'Bộ sưu tập Nữ',
    eyebrow: 'Áo ngực · Quần lót · Đồ mặc nhà',
    lead: 'Dịu dàng trên da, tự tin trong từng khoảnh khắc. Phom được cân chỉnh theo số đo phụ nữ Việt, chất liệu chọn bằng cảm giác chạm.',
    note: 'Đổi size miễn phí trong 07 ngày cho toàn bộ sản phẩm nữ.',
  },
  men: {
    title: 'Bộ sưu tập Nam',
    eyebrow: 'Trunk · Brief · Áo lót · Đồ mặc nhà',
    lead: 'Thoáng mát cả ngày dài. Túi nâng đỡ dựng phom riêng, đường may phẳng và vải co giãn bốn chiều cho khí hậu nóng ẩm.',
    note: 'Size nam từ M đến XXL, có bảng quy đổi theo vòng eo.',
  },
};

export function AudiencePage() {
  const { audience } = useParams<{ audience: string }>();
  const group: Audience = audience === 'nam' ? 'men' : 'women';
  const copy = COPY[group];
  usePageTitle(copy.title);

  const cats = categories.filter((c) => c.audience === group);
  const items = productsByAudience(group);
  const best = items.filter((p) => p.isBestSeller);
  const fresh = items.filter((p) => p.isNew);

  return (
    <>
      <PageTopBar backTo="/" title={copy.title} />

      <section className="mx-auto w-full max-w-[1180px] px-5 pt-8 md:px-8 md:pt-12">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="display-lg mt-3">{copy.title}</h1>
        <p className="mt-4 max-w-[460px] body-sm">{copy.lead}</p>

        <div className="no-scrollbar -mx-5 mt-7 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
          {cats.map((c) => (
            <Link key={c.id} to={`/danh-muc/${c.slug}`} className="chip-idle">
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-[1180px] px-5 md:px-8">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {cats.map((c, i) => (
            <Reveal key={c.id} delay={i * 60}>
              <Link
                to={`/danh-muc/${c.slug}`}
                className="tap group block overflow-hidden rounded-[14px] border border-ink/[0.08] bg-cream/40"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <div className="h-full w-full transition-transform duration-700 ease-silk group-hover:scale-[1.04]">
                    <GarmentArt kind={c.garment} color={c.color} className="h-full w-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between px-3 py-2.5">
                  <span className="font-sans text-[11.5px] text-ink">{c.name}</span>
                  <ArrowRight size={13} className="shrink-0 text-taupe" />
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {best.length > 0 && (
        <section className="mx-auto mt-12 w-full max-w-[1180px] px-5 md:mt-16 md:px-8">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="eyebrow">Được chọn nhiều nhất</p>
                <h2 className="section-title mt-2">Bán chạy</h2>
              </div>
              <Link to="/danh-muc" className="link-arrow shrink-0">
                Xem tất cả <ArrowRight size={13} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-5">
            {best.map((p, i) => (
              <Reveal key={p.id} delay={i * 55}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto mt-12 w-full max-w-[1180px] px-5 md:mt-16 md:px-8">
        <Reveal>
          <h2 className="section-title">
            {fresh.length > 0 ? 'Vừa lên kệ' : 'Toàn bộ sản phẩm'}
          </h2>
        </Reveal>
        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-5">
          {(fresh.length > 0 ? fresh : items).map((p, i) => (
            <Reveal key={p.id} delay={i * 55}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 rounded-[16px] border border-ink/[0.08] bg-cream/40 px-5 py-6 text-center">
          <p className="font-serif text-[20px]">Chưa chắc size nào vừa?</p>
          <p className="mx-auto mt-1.5 max-w-[360px] body-sm">{copy.note}</p>
          <a href="tel:19002828" className="btn-outline mt-5">
            Gọi 1900 2828
          </a>
        </div>
      </section>

      <div className="h-10" />
    </>
  );
}
