import { Link, useParams } from 'react-router-dom';
import { PageTopBar, usePageTitle } from '../components/PageTopBar';
import { ArrowRight, CheckIcon, PinIcon, TruckIcon } from '../components/icons';
import { useAuth, ORDER_STATUS_LABEL } from '../store/auth';
import { GarmentArt } from '../components/GarmentArt';
import { formatVND } from '../lib/format';

export function OrderConfirmationPage() {
  const { id } = useParams();
  const { orders, user } = useAuth();
  const order = orders.find((o) => o.id === id);
  usePageTitle('Đơn hàng đã đặt');

  if (!order) {
    return (
      <>
        <PageTopBar backTo="/tai-khoan" title="Đơn hàng" />
        <div className="mx-auto max-w-[480px] px-5 py-20 text-center">
          <h1 className="font-serif text-[24px] font-light">Không tìm thấy đơn hàng</h1>
          <p className="mt-2 body-sm">
            Đơn hàng chỉ được lưu trên thiết bị này. Nếu bạn đã xoá dữ liệu trình duyệt, đơn sẽ không
            còn hiển thị.
          </p>
          <Link to="/tai-khoan" className="btn-dark mt-7">
            Về tài khoản
          </Link>
        </div>
      </>
    );
  }

  const created = new Date(order.createdAt);

  return (
    <>
      <PageTopBar backTo="/" title="Đặt hàng thành công" />
      <div className="mx-auto w-full max-w-[720px] px-4 pt-8 md:px-8 md:pt-12">
        <div className="text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ink text-ivory">
            <CheckIcon size={26} />
          </span>
          <h1 className="display-md mt-6">Cảm ơn bạn, {order.address.name.split(' ').slice(-1)[0]}.</h1>
          <p className="mx-auto mt-3 max-w-[400px] body-sm">
            VÉLORA đã ghi nhận đơn hàng <span className="text-ink">{order.id}</span>. Đây là bản demo nên
            chưa có email hay đơn vị vận chuyển nào được gửi đi.
          </p>
        </div>

        <div className="mt-8 rounded-[16px] border border-ink/[0.09] bg-cream/40 px-5 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-sans text-[10.5px] uppercase tracking-[0.12em] text-mocha">Mã đơn hàng</p>
              <p className="mt-1 font-sans text-[14px] font-medium">{order.id}</p>
            </div>
            <span className="rounded-full border border-ink/15 px-3 py-1.5 font-sans text-[10.5px] uppercase tracking-[0.08em] text-ink/75">
              {ORDER_STATUS_LABEL[order.status]}
            </span>
          </div>
          <p className="mt-2 font-sans text-[11px] text-smoke">
            Đặt lúc{' '}
            {created.toLocaleString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        <div className="mt-4 rounded-[16px] border border-ink/[0.09] px-5 py-5">
          <p className="font-sans text-[10.5px] uppercase tracking-[0.12em] text-mocha">Giao đến</p>
          <p className="mt-2 font-sans text-[13px] font-medium text-ink">
            {order.address.name} · {order.address.phone}
          </p>
          <p className="mt-1 flex items-start gap-1.5 font-sans text-[11.5px] leading-relaxed text-smoke">
            <PinIcon size={14} className="mt-0.5 shrink-0" />
            {order.address.street}, {order.address.ward}, {order.address.district}, {order.address.province}
          </p>
          <p className="mt-3 flex items-center gap-1.5 font-sans text-[11.5px] text-smoke">
            <TruckIcon size={14} /> Dự kiến giao trong 1–4 ngày làm việc
          </p>
        </div>

        <ul className="mt-4 divide-y divide-ink/[0.09] rounded-[16px] border border-ink/[0.09] px-5">
          {order.lines.map((l) => (
            <li key={l.key} className="flex gap-3 py-4">
              <div className="h-[72px] w-[56px] shrink-0 overflow-hidden rounded-[8px]">
                <GarmentArt kind={l.garment} color={l.colorHex} className="h-full w-full" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[12.5px] text-ink">{l.name}</p>
                <p className="font-sans text-[11px] text-smoke">
                  {l.size} · {l.colorName} · ×{l.qty}
                </p>
              </div>
              <p className="shrink-0 font-sans text-[12px] text-ink">{formatVND(l.price * l.qty)}</p>
            </li>
          ))}
        </ul>

        <dl className="mt-4 space-y-2.5 rounded-[16px] border border-ink/[0.09] px-5 py-4 font-sans text-[12.5px]">
          <div className="flex justify-between">
            <dt className="text-smoke">Tạm tính</dt>
            <dd>{formatVND(order.subtotal)}</dd>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between">
              <dt className="text-smoke">Giảm giá</dt>
              <dd className="text-[#4F7A5B]">−{formatVND(order.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-smoke">Phí vận chuyển</dt>
            <dd>{order.shippingFee === 0 ? 'Miễn phí' : formatVND(order.shippingFee)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-smoke">Thanh toán</dt>
            <dd>{order.paymentMethod}</dd>
          </div>
          <div className="flex items-baseline justify-between border-t border-ink/10 pt-3">
            <dt className="font-sans text-[11.5px] uppercase tracking-[0.1em]">Tổng cộng</dt>
            <dd className="font-sans text-[16px] font-medium">{formatVND(order.total)}</dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
          <Link to="/danh-muc" className="btn-outline flex-1">
            Tiếp tục mua sắm
          </Link>
          <Link to={user ? '/tai-khoan' : '/dang-nhap'} className="btn-dark flex-1">
            Xem đơn hàng
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className="h-6" />
      </div>
    </>
  );
}
