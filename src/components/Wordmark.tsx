import { Link } from 'react-router-dom';
import { cx } from '../lib/format';

type WordmarkProps = {
  tone?: 'ink' | 'ivory';
  className?: string;
  to?: string;
  onClick?: () => void;
};

export function Wordmark({ tone = 'ink', className, to = '/', onClick }: WordmarkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-label="VÉLORA — Trang chủ"
      className={cx(
        'font-serif select-none',
        tone === 'ink' ? 'text-ink' : 'text-ivory',
        className,
      )}
      style={{ letterSpacing: '0.32em', fontWeight: 400, lineHeight: 1 }}
    >
      VÉLORA
    </Link>
  );
}
