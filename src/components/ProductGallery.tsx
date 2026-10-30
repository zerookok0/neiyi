import { useRef, useState } from 'react';
import { cx } from '../lib/format';

/** Swipeable product gallery with a position counter (reference: "1/5"). */
export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const next = Math.round(el.scrollLeft / el.clientWidth);
    if (next !== index) setIndex(next);
  };

  const goTo = (i: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={scroller}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        aria-label="Thư viện ảnh sản phẩm"
      >
        {images.map((src, i) => (
          <div key={src + i} className="w-full shrink-0 snap-center">
            <div className="media aspect-[4/5] md:aspect-[4/5] md:rounded-[18px]">
              <img
                src={src}
                alt={`${alt} — ảnh ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="editorial-img"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-ink/45 px-2.5 py-1 font-sans text-[10.5px] tracking-[0.08em] text-ivory backdrop-blur-sm">
        {index + 1}/{images.length}
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Xem ảnh ${i + 1}`}
            className={cx(
              'h-[3px] rounded-full transition-all duration-400',
              i === index ? 'w-5 bg-ivory' : 'w-[10px] bg-ivory/50',
            )}
          />
        ))}
      </div>
    </div>
  );
}
