import { useMemo, useState } from 'react';
import { countries } from '@/data/covidData';
import { formatNumber, formatPercent } from '@/utils/formatNumber';
import { useInView } from '@/hooks/useInView';
import { SectionHeader } from './SectionHeader';
import { Toggle } from './Toggle';
import { BarRow } from './BarRow';

type Mode = 'By Number' | 'By Percent';

export function GrowthChart() {
  const [mode, setMode] = useState<Mode>('By Number');
  const [ref, inView] = useInView<HTMLDivElement>();

  const rows = useMemo(() => {
    const sorted = [...countries]
      .sort((a, b) => b.dailyCases - a.dailyCases)
      .slice(0, 8);
    return sorted.map((c) => ({
      ...c,
      pct: (c.dailyCases / c.cases) * 100,
    }));
  }, []);

  const sortedRows = useMemo(() => {
    const sorted = [...rows].sort((a, b) =>
      mode === 'By Number' ? b.dailyCases - a.dailyCases : b.pct - a.pct,
    );
    return sorted;
  }, [rows, mode]);

  const maxValue = useMemo(() => {
    if (mode === 'By Number') return Math.max(...rows.map((r) => r.dailyCases));
    return Math.max(...rows.map((r) => r.pct));
  }, [rows, mode]);

  return (
    <section id="growth" className="border-b border-base bg-elevated">
      <div className="container-editorial py-10 sm:py-14 md:py-20">
        <SectionHeader
          index="02"
          title="Recent virus growth by country"
          subtitle="Increase in cases over past 24 hours — top 8 countries"
          toggle={
            <Toggle
              options={['By Number', 'By Percent']}
              value={mode}
              onChange={(v) => setMode(v as Mode)}
              ariaLabel="Toggle growth display between absolute number and percent"
            />
          }
        />

        <div ref={ref}>
          <div className="mb-2 grid grid-cols-[2.5rem_1fr_auto] gap-2 sm:mb-3 sm:grid-cols-[3rem_1fr_auto] sm:gap-3">
            <span className="label-mono text-faint">Code</span>
            <span className="label-mono text-faint">Growth</span>
            <span className="label-mono text-faint text-right">24h increase</span>
          </div>
          {sortedRows.map((c, i) => {
            const value = mode === 'By Number' ? c.dailyCases : c.pct;
            return (
              <BarRow
                key={c.code}
                label={c.name}
                code={c.code}
                value={value}
                displayValue={
                  mode === 'By Number'
                    ? `+${formatNumber(c.dailyCases)}`
                    : `+${formatPercent(c.pct)}`
                }
                maxValue={maxValue}
                color="#2563eb"
                active={inView}
                delay={i * 55}
                footnote={mode === 'By Number' ? `+${formatPercent(c.pct)} growth` : `+${formatNumber(c.dailyCases)}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
