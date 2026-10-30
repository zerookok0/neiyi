import { Link } from 'react-router-dom';
import { PageTopBar, usePageTitle } from '../components/PageTopBar';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { ArrowRight, HeartIcon } from '../components/icons';
import { products } from '../data/products';
import { useWishlist } from '../store/wishlist';

export function WishlistPage() {
  usePageTitle('Sản phẩm yêu thích');
  const { ids } = useWishlist();
  const saved = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;

  return (
    <>
      <PageTopBar backTo="/" title="Yêu thích" />
      <section className="mx-auto w-full max-w-[1180px] px-4 pt-6 md:px-8 md:pt-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Danh sách của bạn</p>
            <h1 className="display-md mt-2">Sản phẩm yêu thích</h1>
          </div>
          {saved.length > 0 && (
            <p className="font-sans text-[11px] tracking-[0.06em] text-smoke">{saved.length} sản phẩm</p>
          )}
        </div>

        {saved.length === 0 ? (
          <div className="mt-8 rounded-[16px] border border-ink/10 bg-cream/40 px-6 py-16 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-ink/10 bg-ivory text-mocha">
              <HeartIcon size={22} />
            </span>
            <p className="mt-4 font-serif text-[22px]">Chưa có sản phẩm nào</p>
            <p className="mx-auto mt-2 max-w-[320px] body-sm">
              Nhấn vào biểu tượng trái tim trên sản phẩm để lưu lại những món đồ bạn thích.
            </p>
            <Link to="/danh-muc" className="btn-dark mt-6">
              Xem sản phẩm
              <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5 md:gap-y-10">
              {saved.map((p, i) => (
                <Reveal key={p.id} delay={i * 50}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
            <div className="mt-10 rounded-[16px] bg-cream/45 px-5 py-6 text-center">
              <p className="font-serif text-[19px]">Sẵn sàng chưa?</p>
              <p className="mx-auto mt-1.5 max-w-[330px] body-sm">
                Bạn có thể thêm trực tiếp từng sản phẩm vào giỏ. Đổi size miễn phí trong 07 ngày.
              </p>
              <Link to="/gio-hang" className="btn-dark mt-5">
                Xem giỏ hàng
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  );
}
