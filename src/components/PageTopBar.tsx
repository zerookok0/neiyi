import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from './icons';
import { cx } from '../lib/format';

type Props = {
  title?: string;
  backTo?: string;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  transparent?: boolean;
};

/** Secondary mobile header used on inner pages: back arrow + title + actions. */
export function PageTopBar({ title, backTo = '/', actions, children, className, transparent }: Props) {
  return (
    <div
      className={cx(
        'sticky top-[60px] z-30 md:top-[100px]',
        transparent ? 'bg-transparent' : 'border-b border-ink/[0.07] bg-ivory/95 backdrop-blur-xl',
        className,
      )}
    >
      <div className="mx-auto flex h-[54px] w-full max-w-[1180px] items-center gap-3 px-4 md:px-8">
        <Link
          to={backTo}
          aria-label="Quay lại"
          className="tap grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink transition-colors hover:bg-cream"
        >
          <ArrowLeft size={19} />
        </Link>
        {title && (
          <h1 className="flex-1 truncate text-center font-sans text-[13px] font-medium tracking-[0.04em] md:text-left md:text-[14px]">
            {title}
          </h1>
        )}
        <div className="flex shrink-0 items-center gap-1">{actions}</div>
      </div>
      {children}
    </div>
  );
}

/** Small hook: sets document title per page. */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} — VÉLORA` : 'VÉLORA';
    return () => {
      document.title = 'VÉLORA';
    };
  }, [title]);
}
