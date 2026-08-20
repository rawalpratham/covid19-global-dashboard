import { useMemo, useState } from 'react';
import { countries } from '@/data/covidData';
import { formatNumber } from '@/utils/formatNumber';
import { useInView } from '@/hooks/useInView';
import { SectionHeader } from './SectionHeader';
import { Toggle } from './Toggle';
import { BarRow } from './BarRow';

type Mode = 'Total Cases' | 'Active Cases';

export function CountryCases() {
  const [mode, setMode] = useState<Mode>('Total Cases');
  const [ref, inView] = useInView<HTMLDivElement>();

  const sorted = useMemo(() => {
    const key = mode === 'Total Cases' ? 'cases' : 'active';
    return [...countries].sort((a, b) => b[key] - a[key]);
  }, [mode]);

  const maxValue = useMemo(() => {
    const key = mode === 'Total Cases' ? 'cases' : 'active';
    return Math.max(...countries.map((c) => c[key]));
  }, [mode]);

  return (
    <section id="countries" className="border-b border-base">
      <div className="container-editorial py-10 sm:py-14 md:py-20">
        <SectionHeader
          index="01"
          title="Virus cases by country"
          subtitle="Confirmed cases"
          toggle={
            <Toggle
              options={['Total Cases', 'Active Cases']}
              value={mode}
              onChange={(v) => setMode(v as Mode)}
              ariaLabel="Toggle between total cases and active cases"
            />
          }
        />

        <div ref={ref}>
          <div className="mb-2 grid grid-cols-[2.5rem_1fr_auto] gap-2 sm:mb-3 sm:grid-cols-[3rem_1fr_auto] sm:gap-3">
            <span className="label-mono text-faint">Code</span>
            <span className="label-mono text-faint">Distribution</span>
            <span className="label-mono text-faint text-right">Value</span>
          </div>
          {sorted.map((c, i) => {
            const value = mode === 'Total Cases' ? c.cases : c.active;
            return (
              <BarRow
                key={c.code}
                label={c.name}
                code={c.code}
                value={value}
                displayValue={formatNumber(value)}
                maxValue={maxValue}
                color={mode === 'Total Cases' ? '#e11d2a' : '#f59e0b'}
                active={inView}
                delay={i * 45}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
