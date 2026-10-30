import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageTopBar, usePageTitle } from '../components/PageTopBar';
import { ArrowRight, CheckIcon, ChevronDown, ShieldIcon } from '../components/icons';
import { useCart } from '../store/cart';
import { GarmentArt } from '../components/GarmentArt';
import { useAuth, type Address } from '../store/auth';
import { cx, formatVND } from '../lib/format';

const PROVINCES = [
  'TP. Hồ Chí Minh',
  'Hà Nội',
  'Đà Nẵng',
  'Hải Phòng',
  'Cần Thơ',
  'Bình Dương',
  'Đồng Nai',
  'Khánh Hòa',
  'Lâm Đồng',
  'Thừa Thiên Huế',
  'Quảng Ninh',
  'Nghệ An',
];

const PAYMENT_METHODS = [
  {
    id: 'cod',
    label: 'Thanh toán khi nhận hàng (COD)',
    description: 'Bạn thanh toán bằng tiền mặt khi nhận hàng.',
    available: true,
  },
  {
    id: 'bank',
    label: 'Chuyển khoản ngân hàng',
    description: 'Thông tin chuyển khoản sẽ được gửi kèm xác nhận đơn.',
    available: true,
  },
  {
    id: 'momo',
    label: 'Ví MoMo / ZaloPay',
    description: 'Sẽ khả dụng khi VÉLORA hoàn tất kết nối cổng thanh toán.',
    available: false,
  },
  {
    id: 'card',
    label: 'Thẻ quốc tế Visa / Mastercard',
    description: 'Sẽ khả dụng khi VÉLORA hoàn tất kết nối cổng thanh toán.',
    available: false,
  },
];

export function CheckoutPage() {
  usePageTitle('Thanh toán');
  const { lines, subtotal, discount, shippingFee, total, couponCode, clearCart } = useCart();
  const { user, addresses, addAddress, placeOrder } = useAuth();
  const navigate = useNavigate();

  const defaultAddress = addresses.find((a) => a.isDefault) ?? addresses[0];

  const [form, setForm] = useState({
    name: user?.name ?? '',
    phone: user?.phone ?? '',
    email: user?.email ?? '',
    province: defaultAddress?.province ?? '',
    district: defaultAddress?.district ?? '',
    ward: defaultAddress?.ward ?? '',
    street: defaultAddress?.street ?? '',
    note: '',
  });
  const [saveAddress, setSaveAddress] = useState(true);
  const [payment, setPayment] = useState('cod');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Vui lòng nhập họ tên người nhận.';
    if (!/^(0|\+84)[0-9]{8,10}$/.test(form.phone.replace(/[\s.]/g, '')))
      next.phone = 'Số điện thoại chưa hợp lệ (ví dụ: 0901234567).';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Email chưa đúng định dạng.';
    if (!form.province) next.province = 'Vui lòng chọn tỉnh / thành phố.';
    if (!form.district.trim()) next.district = 'Vui lòng nhập quận / huyện.';
    if (!form.ward.trim()) next.ward = 'Vui lòng nhập phường / xã.';
    if (!form.street.trim()) next.street = 'Vui lòng nhập số nhà và tên đường.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const first = document.querySelector('[data-error="true"]');
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (lines.length === 0) return;

    setSubmitting(true);
    const address: Address = {
      id: `addr-${Date.now()}`,
      label: 'Địa chỉ giao hàng',
      name: form.name,
      phone: form.phone,
      province: form.province,
      district: form.district,
      ward: form.ward,
      street: form.street,
      isDefault: addresses.length === 0,
    };

    if (saveAddress && addresses.length < 4) {
      addAddress({
        name: form.name,
        phone: form.phone,
        province: form.province,
        district: form.district,
        ward: form.ward,
        street: form.street,
        label: 'Địa chỉ giao hàng',
      });
    }

    const order = placeOrder({
      lines,
      subtotal,
      discount,
      shippingFee,
      total,
      paymentMethod: PAYMENT_METHODS.find((p) => p.id === payment)?.label ?? 'COD',
      address,
    });

    window.setTimeout(() => {
      clearCart();
      setSubmitting(false);
      navigate(`/don-hang/${order.id}`);
    }, 550);
  };

  if (lines.length === 0) {
    return (
      <>
        <PageTopBar backTo="/gio-hang" title="Thanh toán" />
        <div className="mx-auto max-w-[480px] px-5 py-20 text-center">
          <h1 className="font-serif text-[26px] font-light">Chưa có sản phẩm để thanh toán</h1>
          <p className="mt-2 body-sm">Giỏ hàng của bạn đang trống.</p>
          <Link to="/danh-muc" className="btn-dark mt-7">
            Khám phá sản phẩm
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageTopBar backTo="/gio-hang" title="Thanh toán" />

      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-[1180px] px-4 pt-5 md:grid md:grid-cols-[1.35fr_1fr] md:gap-10 md:px-8 md:pt-8">
        <div className="space-y-7">
          {/* Contact */}
          <section>
            <h2 className="font-sans text-[12px] uppercase tracking-wide2 text-mocha">Thông tin người nhận</h2>
            <div className="mt-4 space-y-3.5">
              <Field label="Họ và tên" error={errors.name}>
                <input
                  className="field"
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Ví dụ: Nguyễn Minh Thư"
                  autoComplete="name"
                />
              </Field>
              <div className="grid gap-3.5 sm:grid-cols-2">
                <Field label="Số điện thoại" error={errors.phone}>
                  <input
                    className="field"
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="0901 234 567"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </Field>
                <Field label="Email (không bắt buộc)" error={errors.email}>
                  <input
                    className="field"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="ban@email.com"
                    inputMode="email"
                    autoComplete="email"
                  />
                </Field>
              </div>
            </div>
          </section>

          {/* Address */}
          <section>
            <h2 className="font-sans text-[12px] uppercase tracking-wide2 text-mocha">Địa chỉ giao hàng</h2>
            <div className="mt-4 space-y-3.5">
              <Field label="Tỉnh / Thành phố" error={errors.province}>
                <div className="relative">
                  <select
                    className="field appearance-none pr-10"
                    value={form.province}
                    onChange={set('province')}
                  >
                    <option value="">Chọn tỉnh / thành phố</option>
                    {PROVINCES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-taupe"
                  />
                </div>
              </Field>
              <div className="grid gap-3.5 sm:grid-cols-2">
                <Field label="Quận / Huyện" error={errors.district}>
                  <input className="field" value={form.district} onChange={set('district')} placeholder="Ví dụ: Quận 1" />
                </Field>
                <Field label="Phường / Xã" error={errors.ward}>
                  <input className="field" value={form.ward} onChange={set('ward')} placeholder="Ví dụ: Phường Bến Nghé" />
                </Field>
              </div>
              <Field label="Số nhà, tên đường" error={errors.street}>
                <input className="field" value={form.street} onChange={set('street')} placeholder="Ví dụ: 85 Lý Tự Trọng" />
              </Field>
              <Field label="Ghi chú cho người giao hàng (không bắt buộc)">
                <textarea
                  className="field min-h-[76px] resize-none"
                  value={form.note}
                  onChange={set('note')}
                  placeholder="Ví dụ: Giao sau 18h, gọi trước khi đến."
                />
              </Field>

              <label className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  checked={saveAddress}
                  onChange={(e) => setSaveAddress(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-ink/30 accent-ink"
                />
                <span className="font-sans text-[11.5px] text-smoke">
                  Lưu địa chỉ này cho lần mua sau
                </span>
              </label>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="font-sans text-[12px] uppercase tracking-wide2 text-mocha">Phương thức thanh toán</h2>
            <div className="mt-4 space-y-2">
              {PAYMENT_METHODS.map((m) => {
                const active = payment === m.id;
                return (
                  <label
                    key={m.id}
                    className={cx(
                      'flex cursor-pointer items-start gap-3 rounded-[12px] border px-4 py-3.5 transition-all duration-300',
                      !m.available && 'opacity-55',
                      active ? 'border-ink bg-cream/50' : 'border-ink/12 hover:border-ink/30',
                    )}
                  >
                    <span
                      className={cx(
                        'mt-0.5 grid h-[17px] w-[17px] shrink-0 place-items-center rounded-full border',
                        active ? 'border-ink' : 'border-ink/30',
                      )}
                    >
                      {active && <span className="h-[8px] w-[8px] rounded-full bg-ink" />}
                    </span>
                    <input
                      type="radio"
                      name="payment"
                      value={m.id}
                      checked={active}
                      disabled={!m.available}
                      onChange={() => setPayment(m.id)}
                      className="sr-only"
                    />
                    <span className="flex-1">
                      <span className="block font-sans text-[12.5px] font-medium text-ink">
                        {m.label}
                        {!m.available && (
                          <span className="ml-2 rounded-full bg-ink/8 px-2 py-[2px] font-sans text-[9px] uppercase tracking-[0.08em] text-smoke">
                            Sắp có
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block font-sans text-[11px] leading-relaxed text-smoke">
                        {m.description}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="mt-3.5 flex items-start gap-2.5 rounded-[10px] bg-cream/50 px-3.5 py-3">
              <ShieldIcon size={15} className="mt-0.5 shrink-0 text-mocha" />
              <p className="font-sans text-[10.5px] leading-relaxed text-smoke">
                Đây là bản demo: chưa có cổng thanh toán hoặc đơn vị vận chuyển nào được kết nối. Đơn
                hàng sẽ được ghi nhận trên thiết bị này để bạn xem lại quy trình.
              </p>
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside className="mt-8 md:mt-0">
          <div className="rounded-[16px] border border-ink/[0.09] bg-cream/40 px-5 py-5 md:sticky md:top-[172px]">
            <h2 className="font-sans text-[12px] uppercase tracking-wide2 text-mocha">Đơn hàng của bạn</h2>

            <ul className="mt-4 space-y-3.5">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-3">
                  <div className="h-[64px] w-[50px] shrink-0 overflow-hidden rounded-[8px]">
                    <GarmentArt kind={l.garment} color={l.colorHex} className="h-full w-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-sans text-[12px] text-ink">{l.name}</p>
                    <p className="font-sans text-[10.5px] text-smoke">
                      {l.size} · {l.colorName} · ×{l.qty}
                    </p>
                  </div>
                  <p className="shrink-0 font-sans text-[11.5px] text-ink">{formatVND(l.price * l.qty)}</p>
                </li>
              ))}
            </ul>

            <dl className="mt-5 space-y-2.5 border-t border-ink/10 pt-4 font-sans text-[12.5px]">
              <div className="flex justify-between">
                <dt className="text-smoke">Tạm tính</dt>
                <dd className="text-ink">{formatVND(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-smoke">Giảm giá ({couponCode})</dt>
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

            <button type="submit" disabled={submitting} className="btn-dark mt-5 w-full disabled:opacity-60">
              {submitting ? 'Đang xử lý…' : 'Đặt hàng'}
              {!submitting && <ArrowRight size={15} />}
            </button>

            <p className="mt-3 flex items-start gap-2 font-sans text-[10.5px] leading-relaxed text-smoke">
              <CheckIcon size={13} className="mt-0.5 shrink-0 text-[#4F7A5B]" />
              Bằng việc đặt hàng, bạn đồng ý với chính sách đổi trả và bảo mật của VÉLORA.
            </p>
          </div>
        </aside>
      </form>
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block" data-error={!!error}>
      <span className="field-label">{label}</span>
      {children}
      {error && <span className="mt-1.5 block font-sans text-[11px] text-[#B4533F]">{error}</span>}
    </label>
  );
}
