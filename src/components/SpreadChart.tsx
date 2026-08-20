import { useMemo } from 'react';
import { countries } from '@/data/covidData';
import { formatPercent } from '@/utils/formatNumber';
import { useInView } from '@/hooks/useInView';
import { SectionHeader } from './SectionHeader';
import { BarRow } from './BarRow';

export function SpreadChart() {
  const [ref, inView] = useInView<HTMLDivElement>();

  const rows = useMemo(
    () =>
      countries
        .map((c) => ({
          ...c,
          spreadPct: (c.cases / c.population) * 100,
        }))
        .sort((a, b) => b.spreadPct - a.spreadPct),
    [],
  );

  const maxValue = useMemo(
    () => Math.max(...rows.map((r) => r.spreadPct)),
    [rows],
  );

  return (
    <section id="spread" className="border-b border-base">
      <div className="container-editorial py-10 sm:py-14 md:py-20">
        <SectionHeader
          index="03"
          title="Virus spread by country"
          subtitle="Confirmed cases in relation to population size"
        />

        <div ref={ref}>
          <div className="mb-2 grid grid-cols-[2.5rem_1fr_auto] gap-2 sm:mb-3 sm:grid-cols-[3rem_1fr_auto] sm:gap-3">
            <span className="label-mono text-faint">Code</span>
            <span className="label-mono text-faint">Share of population</span>
            <span className="label-mono text-faint text-right">% infected</span>
          </div>
          {rows.map((c, i) => (
            <BarRow
              key={c.code}
              label={c.name}
              code={c.code}
              value={c.spreadPct}
              displayValue={formatPercent(c.spreadPct, 2)}
              maxValue={maxValue}
              color="#0f766e"
              active={inView}
              delay={i * 45}
              footnote={`1 in ${Math.round(c.population / c.cases).toLocaleString()}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
