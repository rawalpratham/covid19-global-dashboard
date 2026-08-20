import { useEffect, useState } from 'react';
import { LAST_UPDATED } from '@/data/covidData';
import { ThemeToggle } from './Toggle';
import { Calendar, Activity } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 border-b transition-colors duration-500"
      style={{
        borderColor: scrolled ? 'var(--border)' : 'transparent',
        backgroundColor: scrolled ? 'var(--bg)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(180%) blur(8px)' : 'none',
      }}
    >
      <div className="container-editorial flex h-14 items-center justify-between sm:h-16">
        <a
          href="#top"
          className="flex items-center gap-2.5"
          aria-label="COVID-19 Dashboard home"
        >
          <Activity size={18} strokeWidth={1.5} className="text-cases" aria-hidden="true" />
          <span className="text-[13px] font-semibold tracking-wide sm:text-sm">
            COVID-19<span className="text-faint"> / Dashboard</span>
          </span>
        </a>

        <div className="flex items-center gap-3 sm:gap-5">
          <span
            className="hidden items-center gap-1.5 text-[11px] text-muted sm:inline-flex"
            aria-label={`Last updated ${LAST_UPDATED}`}
          >
            <Calendar size={12} strokeWidth={1.5} aria-hidden="true" />
            <span className="tabular">{LAST_UPDATED}</span>
          </span>
          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-5 text-[12px] text-muted">
              {[
                ['Countries', '#countries'],
                ['Growth', '#growth'],
                ['Spread', '#spread'],
                ['Fatalities', '#fatalities'],
                ['Recoveries', '#recoveries'],
                ['Trend', '#trend'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="transition-colors duration-300 hover:text-ink"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
