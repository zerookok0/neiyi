import type { Category, Collection } from './types';
import { IMG } from './types';

export const categories: Category[] = [
  // ---------- Nữ ----------
  {
    id: 'ao-nguc',
    name: 'Áo ngực',
    slug: 'ao-nguc',
    audience: 'women',
    tagline: 'Nâng niu từng đường cong',
    description:
      'Từ không gọng đến định hình nhẹ, mỗi thiết kế đều được cân chỉnh để bạn quên đi mình đang mặc gì.',
    garment: 'bra',
    color: '#D9BDAE',
    image: IMG.mood2,
  },
  {
    id: 'quan-lot-nu',
    name: 'Quần lót nữ',
    slug: 'quan-lot-nu',
    audience: 'women',
    tagline: 'Phẳng mịn dưới lớp áo',
    description: 'Đường may liền mạch, chất liệu modal và lụa pha giúp bạn thoải mái suốt cả ngày dài.',
    garment: 'panty',
    color: '#B98A83',
    image: IMG.mood4,
  },
  {
    id: 'do-mac-nha-nu',
    name: 'Đồ mặc nhà nữ',
    slug: 'do-mac-nha-nu',
    audience: 'women',
    tagline: 'Những giờ phút riêng tư',
    description:
      'Bộ đồ mặc nhà mềm như hơi thở, dành cho buổi sáng chậm rãi và những tối chỉ muốn ở nhà.',
    garment: 'camisole',
    color: '#E3C9B7',
    image: IMG.mood1,
  },
  {
    id: 'dinh-hinh',
    name: 'Đồ định hình',
    slug: 'dinh-hinh',
    audience: 'women',
    tagline: 'Đường nét thanh thoát',
    description: 'Định hình vừa đủ, không gò bó — để bạn tự tin trong từng bộ trang phục.',
    garment: 'shapewear',
    color: '#9A9793',
    image: IMG.mood5,
  },
  // ---------- Nam ----------
  {
    id: 'quan-lot-nam',
    name: 'Quần lót nam',
    slug: 'quan-lot-nam',
    audience: 'men',
    tagline: 'Thoáng mát cả ngày dài',
    description:
      'Trunk và boxer brief cotton-modal, có túi nâng đỡ định hình và đường may phẳng không cấn.',
    garment: 'trunk',
    color: '#3A3B3D',
    image: IMG.mood6,
  },
  {
    id: 'ao-lot-nam',
    name: 'Áo lót nam',
    slug: 'ao-lot-nam',
    audience: 'men',
    tagline: 'Lớp trong tối giản',
    description: 'Áo ba lỗ và áo lót cổ tròn cotton thoáng khí, giữ phom sau nhiều lần giặt.',
    garment: 'vest',
    color: '#EFE6DA',
    image: IMG.mood3,
  },
  {
    id: 'ao-thun-nam',
    name: 'Áo thun nam',
    slug: 'ao-thun-nam',
    audience: 'men',
    tagline: 'Chạm mát quanh năm',
    description: 'Áo thun cotton hữu cơ và modal, phom suông thoải mái cho ngày làm việc lẫn cuối tuần.',
    garment: 'vest',
    color: '#2F3437',
    image: IMG.mood7,
  },
  {
    id: 'do-mac-nha-nam',
    name: 'Đồ mặc nhà nam',
    slug: 'do-mac-nha-nam',
    audience: 'men',
    tagline: 'Thư giãn đúng nghĩa',
    description: 'Bộ pajama và quần đùi mặc nhà vải modal rủ mềm, cạp chun êm không hằn.',
    garment: 'boxer',
    color: '#8C8580',
    image: IMG.mood8,
  },
];

export const collections: Collection[] = [
  {
    id: 'essential-soft',
    name: 'Essential Soft',
    kicker: 'Dòng cơ bản nâng cấp',
    description: 'Chất vải cotton lụa mịn, phom ôm vừa vặn cho mọi ngày.',
  },
  {
    id: 'modal-premium',
    name: 'Modal Premium',
    kicker: 'Chạm mát quanh năm',
    description: 'Sợi modal từ bạch đàn, mát tay và giữ phom sau nhiều lần giặt.',
  },
  {
    id: 'daily-motion',
    name: 'Daily Motion',
    kicker: 'Dành cho nam giới',
    description: 'Co giãn bốn chiều, túi nâng đỡ định hình, đường may phẳng.',
  },
  {
    id: 'thu-dong-2025',
    name: 'Thu Đông 2025',
    kicker: 'Bộ sưu tập theo mùa',
    description: 'Tông mocha trầm, ghi xám và kem sữa cho tiết trời se lạnh.',
  },
];

export const benefits = [
  {
    title: 'Mềm mại',
    description: 'Chất liệu mềm mịn chạm da, không đường may cấn.',
    icon: 'soft' as const,
  },
  {
    title: 'Thoáng khí',
    description: 'Sợi dệt thoát ẩm, khô nhanh suốt ngày dài.',
    icon: 'air' as const,
  },
  {
    title: 'Ôm vừa vặn',
    description: 'Phom được cân chỉnh theo số đo người Việt.',
    icon: 'fit' as const,
  },
  {
    title: 'Không đường viền',
    description: 'Đường may phẳng, không lộ dưới lớp áo ngoài.',
    icon: 'nopush' as const,
  },
];

export const testimonials = [
  {
    quote:
      'Mình mặc cả ngày mà gần như không cảm thấy sự hiện diện của chiếc áo. Đường may rất mềm, đúng như những gì VÉLORA nói.',
    name: 'Ngọc Anh',
    city: 'Quận 3, TP.HCM',
    product: 'Áo ngực Comfort Fit',
  },
  {
    quote:
      'Mua bộ trunk cho chồng, anh ấy bảo mặc thoáng hơn hẳn loại đang dùng. Cạp chun không hằn nên mặc cả ngày vẫn dễ chịu.',
    name: 'Thu Hà',
    city: 'Cầu Giấy, Hà Nội',
    product: 'Trunk Daily Motion',
  },
  {
    quote:
      'Đóng gói rất cẩn thận, có cả thiệp viết tay. Cảm giác được chăm sóc chứ không chỉ là một đơn hàng.',
    name: 'Minh Thư',
    city: 'Hải Châu, Đà Nẵng',
    product: 'Bộ mặc nhà Morning',
  },
  {
    quote:
      'Đặt ba chiếc vest cotton, giặt máy mấy lần vẫn không giãn cổ. Đây là lần đầu mình mua lại cùng một món.',
    name: 'Quốc Bảo',
    city: 'Thanh Xuân, Hà Nội',
    product: 'Áo lót Ribbed Cotton',
  },
];

export const faqs = [
  {
    q: 'Làm sao để chọn đúng size?',
    a: 'Với áo ngực, bạn đo vòng chân ngực và vòng đỉnh ngực rồi đối chiếu bảng size ở từng sản phẩm. Với quần lót và áo nam, số đo vòng eo và vòng hông là quan trọng nhất. Nếu số đo nằm giữa hai size, nên chọn size lớn hơn.',
  },
  {
    q: 'VÉLORA giao hàng trong bao lâu?',
    a: 'Nội thành TP.HCM và Hà Nội: 1–2 ngày làm việc. Các tỉnh thành khác: 2–4 ngày làm việc. Đơn từ 1.500.000₫ được miễn phí vận chuyển toàn quốc.',
  },
  {
    q: 'Tôi có thể đổi size hoặc đổi sản phẩm không?',
    a: 'Có. VÉLORA hỗ trợ đổi size một lần trong 07 ngày kể từ khi nhận hàng, với điều kiện sản phẩm còn nguyên tem mác, chưa giặt và chưa qua sử dụng.',
  },
  {
    q: 'Sản phẩm có an toàn cho da nhạy cảm không?',
    a: 'Toàn bộ chất liệu tiếp xúc trực tiếp với da đều đạt chứng nhận an toàn, không chứa formaldehyde và được giặt sạch trước khi đóng gói.',
  },
];
