import { Link } from 'react-router-dom';
import { Wordmark } from './Wordmark';
import { ArrowRight } from './icons';

const columns = [
  {
    title: 'Sản phẩm',
    links: [
      { label: 'Áo ngực', to: '/danh-muc/ao-nguc' },
      { label: 'Quần lót', to: '/danh-muc/quan-lot' },
      { label: 'Đồ mặc nhà', to: '/danh-muc/do-mac-nha' },
      { label: 'Đồ định hình', to: '/danh-muc/do-dinh-hinh' },
      { label: 'Bộ sưu tập mới', to: '/danh-muc/bo-suu-tap-moi' },
    ],
  },
  {
    title: 'VÉLORA',
    links: [
      { label: 'Câu chuyện thương hiệu', to: '/cau-chuyen' },
      { label: 'Chất liệu & chế tác', to: '/cau-chuyen#chat-lieu' },
      { label: 'Liên hệ', to: '/lien-he' },
      { label: 'Tài khoản', to: '/tai-khoan' },
    ],
  },
  {
    title: 'Hỗ trợ',
    links: [
      { label: 'Hướng dẫn chọn size', to: '/danh-muc/ao-nguc' },
      { label: 'Chính sách đổi trả', to: '/lien-he#doi-tra' },
      { label: 'Vận chuyển', to: '/lien-he#van-chuyen' },
      { label: 'Câu hỏi thường gặp', to: '/lien-he#faq' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/[0.08] bg-cream/50 pb-24 pt-14 md:pb-14">
      <div className="mx-auto w-full max-w-[1180px] px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-8">
          <div>
            <Wordmark className="text-[16px]" />
            <p className="mt-4 max-w-[280px] body-sm">
              Đồ lót nữ cao cấp, may tại TP.HCM. Dịu dàng trên da và tự tin trong từng khoảnh khắc.
            </p>
            <div className="mt-6 flex flex-col gap-1.5 body-sm">
              <a href="tel:19002828" className="hover:text-ink">
                1900 2828
              </a>
              <a href="mailto:xinchao@velora.vn" className="hover:text-ink">
                xinchao@velora.vn
              </a>
              <span>85 Lý Tự Trọng, Quận 1, TP.HCM</span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="font-sans text-[12.5px] text-ink/65 transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-ink/10 pt-7 md:flex-row md:items-center md:justify-between">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-[380px] items-center gap-2 border-b border-ink/25 pb-2"
          >
            <input
              type="email"
              required
              placeholder="Email để nhận tin từ VÉLORA"
              aria-label="Email đăng ký nhận tin"
              className="w-full bg-transparent font-sans text-[13px] outline-none placeholder:text-smoke/60"
            />
            <button type="submit" aria-label="Đăng ký nhận tin" className="text-ink/60 hover:text-ink">
              <ArrowRight size={17} />
            </button>
          </form>
          <p className="font-sans text-[10.5px] uppercase tracking-wide2 text-smoke/75">
            © 2025 VÉLORA · Made in Vietnam
          </p>
        </div>
      </div>
    </footer>
  );
}
