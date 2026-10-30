import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageTopBar, usePageTitle } from '../components/PageTopBar';
import { ArrowRight, CheckIcon, LogoutIcon, PinIcon, PlusIcon, TrashIcon, BagIcon, HeartIcon, CloseIcon } from '../components/icons';
import { DEFAULT_DEMO_HINT, useAuth, ORDER_STATUS_LABEL } from '../store/auth';
import { useWishlist } from '../store/wishlist';
import { products } from '../data/products';
import { GarmentArt } from '../components/GarmentArt';
import { cx, formatVND } from '../lib/format';

export function LoginPage() {
  usePageTitle('Đăng nhập');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.ok) navigate('/tai-khoan');
    else setError(res.message ?? 'Không thể đăng nhập.');
  };

  return (
    <>
      <PageTopBar backTo="/tai-khoan" title="Đăng nhập" />
      <div className="mx-auto w-full max-w-[400px] px-5 py-10 md:py-16">
        <p className="eyebrow">Chào mừng trở lại</p>
        <h1 className="display-md mt-2">Đăng nhập</h1>
        <p className="mt-3 body-sm">
          Đăng nhập để xem đơn hàng, địa chỉ đã lưu và danh sách yêu thích của bạn.
        </p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block">
            <span className="field-label">Email</span>
            <input
              className="field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ban@email.com"
              autoComplete="email"
            />
          </label>
          <label className="block">
            <span className="field-label">Mật khẩu</span>
            <input
              className="field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          {error && <p className="font-sans text-[11.5px] text-[#B4533F]">{error}</p>}

          <button type="submit" className="btn-dark w-full">
            Đăng nhập
          </button>
        </form>

        <div className="mt-4 rounded-[12px] bg-cream/55 px-4 py-3">
          <p className="font-sans text-[10.5px] uppercase tracking-[0.1em] text-mocha">Tài khoản demo</p>
          <p className="mt-1 font-sans text-[11.5px] text-smoke">
            Email bất kỳ · Mật khẩu: <span className="text-ink">{DEFAULT_DEMO_HINT}</span>
          </p>
          <button
            type="button"
            onClick={() => {
              setEmail('minhthu@velora.vn');
              setPassword(DEFAULT_DEMO_HINT);
            }}
            className="mt-2 font-sans text-[11px] text-ink underline decoration-ink/25 underline-offset-4"
          >
            Điền sẵn thông tin demo
          </button>
        </div>

        <p className="mt-6 text-center font-sans text-[12px] text-smoke">
          Chưa có tài khoản?{' '}
          <Link to="/dang-ky" className="text-ink underline decoration-ink/25 underline-offset-4">
            Đăng ký ngay
          </Link>
        </p>
        <p className="mt-2 text-center font-sans text-[10.5px] leading-relaxed text-smoke/80">
          Bản demo chưa kết nối hệ thống tài khoản thật — thông tin chỉ được lưu trên thiết bị này.
        </p>
      </div>
    </>
  );
}

export function RegisterPage() {
  usePageTitle('Đăng ký');
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = register(form.name, form.email, form.phone, form.password);
    if (res.ok) navigate('/tai-khoan');
    else setError(res.message ?? 'Không thể tạo tài khoản.');
  };

  return (
    <>
      <PageTopBar backTo="/dang-nhap" title="Đăng ký" />
      <div className="mx-auto w-full max-w-[400px] px-5 py-10 md:py-16">
        <p className="eyebrow">Thành viên VÉLORA</p>
        <h1 className="display-md mt-2">Tạo tài khoản</h1>
        <p className="mt-3 body-sm">
          Nhận ưu đãi cho đơn đầu tiên và hướng dẫn chọn size riêng từ đội ngũ VÉLORA.
        </p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block">
            <span className="field-label">Họ và tên</span>
            <input className="field" value={form.name} onChange={set('name')} placeholder="Nguyễn Minh Thư" autoComplete="name" />
          </label>
          <label className="block">
            <span className="field-label">Email</span>
            <input className="field" type="email" value={form.email} onChange={set('email')} placeholder="ban@email.com" autoComplete="email" />
          </label>
          <label className="block">
            <span className="field-label">Số điện thoại</span>
            <input className="field" value={form.phone} onChange={set('phone')} placeholder="0901 234 567" inputMode="tel" autoComplete="tel" />
          </label>
          <label className="block">
            <span className="field-label">Mật khẩu</span>
            <input className="field" type="password" value={form.password} onChange={set('password')} placeholder="Tối thiểu 6 ký tự" autoComplete="new-password" />
          </label>

          {error && <p className="font-sans text-[11.5px] text-[#B4533F]">{error}</p>}

          <button type="submit" className="btn-dark w-full">
            Tạo tài khoản
          </button>
        </form>

        <p className="mt-6 text-center font-sans text-[12px] text-smoke">
          Đã có tài khoản?{' '}
          <Link to="/dang-nhap" className="text-ink underline decoration-ink/25 underline-offset-4">
            Đăng nhập
          </Link>
        </p>
      </div>
    </>
  );
}

export function AccountPage() {
  usePageTitle('Tài khoản');
  const { user, logout, orders, addresses } = useAuth();
  const { count } = useWishlist();

  if (!user) {
    return (
      <>
        <PageTopBar backTo="/" title="Tài khoản" />
        <div className="mx-auto w-full max-w-[420px] px-5 py-12 text-center md:py-20">
          <p className="eyebrow">VÉLORA</p>
          <h1 className="display-md mt-2">Tài khoản của bạn</h1>
          <p className="mt-3 body-sm">
            Đăng nhập để theo dõi đơn hàng, lưu địa chỉ giao hàng và xem lại những sản phẩm yêu thích.
          </p>
          <div className="mt-7 flex flex-col gap-2.5">
            <Link to="/dang-nhap" className="btn-dark w-full">
              Đăng nhập
            </Link>
            <Link to="/dang-ky" className="btn-outline w-full">
              Tạo tài khoản mới
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-2">
            {[
              { to: '/yeu-thich', label: 'Yêu thích', value: count },
              { to: '/gio-hang', label: 'Giỏ hàng', value: 0 },
              { to: '/lien-he', label: 'Hỗ trợ', value: '24/7' },
            ].map((s) => (
              <Link
                key={s.label}
                to={s.to}
                className="rounded-[12px] border border-ink/[0.09] px-3 py-4 text-center"
              >
                <p className="font-serif text-[18px]">{s.value}</p>
                <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.08em] text-smoke">{s.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageTopBar backTo="/" title="Tài khoản" />
      <div className="mx-auto w-full max-w-[1180px] px-4 pt-6 md:px-8 md:pt-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="eyebrow">Xin chào</p>
            <h1 className="display-md mt-2">{user.name}</h1>
            <p className="mt-1 font-sans text-[11.5px] text-smoke">{user.email}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="tap inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-2 font-sans text-[10.5px] uppercase tracking-[0.08em] text-ink/70 hover:border-ink/40 hover:text-ink"
          >
            <LogoutIcon size={14} /> Đăng xuất
          </button>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {[
            { icon: BagIcon, label: 'Đơn hàng', value: orders.length, to: '#don-hang' },
            { icon: HeartIcon, label: 'Yêu thích', value: count, to: '/yeu-thich' },
            { icon: PinIcon, label: 'Địa chỉ đã lưu', value: addresses.length, to: '#dia-chi' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.to}
              className="flex items-center gap-3 rounded-[14px] border border-ink/[0.09] px-4 py-4 transition-colors hover:border-ink/25"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-cream/70 text-mocha">
                <s.icon size={18} />
              </span>
              <span>
                <span className="block font-serif text-[20px] leading-none">{s.value}</span>
                <span className="mt-1 block font-sans text-[10px] uppercase tracking-[0.08em] text-smoke">
                  {s.label}
                </span>
              </span>
            </a>
          ))}
        </div>

        {/* Orders */}
        <section id="don-hang" className="mt-10 scroll-mt-28">
          <h2 className="section-title">Lịch sử đơn hàng</h2>
          {orders.length === 0 ? (
            <div className="mt-4 rounded-[14px] border border-ink/[0.09] bg-cream/35 px-5 py-10 text-center">
              <p className="font-sans text-[12.5px] text-smoke">Bạn chưa có đơn hàng nào.</p>
              <Link to="/danh-muc" className="btn-outline mt-4">
                Bắt đầu mua sắm
              </Link>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {orders.map((o) => (
                <li key={o.id} className="rounded-[14px] border border-ink/[0.09] px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-sans text-[12.5px] font-medium text-ink">#{o.id}</p>
                      <p className="font-sans text-[10.5px] text-smoke">
                        {new Date(o.createdAt).toLocaleDateString('vi-VN')} · {o.lines.length} sản phẩm
                      </p>
                    </div>
                    <span className="rounded-full border border-ink/15 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.08em] text-ink/70">
                      {ORDER_STATUS_LABEL[o.status]}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    {o.lines.slice(0, 4).map((l) => (
                      <div key={l.key} className="h-14 w-11 overflow-hidden rounded-[6px]">
                        <GarmentArt kind={l.garment} color={l.colorHex} className="h-full w-full" />
                      </div>
                    ))}
                    <div className="ml-auto text-right">
                      <p className="font-sans text-[13px] font-medium text-ink">{formatVND(o.total)}</p>
                      <Link
                        to={`/don-hang/${o.id}`}
                        className="inline-flex items-center gap-1 font-sans text-[10.5px] text-mocha hover:text-ink"
                      >
                        Chi tiết <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <AddressSection />
      </div>
      <div className="h-8" />
    </>
  );
}

function AddressSection() {
  const { addresses, addAddress, removeAddress, setDefaultAddress } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', province: '', district: '', ward: '', street: '', label: 'Nhà riêng' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.province || !form.street) return;
    addAddress({ ...form });
    setForm({ name: '', phone: '', province: '', district: '', ward: '', street: '', label: 'Nhà riêng' });
    setOpen(false);
  };

  return (
    <section id="dia-chi" className="mt-10 scroll-mt-28">
      <div className="flex items-end justify-between">
        <h2 className="section-title">Địa chỉ giao hàng</h2>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="link-arrow"
        >
          {open ? <CloseIcon size={13} /> : <PlusIcon size={13} />}
          {open ? 'Đóng' : 'Thêm địa chỉ'}
        </button>
      </div>

      {addresses.length === 0 && !open && (
        <p className="mt-3 rounded-[14px] border border-ink/[0.09] bg-cream/35 px-5 py-7 text-center font-sans text-[12.5px] text-smoke">
          Chưa có địa chỉ nào được lưu.
        </p>
      )}

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {addresses.map((a) => (
          <li key={a.id} className={cx('rounded-[14px] border px-4 py-4', a.isDefault ? 'border-ink/40' : 'border-ink/[0.09]')}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-sans text-[12.5px] font-medium text-ink">
                  {a.label}
                  {a.isDefault && (
                    <span className="ml-2 rounded-full bg-ink px-2 py-[2px] font-sans text-[9px] uppercase tracking-[0.08em] text-ivory">
                      Mặc định
                    </span>
                  )}
                </p>
                <p className="mt-1.5 font-sans text-[11.5px] text-smoke">
                  {a.name} · {a.phone}
                </p>
                <p className="mt-0.5 font-sans text-[11.5px] leading-relaxed text-smoke">
                  {a.street}, {a.ward}, {a.district}, {a.province}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeAddress(a.id)}
                aria-label="Xoá địa chỉ"
                className="tap grid h-8 w-8 shrink-0 place-items-center rounded-full text-taupe hover:bg-cream hover:text-ink"
              >
                <TrashIcon size={15} />
              </button>
            </div>
            {!a.isDefault && (
              <button
                type="button"
                onClick={() => setDefaultAddress(a.id)}
                className="mt-3 inline-flex items-center gap-1.5 font-sans text-[10.5px] uppercase tracking-[0.08em] text-mocha hover:text-ink"
              >
                <CheckIcon size={13} /> Đặt làm mặc định
              </button>
            )}
          </li>
        ))}
      </ul>

      {open && (
        <form onSubmit={submit} className="mt-4 rounded-[14px] border border-ink/[0.09] px-4 py-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="field-label">Tên địa chỉ</span>
              <input className="field" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Nhà riêng" />
            </label>
            <label className="block">
              <span className="field-label">Họ tên người nhận</span>
              <input className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nguyễn Minh Thư" />
            </label>
            <label className="block">
              <span className="field-label">Số điện thoại</span>
              <input className="field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="0901 234 567" inputMode="tel" />
            </label>
            <label className="block">
              <span className="field-label">Tỉnh / Thành phố</span>
              <input className="field" value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} placeholder="TP. Hồ Chí Minh" />
            </label>
            <label className="block">
              <span className="field-label">Quận / Huyện</span>
              <input className="field" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} placeholder="Quận 1" />
            </label>
            <label className="block">
              <span className="field-label">Phường / Xã</span>
              <input className="field" value={form.ward} onChange={(e) => setForm({ ...form, ward: e.target.value })} placeholder="Phường Bến Nghé" />
            </label>
          </div>
          <label className="mt-3 block">
            <span className="field-label">Số nhà, tên đường</span>
            <input className="field" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} placeholder="85 Lý Tự Trọng" />
          </label>
          <button type="submit" className="btn-dark mt-4 w-full sm:w-auto">
            Lưu địa chỉ
          </button>
        </form>
      )}
    </section>
  );
}

export function AccountWishlistPreview() {
  const { ids } = useWishlist();
  const list = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;
  if (list.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="section-title">Yêu thích gần đây</h2>
      <ul className="mt-4 flex gap-3 overflow-x-auto">
        {list.slice(0, 6).map((p) => (
          <li key={p.id} className="w-28 shrink-0">
            <Link to={`/san-pham/${p.slug}`}>
              <div className="aspect-[3/4] overflow-hidden rounded-[10px]">
                <GarmentArt kind={p.garment} color={p.colors[0].hex} className="h-full w-full" />
              </div>
              <p className="mt-2 truncate font-sans text-[11px] text-ink">{p.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
