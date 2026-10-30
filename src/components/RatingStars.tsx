import { StarIcon } from './icons';
import { cx } from '../lib/format';

export function RatingStars({
  rating,
  size = 13,
  className,
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={cx('inline-flex items-center gap-[3px]', className)} aria-label={`Đánh giá ${rating} trên 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i - 0.25;
        return (
          <StarIcon
            key={i}
            size={size}
            className={filled ? 'text-[#C79A5B]' : 'text-ink/15'}
          />
        );
      })}
    </span>
  );
}
