import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '../icons';
import { px } from '../../data/types';

/**
 * Editorial tunnel hero.
 *
 * The corridor is driven by the *page* scroll position instead of hijacking
 * the wheel: the hero is a tall sticky stage inside a scroll container, so the
 * page never locks and the transition into the content below stays continuous.
 */

type Look = {
  src: string;
  title: string;
  caption: string;
  audience: 'nu' | 'nam';
  to: string;
};

const LOOKS: Look[] = [
  // ---------------- Nữ ----------------
  {
    src: px(6311623, 800),
    title: 'Bralette Mềm',
    caption: 'Nữ · Cotton hữu cơ',
    audience: 'nu',
    to: '/danh-muc/ao-nguc',
  },
  {
    src: px(2681751, 800),
    title: 'Bralette Đen',
    caption: 'Nữ · Không gọng',
    audience: 'nu',
    to: '/danh-muc/ao-nguc',
  },
  {
    src: px(6311289, 800),
    title: 'Seamless Modal',
    caption: 'Nữ · Không đường may',
    audience: 'nu',
    to: '/danh-muc/quan-lot-nu',
  },
  {
    src: px(1055691, 800),
    title: 'Bộ mặc nhà Morning',
    caption: 'Nữ · Modal rủ mềm',
    audience: 'nu',
    to: '/danh-muc/do-mac-nha-nu',
  },
  {
    src: px(291762, 800),
    title: 'Định hình Body Form',
    caption: 'Nữ · Mỏng nhẹ',
    audience: 'nu',
    to: '/danh-muc/dinh-hinh',
  },
  // ---------------- Nam ----------------
  {
    src: px(1681010, 800),
    title: 'Trunk Daily Motion',
    caption: 'Nam · Co giãn 4 chiều',
    audience: 'nam',
    to: '/danh-muc/quan-lot-nam',
  },
  {
    src: px(220453, 800),
    title: 'Boxer Brief Air',
    caption: 'Nam · Lưới thoáng',
    audience: 'nam',
    to: '/danh-muc/quan-lot-nam',
  },
  {
    src: px(1036629, 800),
    title: 'Áo lót Ribbed',
    caption: 'Nam · Cotton gân dọc',
    audience: 'nam',
    to: '/danh-muc/ao-lot-nam',
  },
  {
    src: px(7189783, 800),
    title: 'Pajama Lounge',
    caption: 'Nam · Cạp chun êm',
    audience: 'nam',
    to: '/danh-muc/do-mac-nha-nam',
  },
];

type TunnelCardData = {
  look: Look;
  angleCos: number;
  angleSin: number;
  radiusFactorX: number;
  radiusFactorY: number;
  rotationZ: number;
  index: number;
};

const TUNNEL_CARDS: TunnelCardData[] = LOOKS.map((look, i) => {
  const goldenAngle = i * 137.5 * (Math.PI / 180);
  return {
    look,
    angleCos: Math.cos(goldenAngle),
    angleSin: Math.sin(goldenAngle),
    radiusFactorX: 0.28 + (i % 3) * 0.08,
    radiusFactorY: 0.26 + (i % 2) * 0.09,
    rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
    index: i,
  };
});

type StageDimensions = {
  width: number;
  height: number;
  isMobile: boolean;
};

function TunnelCard({
  card,
  progress,
  pointer,
  total,
  stage,
}: {
  card: TunnelCardData;
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  total: number;
  stage: StageDimensions;
}) {
  const staggerSpan = 0.55;
  const start = (card.index / total) * (1 - staggerSpan);
  const end = start + staggerSpan;

  const localProgress = useTransform(progress, [start, end], [0, 1]);

  const farZ = stage.isMobile ? -1200 : -1700;
  const nearZ = stage.isMobile ? 350 : 500;
  const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

  // Gentle, continuous fade — no hard cut-in.
  const opacity = useTransform(localProgress, [0, 0.28, 0.78, 1], [0, 1, 1, 0]);

  const cardWidth = stage.isMobile
    ? Math.max(132, Math.min(180, stage.width * 0.38))
    : Math.max(180, Math.min(264, stage.width * 0.18));

  const baseX = card.angleCos * (stage.width * card.radiusFactorX);
  const baseY = card.angleSin * (stage.height * card.radiusFactorY);
  const panStrength = stage.isMobile ? 20 : 45;

  const transform = useTransform([z, pointer.x, pointer.y], ([currZ, px, py]: number[]) => {
    const offsetX = baseX - px * panStrength;
    const offsetY = baseY - py * panStrength;
    return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
  });

  return (
    <motion.div
      style={{ width: cardWidth, transform, opacity, zIndex: card.index + 1 }}
      className="pointer-events-auto absolute left-1/2 top-1/2 aspect-[4/5] select-none will-change-transform"
    >
      <Link
        to={card.look.to}
        aria-label={`${card.look.title} — ${card.look.caption}`}
        className="group relative block h-full w-full overflow-hidden rounded-[16px] bg-cream shadow-[0_24px_60px_-24px_rgba(31,28,26,0.55)] ring-1 ring-ivory/25 transition-all duration-500 hover:ring-ivory/80"
      >
        <img
          src={card.look.src}
          alt={`${card.look.title} — ${card.look.audience === 'nu' ? 'đồ lót nữ' : 'đồ lót nam'} VÉLORA`}
          draggable={false}
          loading={card.index < 3 ? 'eager' : 'lazy'}
          className="editorial-img h-full w-full object-cover transition-transform duration-[900ms] ease-silk group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
          <div className="min-w-0">
            <p className="font-sans text-[8.5px] uppercase tracking-[0.18em] text-ivory/65">
              {card.look.caption}
            </p>
            <p className="mt-1 truncate font-serif text-[17px] leading-tight text-ivory">
              {card.look.title}
            </p>
          </div>
          <ArrowRight
            size={14}
            className="mb-1 shrink-0 text-ivory/70 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-ivory"
          />
        </div>
      </Link>
    </motion.div>
  );
}

export default function PerspectiveTunnelHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const [dims, setDims] = useState<StageDimensions>({
    width: 1440,
    height: 900,
    isMobile: false,
  });

  useEffect(() => {
    const update = () =>
      setDims({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Progress of the tall scroll track. 0 = hero pinned, 1 = hero finished.
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.0005,
  });

  // Parallax: pure CSS motion driven by the pointer, kept subtle.
  const pointer = { x: useSpring(0, { stiffness: 60, damping: 25 }), y: useSpring(0, { stiffness: 60, damping: 25 }) };
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      pointer.x.set((e.clientX / window.innerWidth - 0.5) * 2);
      pointer.y.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  const titleScale = useTransform(progress, [0, 0.55, 1], [1, 1.06, 0.86]);
  const titleOpacity = useTransform(progress, [0, 0.35, 0.72], [1, 1, 0]);
  const hintOpacity = useTransform(progress, [0, 0.08], [1, 0]);

  // Whole stage sinks and fades as the content below rises to meet it.
  const stageOpacity = useTransform(progress, [0.72, 1], [1, 1]);
  const stageScale = useTransform(progress, [0, 1], [1, 0.97]);
  const veilOpacity = useTransform(progress, [0, 1], [0, 0.35]);

  return (
    // Tall track: the extra 90vh is the room the corridor needs to travel.
    <div ref={stageRef} className="relative h-[190svh] w-full">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <motion.div
          style={{ opacity: stageOpacity, scale: reduce ? 1 : stageScale }}
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="relative flex h-full w-full select-none items-center justify-center bg-ink text-ivory"
            style={{
              perspective: dims.isMobile ? '900px' : '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Warm backdrop */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_40%,rgba(217,189,174,0.16),transparent_65%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_50%,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
            <div className="pointer-events-none absolute h-[46vmin] w-[46vmin] rounded-full border border-ivory/10" />
            <div className="pointer-events-none absolute h-[74vmin] w-[74vmin] rounded-full border border-dashed border-ivory/[0.07]" />

            {/* Fade veil that deepens as you leave the hero */}
            <motion.div
              style={{ opacity: veilOpacity }}
              className="pointer-events-none absolute inset-0 z-30 bg-ivory"
            />

            <motion.div
              style={{ scale: reduce ? 1 : titleScale, opacity: titleOpacity }}
              className="pointer-events-none relative z-10 flex max-w-[620px] flex-col items-center px-6 text-center"
            >
              <p className="font-sans text-[10px] uppercase tracking-wide3 text-ivory/60">
                Bộ sưu tập Thu Đông 2025
              </p>
              <h1 className="display-xl mt-4 whitespace-pre-line text-ivory">
                {'Bước vào\nthế giới VÉLORA.'}
              </h1>
              <p className="mt-4 max-w-[34ch] font-sans text-[13px] font-light leading-relaxed text-ivory/65">
                Cuộn để đi qua từng thiết kế — dành cho cả nữ và nam.
              </p>
              <div className="pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-2.5">
                <Link to="/nu" className="btn-light">
                  Bộ sưu tập Nữ
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/nam"
                  className="btn border border-ivory/40 text-ivory hover:bg-ivory hover:text-ink"
                >
                  Bộ sưu tập Nam
                </Link>
              </div>
            </motion.div>

            <div
              className="pointer-events-none absolute inset-0"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {TUNNEL_CARDS.map((card) => (
                <TunnelCard
                  key={card.look.title}
                  card={card}
                  progress={progress}
                  pointer={pointer}
                  stage={dims}
                  total={TUNNEL_CARDS.length}
                />
              ))}
            </div>

            <motion.div
              style={{ opacity: hintOpacity }}
              className="pointer-events-none absolute bottom-7 z-20 flex flex-col items-center gap-2"
            >
              <p className="font-sans text-[9.5px] uppercase tracking-[0.3em] text-ivory/55">
                Cuộn xuống
              </p>
              <span className="h-8 w-px animate-pulse bg-gradient-to-b from-ivory/60 to-transparent" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
