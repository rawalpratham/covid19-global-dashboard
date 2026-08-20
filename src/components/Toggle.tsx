import { Moon, Sun } from 'lucide-react';

interface ToggleProps {
  options: [string, string];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
}

export function Toggle({ options, value, onChange, ariaLabel }: ToggleProps) {
  return (
    <div
      className="inline-flex items-center border border-base"
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {options.map((opt) => {
        const isActive = opt === value;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(opt)}
            className="relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors duration-300 sm:text-[13px]"
            style={{ color: isActive ? 'var(--bg)' : 'var(--ink-muted)' }}
          >
            {isActive && (
              <span
                className="absolute inset-0 bg-base"
                style={{ background: 'var(--ink)' }}
                aria-hidden="true"
              />
            )}
            <span className="relative z-10 whitespace-nowrap">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="inline-flex h-9 w-9 items-center justify-center border border-base transition-colors duration-300 hover:bg-elevated"
    >
      {theme === 'light' ? (
        <Moon size={15} strokeWidth={1.5} />
      ) : (
        <Sun size={15} strokeWidth={1.5} />
      )}
    </button>
  );
}
