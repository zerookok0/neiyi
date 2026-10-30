import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageTopBar, usePageTitle } from '../components/PageTopBar';
import { ArrowRight, BagIcon, CheckIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon, TruckIcon, ShieldIcon, RefreshIcon } from '../components/icons';
import { ProductCard } from '../components/ProductCard';
import { GarmentArt } from '../components/GarmentArt';
import { products } from '../data/products';
import { useCart } from '../store/cart';
import { cx, formatVND, FREE_SHIPPING_THRESHOLD } from '../lib/format';

export function CartPage() {
  usePageTitle('Giỏ hàng');
  const {
    lines,
    subtotal,
    discount,
    shippingFee,
    total,
    couponCode,
    couponError,
    updateQty,
    removeLine,
    applyCoupon,
    removeCoupon,
  } = useCart();
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - (subtotal - discount));
  const progress = Math.min(100, ((subtotal - discount) / FREE_SHIPPING_THRESHOLD) * 100);
  const suggestions = products.filter((p) => !lines.some((l) => l.productId === p.id)).slice(0, 4);

  if (lines.length === 0) {
    return (
      <>
        <PageTopBar backTo="/danh-muc" title="Giỏ hàng" />
        <div className="mx-auto max-w-[520px] px-5 py-16 text-center md:py-24">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-ink/10 bg-cream/50 text-mocha">
            <BagIcon size={26} />
          </span>
          <h1 className="mt-5 font-serif text-[26px] font-light">Giỏ hàng đang trống</h1>
          <p className="mt-2 body-sm">
            Có rất nhiều thiết kế dịu dàng đang chờ bạn. Bắt đầu từ món đồ bạn cần nhất nhé.
          </p>
          <Link to="/danh-muc" className="btn-dark mt-7">
            Khám phá sản phẩm
            <ArrowRight size={15} />
          </Link>

          <div className="mt-14 text-left">
            <p className="eyebrow mb-4 text-center">Được yêu thích nhất</p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-6">
              {suggestions.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageTopBar backTo="/danh-muc" title={`Giỏ hàng (${lines.length})`} />

      <div className="mx-auto w-full max-w-[1180px] px-4 pt-4 md:grid md:grid-cols-[1.4fr_1fr] md:gap-10 md:px-8 md:pt-8">
        <div>
          {/* Free shipping progress */}
          <div className="rounded-[14px] border border-ink/[0.08] bg-cream/45 px-4 py-3.5">
            <div className="flex items-center gap-2">
              <TruckIcon size={16} className="shrink-0 text-mocha" />
              <p className="font-sans text-[11.5px] text-ink/80">
                {remaining > 0 ? (
                  <>
                    Mua thêm <span className="font-medium text-ink">{formatVND(remaining)}</span> để được
                    miễn phí vận chuyển
                  </>
                ) : (
                  'Đơn hàng của bạn được miễn phí vận chuyển'
                )}
              </p>
            </div>
            <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full rounded-full bg-ink transition-all duration-700 ease-silk"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Lines */}
          <ul className="mt-5 divide-y divide-ink/[0.09]">
            {lines.map((line) => (
              <li key={line.key} className="flex gap-3.5 py-4">
                <Link to={`/san-pham/${line.slug}`} className="shrink-0">
                  <div className="h-[104px] w-[82px] overflow-hidden rounded-[10px]">
                    <GarmentArt kind={line.garment} color={line.colorHex} className="h-full w-full" />
                  </div>
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link to={`/san-pham/${line.slug}`} className="tap">
                        <p className="truncate font-sans text-[12.5px] font-medium text-ink">{line.name}</p>
                      </Link>
                      <p className="mt-0.5 font-sans text-[11px] text-smoke">{line.subtitle}</p>
                      <p className="mt-1.5 font-sans text-[10.5px] tracking-[0.03em] text-smoke/85">
                        Size: {line.size} · Màu: {line.colorName}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLine(line.key)}
                      aria-label={`Xoá ${line.name} khỏi giỏ`}
                      className="tap grid h-8 w-8 shrink-0 place-items-center rounded-full text-taupe hover:bg-cream hover:text-ink"
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>

                  <div className="mt-auto flex items-end justify-between pt-2">
                    <div className="flex items-center gap-1 rounded-full border border-ink/15 px-1">
                      <button
                        type="button"
                        onClick={() => updateQty(line.key, line.qty - 1)}
                        aria-label="Giảm số lượng"
                        className="tap grid h-7 w-7 place-items-center rounded-full hover:bg-cream"
                      >
                        <MinusIcon size={13} />
                      </button>
                      <span className="w-6 text-center font-sans text-[12px]">{line.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(line.key, line.qty + 1)}
                        aria-label="Tăng số lượng"
                        className="tap grid h-7 w-7 place-items-center rounded-full hover:bg-cream"
                      >
                        <PlusIcon size={13} />
                      </button>
                    </div>
                    <p className="font-sans text-[13px] font-medium text-ink">
                      {formatVND(line.price * line.qty)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Coupon */}
          <div className="mt-6">
            <p className="field-label">Mã giảm giá</p>
            {couponCode ? (
              <div className="flex items-center justify-between rounded-xl border border-ink/15 bg-cream/45 px-4 py-3">
                <span className="flex items-center gap-2 font-sans text-[12.5px] text-ink">
                  <CheckIcon size={15} className="text-[#4F7A5B]" />
                  {couponCode}
                </span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="inline-flex items-center gap-1 font-sans text-[11px] text-smoke hover:text-ink"
                >
                  <CloseIcon size={13} /> Bỏ
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const ok = applyCoupon(code);
                  if (ok) setCode('');
                }}
                className="flex gap-2"
              >
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Nhập mã giảm giá"
                  aria-label="Mã giảm giá"
                  className="field flex-1 py-2.5 text-[13px]"
                />
                <button type="submit" className="btn-dark shrink-0 px-5 py-2.5 text-[11px]">
                  Áp dụng
                </button>
              </form>
            )}
            {couponError && (
              <p className="mt-2 font-sans text-[11.5px] text-[#B4533F]">{couponError}</p>
            )}
            {!couponCode && (
              <p className="mt-2 font-sans text-[10.5px] text-smoke/80">
                Thử mã <span className="text-ink">VELORA10</span> cho đơn hàng đầu tiên.
              </p>
            )}
          </div>

          <Link to="/danh-muc" className="link-arrow mt-7">
            Tiếp tục mua sắm
          </Link>
        </div>

        {/* Summary */}
        <aside className="mt-7 md:mt-0">
          <div className="rounded-[16px] border border-ink/[0.09] bg-cream/40 px-5 py-5 md:sticky md:top-[172px]">
            <h2 className="font-sans text-[12px] uppercase tracking-wide2 text-mocha">Tóm tắt đơn hàng</h2>
            <dl className="mt-4 space-y-2.5 font-sans text-[12.5px]">
              <div className="flex justify-between">
                <dt className="text-smoke">Tạm tính</dt>
                <dd className="text-ink">{formatVND(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-smoke">Giảm giá</dt>
                  <dd className="text-[#4F7A5B]">−{formatVND(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-smoke">Phí vận chuyển</dt>
                <dd className={cx(shippingFee === 0 ? 'text-[#4F7A5B]' : 'text-ink')}>
                  {shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-ink/10 pt-3">
                <dt className="font-sans text-[12px] uppercase tracking-[0.1em] text-ink">Tổng cộng</dt>
                <dd className="font-sans text-[17px] font-medium text-ink">{formatVND(total)}</dd>
              </div>
            </dl>
            <p className="mt-1.5 font-sans text-[10.5px] text-smoke/80">Đã bao gồm VAT.</p>

            <button
              type="button"
              onClick={() => navigate('/thanh-toan')}
              className="btn-dark mt-5 w-full"
            >
              Thanh toán
              <ArrowRight size={15} />
            </button>

            <ul className="mt-5 space-y-2.5 border-t border-ink/[0.09] pt-4">
              {[
                { icon: ShieldIcon, t: 'Thanh toán bảo mật' },
                { icon: RefreshIcon, t: 'Đổi size miễn phí trong 07 ngày' },
                { icon: TruckIcon, t: 'Giao hàng toàn quốc' },
              ].map((s) => (
                <li key={s.t} className="flex items-center gap-2.5 font-sans text-[11px] text-smoke">
                  <s.icon size={15} className="shrink-0 text-mocha" />
                  {s.t}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {suggestions.length > 0 && (
        <section className="mx-auto mt-12 w-full max-w-[1180px] px-4 pb-4 md:px-8">
          <h2 className="section-title">Gợi ý phối cùng</h2>
          <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-7 md:grid-cols-4 md:gap-5">
            {suggestions.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
