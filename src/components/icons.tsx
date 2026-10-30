import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 20): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.35,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const SearchIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="11" cy="11" r="6.4" />
    <path d="m16 16 4 4" />
  </svg>
);

export const BagIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M6.2 7.6h11.6l-.9 12.1a1.6 1.6 0 0 1-1.6 1.5H8.7a1.6 1.6 0 0 1-1.6-1.5L6.2 7.6Z" />
    <path d="M9.2 9.6V6.9a2.8 2.8 0 0 1 5.6 0v2.7" />
  </svg>
);

export const MenuIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M3.6 7h16.8M3.6 12h12.8M3.6 17h16.8" />
  </svg>
);

export const HomeIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4 10.6 12 4l8 6.6V19a1.4 1.4 0 0 1-1.4 1.4h-3.3v-5.7H8.7v5.7H5.4A1.4 1.4 0 0 1 4 19v-8.4Z" />
  </svg>
);

export const GridIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="3.8" y="3.8" width="6.6" height="6.6" rx="1.6" />
    <rect x="13.6" y="3.8" width="6.6" height="6.6" rx="1.6" />
    <rect x="3.8" y="13.6" width="6.6" height="6.6" rx="1.6" />
    <rect x="13.6" y="13.6" width="6.6" height="6.6" rx="1.6" />
  </svg>
);

export const HeartIcon = ({ size, filled, ...p }: IconProps & { filled?: boolean }) => (
  <svg {...base(size)} {...p} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20.2S3.9 15.4 3.9 9.9A4.5 4.5 0 0 1 12 6.9a4.5 4.5 0 0 1 8.1 3c0 5.5-8.1 10.3-8.1 10.3Z" />
  </svg>
);

export const UserIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="8.4" r="3.9" />
    <path d="M4.8 20.3a7.3 7.3 0 0 1 14.4 0" />
  </svg>
);

export const ArrowRight = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4.5 12h15M13.4 6l6 6-6 6" />
  </svg>
);

export const ArrowLeft = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M19.5 12h-15M10.6 6l-6 6 6 6" />
  </svg>
);

export const ChevronDown = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const CloseIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const FilterIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4 7.2h16M7 12h10M10 16.8h4" />
  </svg>
);

export const StarIcon = ({ size = 14, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 3.6l2.5 5.4 5.9.7-4.4 4 1.2 5.8L12 16.6l-5.2 2.9 1.2-5.8-4.4-4 5.9-.7z" />
  </svg>
);

export const TrashIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4.6 7.2h14.8M9.4 7.2V5.4a1.2 1.2 0 0 1 1.2-1.2h2.8a1.2 1.2 0 0 1 1.2 1.2v1.8" />
    <path d="M6.6 7.2l.9 12a1.4 1.4 0 0 0 1.4 1.3h6.2a1.4 1.4 0 0 0 1.4-1.3l.9-12" />
  </svg>
);

export const CheckIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="m5 12.6 4.4 4.4L19 6.8" />
  </svg>
);

export const TruckIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M3.6 6.6h9.6v9.6H3.6zM13.2 10.2h3.6l3.6 3.2v2.8h-7.2z" />
    <circle cx="7" cy="18" r="1.7" />
    <circle cx="16.8" cy="18" r="1.7" />
  </svg>
);

export const ShieldIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3.4l6.9 2.5v5.5c0 4.3-2.8 7.4-6.9 9.2-4.1-1.8-6.9-4.9-6.9-9.2V5.9z" />
    <path d="m9.2 11.8 2 2 3.7-3.9" />
  </svg>
);

export const RefreshIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M20 12a8 8 0 1 1-2.6-5.9" />
    <path d="M20.2 4.4v4.2h-4.2" />
  </svg>
);

export const LeafIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M20 4c0 8-5 13-11.4 13H5.6C5.6 9.6 11 4 20 4Z" />
    <path d="M4 20c1.4-4.6 4.8-8 9.4-10" />
  </svg>
);

export const RulerIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="2.6" y="8.4" width="18.8" height="7.2" rx="1.6" />
    <path d="M7 8.4v3M11 8.4v2.2M15 8.4v3M19 8.4v2.2" />
  </svg>
);

export const PlusIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M5 12h14" />
  </svg>
);

export const LogoutIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M14.6 5.4H18a1.6 1.6 0 0 1 1.6 1.6v10a1.6 1.6 0 0 1-1.6 1.6h-3.4" />
    <path d="M11 8.4 7.6 12l3.4 3.6M7.6 12h8.6" />
  </svg>
);

export const PinIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 21s6.4-5.6 6.4-10.4A6.4 6.4 0 0 0 5.6 10.6C5.6 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.4" r="2.4" />
  </svg>
);

/* Category glyphs — thin line, designed for the circular category tiles */
export const BraGlyph = ({ size = 26, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M2.8 6.4c2.4-.6 5 .3 7.4 2.4a6 6 0 0 1 3.6 0c2.4-2.1 5-3 7.4-2.4" />
    <path d="M12.6 8.6c1.6 1 1.6 4.6 0 6.2-1.6-1.6-1.6-5.2 0-6.2Z" />
    <path d="M2.8 6.4c0 4 1.8 8.4 5.6 8.4 2 0 3.6-2 3.6-6.2M21.2 6.4c0 4-1.8 8.4-5.6 8.4-2 0-3.6-2-3.6-6.2" />
  </svg>
);

export const PantyGlyph = ({ size = 26, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M5.4 5.6h13.2l-1.2 6.2c-.7 3.7-2.3 6.6-5.4 6.6s-4.7-2.9-5.4-6.6L5.4 5.6Z" />
    <path d="M9.4 5.6c.5 2.6 1.3 4 2.6 4s2.1-1.4 2.6-4" />
  </svg>
);

export const HomewearGlyph = ({ size = 26, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M8.6 3.6 3.6 7v6.4M15.4 3.6 20.4 7v6.4" />
    <path d="M8.6 3.6 12 8.4l3.4-4.8M9.2 9.4 8 20.4h8L14.8 9.4" />
  </svg>
);

export const ShapewearGlyph = ({ size = 26, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M9.4 3.8h5.2l-.8 4.4c1.6 2.6 2.2 5.4 2.2 8.2l-1.4 3.8H9.4L8 16.4c0-2.8.6-5.6 2.2-8.2L9.4 3.8Z" />
    <path d="M9.6 11.6h4.8" />
  </svg>
);

export const CollectionGlyph = ({ size = 26, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="3.8" y="3.8" width="7" height="7" rx="1.4" />
    <rect x="13.2" y="3.8" width="7" height="7" rx="1.4" />
    <rect x="3.8" y="13.2" width="7" height="7" rx="1.4" />
    <path d="M16.7 13.4v6.8M13.3 16.8h6.8" />
  </svg>
);
