import { Link } from 'react-router-dom';
import { PageTopBar, usePageTitle } from '../components/PageTopBar';
import { Reveal } from '../components/Reveal';
import { ArrowRight, LeafIcon, ShieldIcon, RefreshIcon } from '../components/icons';
import { IMG } from '../data/types';
import { Newsletter } from './HomePage';

export function StoryPage() {
  usePageTitle('Câu chuyện VÉLORA');

  return (
    <>
      {/* Editorial opening */}
      <section className="relative h-[78svh] min-h-[460px] w-full overflow-hidden bg-ink">
        <img
          src={IMG.mood6}
          alt="Câu chuyện VÉLORA"
          className="editorial-img h-full w-full object-cover animate-kenburns"
          style={{ objectPosition: '50% 30%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/45" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 text-ivory md:px-[7vw] md:pb-16">
          <p className="animate-fadeIn font-sans text-[10px] uppercase tracking-wide3 text-ivory/70">
            Câu chuyện của chúng tôi
          </p>
          <h1 className="display-xl mt-4 max-w-[520px] animate-riseIn">
            Thấu hiểu
            <br />
            cơ thể bạn.
          </h1>
          <p className="mt-5 max-w-[330px] animate-riseIn font-sans text-[13px] leading-relaxed text-ivory/75">
            VÉLORA ra đời tại Sài Gòn năm 2023, từ một câu hỏi rất đơn giản: vì sao đồ lót đẹp lại phải
            đánh đổi bằng sự khó chịu?
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[760px] px-5 py-12 md:px-8 md:py-20">
        <Reveal>
          <p className="eyebrow">Khởi đầu</p>
          <p className="mt-4 font-serif text-[21px] font-light leading-relaxed text-ink/85 md:text-[25px]">
            “Chúng tôi bắt đầu bằng việc lắng nghe — hơn 2.000 cuộc trò chuyện với phụ nữ Việt về cảm
            giác thật của họ khi mặc đồ lót.”
          </p>
          <div className="mt-6 space-y-4 body-sm">
            <p>
              Những chiếc áo hằn vai sau tám giờ làm việc. Những đường may lộ ra dưới lớp sơ mi. Những
              vùng da ngứa sau một ngày oi bức. Những lần chọn size mà không ai hướng dẫn. Chúng tôi ghi
              lại tất cả, rồi bắt đầu lại từ đầu: thiết kế lại phom, chọn lại chất liệu, may thử, mặc thử.
            </p>
            <p>
              VÉLORA không cố gắng làm ra món đồ lót “quyến rũ nhất”. Chúng tôi muốn làm ra món đồ lót mà
              bạn quên mình đang mặc — và đến khi nhận ra, bạn thấy mình dễ chịu, tự tin, đúng là chính
              mình.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Image band */}
      <Reveal>
        <div className="mx-auto w-full max-w-[1180px] px-4 md:px-8">
          <div className="media aspect-[16/10] rounded-[18px] md:aspect-[21/9]">
            <img src={IMG.mood3} alt="VÉLORA — dịu dàng và tự do" className="editorial-img" loading="lazy" />
          </div>
        </div>
      </Reveal>

      {/* Materials */}
      <section id="chat-lieu" className="mx-auto mt-12 w-full max-w-[1180px] scroll-mt-28 px-4 md:mt-20 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 md:gap-14">
          <Reveal>
            <div className="media aspect-[4/5] rounded-[18px]">
              <img src={IMG.textile1} alt="Chất liệu VÉLORA" className="editorial-img" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={100} className="md:pt-8">
            <p className="eyebrow">Chất liệu</p>
            <h2 className="display-md mt-3">Chạm vào là hiểu.</h2>
            <p className="mt-4 body-sm">
              Chúng tôi chọn chất liệu bằng cảm giác trước, rồi mới đến thông số kỹ thuật. Mỗi loại vải
              đều phải qua bài kiểm tra mặc thử 30 ngày trong điều kiện khí hậu nóng ẩm của Việt Nam.
            </p>
            <ul className="mt-6 space-y-4">
              {[
                {
                  icon: LeafIcon,
                  t: 'Cotton lụa hữu cơ',
                  d: 'Bề mặt mịn như lụa, thấm hút tốt, không xơ sau nhiều lần giặt.',
                },
                {
                  icon: RefreshIcon,
                  t: 'Modal từ bạch đàn',
                  d: 'Sợi mát lạnh tự nhiên, rủ mềm, phù hợp khí hậu nóng ẩm quanh năm.',
                },
                {
                  icon: ShieldIcon,
                  t: 'Ren dệt Pháp',
                  d: 'Hoa văn mềm, không cấn da, được kiểm tra từng cuộn trước khi cắt.',
                },
              ].map((f) => (
                <li key={f.t} className="flex gap-3.5 border-b border-ink/[0.08] pb-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream/70 text-mocha">
                    <f.icon size={17} />
                  </span>
                  <div>
                    <p className="font-sans text-[12.5px] font-medium text-ink">{f.t}</p>
                    <p className="mt-1 font-sans text-[11.5px] leading-relaxed text-smoke">{f.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Craft */}
      <section className="mx-auto mt-12 w-full max-w-[1180px] px-4 md:mt-20 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 md:gap-14">
          <Reveal className="md:order-2">
            <div className="media aspect-[4/5] rounded-[18px]">
              <img src={IMG.textile3} alt="Xưởng may VÉLORA tại TP.HCM" className="editorial-img" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={100} className="md:order-1 md:pt-8">
            <p className="eyebrow">Chế tác</p>
            <h2 className="display-md mt-3">May tại TP.HCM, kiểm tra thủ công.</h2>
            <p className="mt-4 body-sm">
              VÉLORA làm việc với một xưởng may gia đình nhỏ ở Quận 12. Mỗi sản phẩm đều được một người thợ
              phụ trách từ đầu đến cuối, sau đó kiểm tra lại lần hai trước khi gấp và đóng gói.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {[
                { k: '2.000+', v: 'khách hàng đầu tiên tham gia thử phom' },
                { k: '30 ngày', v: 'mặc thử mỗi mẫu trước khi sản xuất' },
                { k: '07 ngày', v: 'đổi size miễn phí, không cần lý do' },
                { k: '100%', v: 'bao bì giấy tái chế, không nhựa' },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="font-serif text-[24px] leading-none">{s.k}</dt>
                  <dd className="mt-1.5 font-sans text-[11px] leading-relaxed text-smoke">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto mt-14 w-full max-w-[760px] px-5 md:px-8">
        <Reveal>
          <blockquote className="border-l border-ink/20 pl-5 font-serif text-[20px] font-light italic leading-relaxed text-ink/80 md:text-[24px]">
            “Sự thoải mái không phải là điều xa xỉ. Đó là điều kiện đầu tiên để một người phụ nữ cảm thấy
            tự tin là chính mình.”
          </blockquote>
          <p className="mt-3 pl-5 font-sans text-[10.5px] uppercase tracking-[0.14em] text-taupe">
            Đội ngũ thiết kế VÉLORA
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-[760px] flex-col gap-2.5 px-5 sm:flex-row md:px-8">
        <Link to="/danh-muc" className="btn-dark flex-1">
          Xem sản phẩm
          <ArrowRight size={15} />
        </Link>
        <Link to="/lien-he" className="btn-outline flex-1">
          Liên hệ với VÉLORA
        </Link>
      </div>

      <Newsletter />
      <div className="h-10" />
    </>
  );
}

export function ContactPage() {
  usePageTitle('Liên hệ');
  const faqs = [
    {
      q: 'Làm sao để chọn đúng size?',
      a: 'Bạn đo vòng chân ngực và vòng đỉnh ngực rồi đối chiếu bảng size ở từng sản phẩm. Nếu chưa chắc, gọi 1900 2828 để được tư vấn trực tiếp.',
    },
    {
      q: 'Giao hàng mất bao lâu?',
      a: 'Nội thành TP.HCM và Hà Nội: 1–2 ngày làm việc. Tỉnh thành khác: 2–4 ngày làm việc. Miễn phí vận chuyển cho đơn từ 1.500.000₫.',
    },
    {
      q: 'Chính sách đổi trả thế nào?',
      a: 'Đổi size miễn phí 1 lần trong 07 ngày kể từ khi nhận hàng, sản phẩm còn nguyên tem mác và chưa qua sử dụng.',
    },
    {
      q: 'Có cửa hàng để thử trực tiếp không?',
      a: 'Hiện VÉLORA có một showroom tại 85 Lý Tự Trọng, Quận 1, TP.HCM. Bạn nên đặt lịch trước để được tư vấn riêng.',
    },
  ];

  return (
    <>
      <PageTopBar backTo="/" title="Liên hệ & hỗ trợ" />
      <div className="mx-auto w-full max-w-[900px] px-5 py-8 md:px-8 md:py-14">
        <p className="eyebrow">Chúng tôi ở đây</p>
        <h1 className="display-md mt-2">Liên hệ & hỗ trợ</h1>
        <p className="mt-3 max-w-[440px] body-sm">
          Đội ngũ VÉLORA trả lời trong vòng 2 giờ làm việc. Bạn có thể gọi, nhắn Zalo hoặc gửi email —
          chúng tôi đọc hết.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { t: 'Hotline', v: '1900 2828', d: '9:00 – 21:00 hằng ngày', href: 'tel:19002828' },
            { t: 'Email', v: 'xinchao@velora.vn', d: 'Phản hồi trong 2 giờ làm việc', href: 'mailto:xinchao@velora.vn' },
            { t: 'Showroom', v: '85 Lý Tự Trọng', d: 'Quận 1, TP.HCM', href: '#showroom' },
          ].map((c) => (
            <a
              key={c.t}
              href={c.href}
              className="rounded-[14px] border border-ink/[0.09] px-4 py-4 transition-colors hover:border-ink/30"
            >
              <p className="font-sans text-[9.5px] uppercase tracking-[0.14em] text-taupe">{c.t}</p>
              <p className="mt-1.5 font-serif text-[18px] leading-tight">{c.v}</p>
              <p className="mt-1 font-sans text-[11px] text-smoke">{c.d}</p>
            </a>
          ))}
        </div>

        <section id="van-chuyen" className="mt-10 scroll-mt-28">
          <h2 className="section-title">Vận chuyển</h2>
          <div className="mt-3 space-y-2 body-sm">
            <p>Nội thành TP.HCM & Hà Nội: 1–2 ngày làm việc.</p>
            <p>Các tỉnh thành khác: 2–4 ngày làm việc.</p>
            <p>Phí vận chuyển 35.000₫, miễn phí cho đơn từ 1.500.000₫.</p>
          </div>
        </section>

        <section id="doi-tra" className="mt-9 scroll-mt-28">
          <h2 className="section-title">Đổi trả</h2>
          <div className="mt-3 space-y-2 body-sm">
            <p>Đổi size miễn phí 1 lần trong 07 ngày kể từ khi nhận hàng.</p>
            <p>Sản phẩm cần còn nguyên tem mác, chưa giặt và chưa qua sử dụng.</p>
            <p>VÉLORA chịu phí vận chuyển hai chiều cho lần đổi size đầu tiên.</p>
          </div>
        </section>

        <section id="faq" className="mt-9 scroll-mt-28">
          <h2 className="section-title">Câu hỏi thường gặp</h2>
          <div className="mt-3 divide-y divide-ink/[0.09] border-y border-ink/[0.09]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-sans text-[12.5px] font-medium text-ink">{f.q}</span>
                  <span className="relative h-3 w-3 shrink-0">
                    <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-ink/50" />
                    <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-ink/50 transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="mt-2.5 font-sans text-[12px] leading-relaxed text-smoke">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="showroom" className="mt-10 scroll-mt-28">
          <div className="overflow-hidden rounded-[16px] border border-ink/[0.09]">
            <div className="media aspect-[16/9]">
              <img src={IMG.textile4} alt="Showroom VÉLORA" className="editorial-img" loading="lazy" />
            </div>
            <div className="px-5 py-5">
              <p className="font-sans text-[9.5px] uppercase tracking-[0.14em] text-taupe">Showroom</p>
              <p className="mt-1.5 font-serif text-[19px]">VÉLORA · 85 Lý Tự Trọng, Quận 1, TP.HCM</p>
              <p className="mt-1.5 body-sm">
                Mở cửa 10:00 – 20:00 hằng ngày. Có phòng thử riêng và nhân viên tư vấn size. Nên đặt lịch
                trước vào cuối tuần.
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="h-8" />
    </>
  );
}
