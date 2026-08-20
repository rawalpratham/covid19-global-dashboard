import { useEffect, useState } from 'react';

interface BarRowProps {
  label: string;
  code: string;
  value: number;
  displayValue: string;
  maxValue: number;
  color: string;
  active: boolean;
  delay?: number;
  footnote?: string;
}

export function BarRow({
  label,
  code,
  value,
  displayValue,
  maxValue,
  color,
  active,
  delay = 0,
  footnote,
}: BarRowProps) {
  const widthPct = maxValue > 0 ? (value / maxValue) * 100 : 0;
  const [width, setWidth] = useState(active ? widthPct : 0);

  useEffect(() => {
    if (!active) {
      setWidth(0);
      return;
    }
    const t = setTimeout(() => setWidth(widthPct), delay);
    return () => clearTimeout(t);
  }, [active, widthPct, delay]);

  return (
    <div
      className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-2 border-b border-base py-[7px] sm:grid-cols-[3rem_1fr_auto] sm:gap-3 sm:py-2"
      style={{ opacity: active ? 1 : 0, transition: 'opacity 0.5s ease' }}
    >
      <span className="label-mono text-faint tabular text-center">{code}</span>

      <div className="relative h-[18px] overflow-hidden sm:h-5">
        <div
          className="absolute left-0 top-0 h-full"
          style={{
            width: `${width}%`,
            background: color,
            transition: 'width 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        />
      </div>

      <div className="flex flex-col items-end leading-tight">
        <span className="tabular text-sm font-semibold sm:text-[15px]">{displayValue}</span>
        {footnote && (
          <span className="tabular text-[10px] text-faint sm:text-[11px]">{footnote}</span>
        )}
      </div>

      <span className="sr-only">{label}</span>
    </div>
  );
}
