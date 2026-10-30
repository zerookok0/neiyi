import { Link } from 'react-router-dom';
import type { Product } from '../data/types';
import { cx, formatVND } from '../lib/format';
import { useWishlist } from '../store/wishlist';
import { GarmentArt } from './GarmentArt';
import { HeartIcon } from './icons';

type Props = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: Props) {
  const { has, toggle } = useWishlist();
  const liked = has(product.id);
  const hero = product.colors[0];

  return (
    <article className={cx('group relative', className)}>
      <Link to={`/san-pham/${product.slug}`} className="block tap">
        <div className="media aspect-[3/4] rounded-[14px]">
          <div className="h-full w-full transition-transform duration-[1100ms] ease-silk group-hover:scale-[1.035]">
            <GarmentArt
              kind={product.garment}
              color={hero.hex}
              label={product.subtitle.split(' · ')[0]}
              className="h-full w-full"
            />
          </div>
          {product.badge && (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-ivory/92 px-2.5 py-[5px] font-sans text-[9.5px] uppercase tracking-[0.12em] text-ink/80 backdrop-blur-sm">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggle(product.id);
        }}
        aria-label={liked ? `Bỏ yêu thích ${product.name}` : `Yêu thích ${product.name}`}
        aria-pressed={liked}
        className="tap absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full transition-all duration-300 hover:scale-105"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-ivory/85 backdrop-blur-[2px]">
          <HeartIcon size={16} filled={liked} className={liked ? 'text-rose' : 'text-ink/55'} />
        </span>
      </button>

      <div className="mt-3 px-0.5">
        <Link to={`/san-pham/${product.slug}`} className="tap block">
          <h3 className="font-sans text-[12.5px] font-normal leading-snug text-ink">{product.name}</h3>
          <p className="mt-[3px] font-sans text-[11px] leading-snug text-smoke">{product.subtitle}</p>
        </Link>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-sans text-[12.5px] font-medium text-ink">{formatVND(product.price)}</span>
          {product.compareAtPrice && (
            <span className="font-sans text-[11px] text-smoke/60 line-through">
              {formatVND(product.compareAtPrice)}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.slice(0, 4).map((c) => (
            <span
              key={c.id}
              title={c.name}
              className="h-[9px] w-[9px] rounded-full ring-1 ring-ink/12"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="font-sans text-[9.5px] text-smoke">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </article>
  );
}
