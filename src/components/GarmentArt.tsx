import { useId } from 'react';

/**
 * Deterministic product artwork.
 *
 * Stock photography cannot be verified for garment accuracy, so every product
 * silhouette is drawn here instead: colour, cut and construction are always
 * correct and match the product record exactly.
 */

export type GarmentKind =
  | 'bra'
  | 'bralette'
  | 'panty'
  | 'brief'
  | 'boxer'
  | 'trunk'
  | 'camisole'
  | 'pajama'
  | 'shapewear'
  | 'vest';

type Props = {
  kind: GarmentKind;
  color: string;
  /** Secondary tone for trim, lace and stitching. */
  accent?: string;
  className?: string;
  /** Fabric name shown as a micro-caption inside the artwork. */
  label?: string;
};

const shade = (hex: string, amount: number) => {
  const n = parseInt(hex.replace('#', ''), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const r = clamp(((n >> 16) & 255) + amount);
  const g = clamp(((n >> 8) & 255) + amount);
  const b = clamp((n & 255) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

export function GarmentArt({ kind, color, accent, className, label }: Props) {
  const uid = useId().replace(/:/g, '');
  const light = shade(color, 26);
  const dark = shade(color, -30);
  const trim = accent ?? shade(color, -12);
  const seam = shade(color, -46);

  return (
    <svg
      viewBox="0 0 300 400"
      className={className}
      role="img"
      aria-label={label ? `Minh hoạ sản phẩm ${label}` : 'Minh hoạ sản phẩm'}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`fab-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="48%" stopColor={color} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
        <linearGradient id={`sheen-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
        </linearGradient>
        <filter id={`soft-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#231d18" floodOpacity="0.16" />
        </filter>
      </defs>

      {/* Studio backdrop */}
      <rect width="300" height="400" fill="#F3ECE3" />
      <rect width="300" height="400" fill={`url(#sheen-${uid})`} opacity="0.5" />
      <ellipse cx="150" cy="352" rx="104" ry="16" fill="#231d18" opacity="0.07" />

      <g filter={`url(#soft-${uid})`}>{renderGarment(kind, { light, color, dark, trim, seam, uid })}</g>
    </svg>
  );
}

type Palette = {
  light: string;
  color: string;
  dark: string;
  trim: string;
  seam: string;
  uid: string;
};

function fill(uid: string) {
  return `url(#fab-${uid})`;
}

function renderGarment(kind: GarmentKind, p: Palette) {
  const body = fill(p.uid);

  switch (kind) {
    case 'bra':
      return (
        <>
          {/* Straps */}
          <path d="M104 132 L96 66" stroke={p.trim} strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M196 132 L204 66" stroke={p.trim} strokeWidth="7" strokeLinecap="round" fill="none" />
          {/* Cups */}
          <path
            d="M150 158 C150 118 126 100 104 104 C82 108 74 136 80 162 C88 194 118 210 150 214 Z"
            fill={body}
            stroke={p.seam}
            strokeOpacity="0.35"
            strokeWidth="1.2"
          />
          <path
            d="M150 158 C150 118 174 100 196 104 C218 108 226 136 220 162 C212 194 182 210 150 214 Z"
            fill={body}
            stroke={p.seam}
            strokeOpacity="0.35"
            strokeWidth="1.2"
          />
          {/* Cup seams */}
          <path d="M150 158 C132 170 112 184 110 208" stroke={p.seam} strokeOpacity="0.3" strokeWidth="1.1" fill="none" />
          <path d="M150 158 C168 170 188 184 190 208" stroke={p.seam} strokeOpacity="0.3" strokeWidth="1.1" fill="none" />
          {/* Underband */}
          <path d="M78 164 C104 190 130 202 150 204 C170 202 196 190 222 164" stroke={p.trim} strokeWidth="9" strokeLinecap="round" fill="none" />
          {/* Centre bow */}
          <circle cx="150" cy="196" r="4" fill={p.trim} opacity="0.85" />
        </>
      );

    case 'bralette':
      return (
        <>
          <path d="M110 116 L98 74" stroke={p.trim} strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M190 116 L202 74" stroke={p.trim} strokeWidth="6" strokeLinecap="round" fill="none" />
          <path
            d="M150 160 C146 124 128 106 108 110 C88 114 82 140 88 164 C96 194 122 208 150 212 C178 208 204 194 212 164 C218 140 212 114 192 110 C172 106 154 124 150 160 Z"
            fill={body}
          />
          <path d="M150 160 L150 210" stroke={p.seam} strokeOpacity="0.22" strokeWidth="1.2" />
          <path d="M86 166 C110 190 132 200 150 202 C168 200 190 190 214 166" stroke={p.trim} strokeWidth="7" strokeLinecap="round" fill="none" />
        </>
      );

    case 'panty':
      return (
        <>
          <path
            d="M92 132 L208 132 L199 168 C193 206 176 250 150 264 C124 250 107 206 101 168 Z"
            fill={body}
            stroke={p.seam}
            strokeOpacity="0.25"
            strokeWidth="1.2"
          />
          {/* Waistband */}
          <path d="M92 132 L208 132" stroke={p.trim} strokeWidth="9" strokeLinecap="round" />
          {/* Leg openings */}
          <path d="M101 168 C126 178 174 178 199 168" stroke={p.seam} strokeOpacity="0.3" strokeWidth="1.4" fill="none" />
          {/* Side bow */}
          <circle cx="97" cy="146" r="3.4" fill={p.trim} opacity="0.8" />
        </>
      );

    case 'brief':
      return (
        <>
          <path
            d="M78 126 L222 126 L214 168 C206 214 182 258 150 272 C118 258 94 214 86 168 Z"
            fill={body}
          />
          <path d="M78 126 L222 126" stroke={p.trim} strokeWidth="13" strokeLinecap="round" />
          <path d="M86 168 C120 184 180 184 214 168" stroke={p.seam} strokeOpacity="0.35" strokeWidth="1.8" fill="none" />
          <path d="M150 182 L150 266" stroke={p.seam} strokeOpacity="0.16" strokeWidth="1.2" />
        </>
      );

    case 'boxer':
      return (
        <>
          <path
            d="M62 112 L238 112 L236 146 L228 244 L176 244 L168 178 L132 178 L124 244 L72 244 L64 146 Z"
            fill={body}
            stroke={p.seam}
            strokeOpacity="0.2"
            strokeWidth="1.2"
          />
          <path d="M62 112 L238 112" stroke={p.trim} strokeWidth="15" strokeLinecap="round" />
          {/* Fly */}
          <path d="M150 130 L150 172" stroke={p.seam} strokeOpacity="0.3" strokeWidth="1.6" />
          <path d="M150 130 C162 134 168 142 166 152" stroke={p.seam} strokeOpacity="0.22" strokeWidth="1.4" fill="none" />
          {/* Leg hems */}
          <path d="M72 236 L124 236" stroke={p.trim} strokeWidth="6" strokeLinecap="round" />
          <path d="M176 236 L228 236" stroke={p.trim} strokeWidth="6" strokeLinecap="round" />
        </>
      );

    case 'trunk':
      return (
        <>
          <path
            d="M70 118 L230 118 L228 154 L220 214 L172 214 L166 176 L134 176 L128 214 L80 214 L72 154 Z"
            fill={body}
          />
          <path d="M70 118 L230 118" stroke={p.trim} strokeWidth="16" strokeLinecap="round" />
          <path d="M80 206 L128 206" stroke={p.trim} strokeWidth="5" strokeLinecap="round" />
          <path d="M172 206 L220 206" stroke={p.trim} strokeWidth="5" strokeLinecap="round" />
          <path d="M150 134 L150 172" stroke={p.seam} strokeOpacity="0.28" strokeWidth="1.4" />
        </>
      );

    case 'camisole':
      return (
        <>
          <path d="M118 96 L112 58" stroke={p.trim} strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M182 96 L188 58" stroke={p.trim} strokeWidth="5" strokeLinecap="round" fill="none" />
          <path
            d="M104 104 C120 96 136 92 150 92 C164 92 180 96 196 104 L206 252 C186 262 164 266 150 266 C136 266 114 262 94 252 Z"
            fill={body}
          />
          <path d="M104 104 C120 96 136 92 150 92 C164 92 180 96 196 104" stroke={p.trim} strokeWidth="6" fill="none" />
          <path d="M94 252 C114 262 136 266 150 266 C164 266 186 262 206 252" stroke={p.trim} strokeWidth="5" fill="none" strokeOpacity="0.8" />
        </>
      );

    case 'pajama':
      return (
        <>
          <path
            d="M96 78 L128 68 C136 88 164 88 172 68 L204 78 L214 130 L190 138 L188 268 L112 268 L110 138 L86 130 Z"
            fill={body}
            stroke={p.seam}
            strokeOpacity="0.22"
            strokeWidth="1.2"
          />
          <path d="M128 68 C136 88 164 88 172 68" stroke={p.trim} strokeWidth="5" fill="none" />
          <path d="M150 74 L150 268" stroke={p.seam} strokeOpacity="0.3" strokeWidth="1.6" />
          <path d="M112 268 L188 268" stroke={p.trim} strokeWidth="5" strokeLinecap="round" />
          <circle cx="150" cy="120" r="2.6" fill={p.trim} opacity="0.75" />
          <circle cx="150" cy="152" r="2.6" fill={p.trim} opacity="0.75" />
        </>
      );

    case 'shapewear':
      return (
        <>
          <path
            d="M104 84 L126 74 C134 92 166 92 174 74 L196 84 C204 120 206 150 200 178 C196 210 184 244 150 264 C116 244 104 210 100 178 C94 150 96 120 104 84 Z"
            fill={body}
          />
          <path d="M126 74 C134 92 166 92 174 74" stroke={p.trim} strokeWidth="6" fill="none" />
          <path d="M150 100 L150 262" stroke={p.seam} strokeOpacity="0.2" strokeWidth="1.4" />
          <path d="M104 150 C126 158 174 158 196 150" stroke={p.seam} strokeOpacity="0.24" strokeWidth="1.4" fill="none" />
          <path d="M110 210 C130 220 170 220 190 210" stroke={p.seam} strokeOpacity="0.2" strokeWidth="1.2" fill="none" />
        </>
      );

    case 'vest':
      return (
        <>
          <path
            d="M108 86 L132 72 C140 96 160 96 168 72 L192 86 C200 130 202 180 198 232 L102 232 C98 180 100 130 108 86 Z"
            fill={body}
          />
          <path d="M132 72 C140 96 160 96 168 72" stroke={p.trim} strokeWidth="5" fill="none" />
          <path d="M102 232 L198 232" stroke={p.trim} strokeWidth="6" strokeLinecap="round" />
          <path d="M104 150 C130 158 170 158 196 150" stroke={p.seam} strokeOpacity="0.22" strokeWidth="1.4" fill="none" />
        </>
      );

    default:
      return <rect x="100" y="120" width="100" height="140" rx="16" fill={body} />;
  }
}

/** A styled studio tile used in place of photography. */
export function GarmentTile({
  kind,
  color,
  accent,
  label,
  className,
}: {
  kind: GarmentKind;
  color: string;
  accent?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`relative h-full w-full bg-[#F3ECE3] ${className ?? ''}`}>
      <GarmentArt kind={kind} color={color} accent={accent} className="h-full w-full" label={label} />
      {label && (
        <span className="absolute bottom-3 left-0 right-0 text-center font-sans text-[8.5px] uppercase tracking-[0.22em] text-ink/35">
          {label}
        </span>
      )}
    </div>
  );
}
