import { useMemo, useState } from 'react';
import { countries } from '@/data/covidData';
import { formatNumber, formatPercent } from '@/utils/formatNumber';
import { useInView } from '@/hooks/useInView';
import { SectionHeader } from './SectionHeader';
import { Toggle } from './Toggle';
import { BarRow } from './BarRow';

type Mode = 'By Number' | 'By Rate';

export function Fatalities() {
  const [mode, setMode] = useState<Mode>('By Number');
  const [ref, inView] = useInView<HTMLDivElement>();

  const rows = useMemo(
    () =>
      countries
        .map((c) => ({
          ...c,
          rate: (c.deaths / c.cases) * 100,
        }))
        .sort((a, b) => (mode === 'By Number' ? b.deaths - a.deaths : b.rate - a.rate)),
    [mode],
  );

  const maxValue = useMemo(
    () => (mode === 'By Number' ? Math.max(...rows.map((r) => r.deaths)) : Math.max(...rows.map((r) => r.rate))),
    [rows, mode],
  );

  return (
    <section id="fatalities" className="border-b border-base bg-elevated">
      <div className="container-editorial py-10 sm:py-14 md:py-20">
        <SectionHeader
          index="04"
          title="Fatalities"
          subtitle="Number and rate of fatalities in relation to cases"
          toggle={
            <Toggle
              options={['By Number', 'By Rate']}
              value={mode}
              onChange={(v) => setMode(v as Mode)}
              ariaLabel="Toggle fatality display between absolute number and case-fatality rate"
            />
          }
        />

        <div ref={ref}>
          <div className="mb-2 grid grid-cols-[2.5rem_1fr_auto] gap-2 sm:mb-3 sm:grid-cols-[3rem_1fr_auto] sm:gap-3">
            <span className="label-mono text-faint">Code</span>
            <span className="label-mono text-faint">Fatalities</span>
            <span className="label-mono text-faint text-right">
              {mode === 'By Number' ? 'Deaths / 24h' : 'Case-fatality rate'}
            </span>
          </div>
          {rows.map((c, i) => (
            <BarRow
              key={c.code}
              label={c.name}
              code={c.code}
              value={mode === 'By Number' ? c.deaths : c.rate}
              displayValue={
                mode === 'By Number' ? formatNumber(c.deaths) : formatPercent(c.rate, 2)
              }
              maxValue={maxValue}
              color="#7f1d1d"
              active={inView}
              delay={i * 45}
              footnote={
                mode === 'By Number'
                  ? `+${formatNumber(c.dailyDeaths)} today · ${formatPercent(c.rate, 1)} rate`
                  : `${formatNumber(c.deaths)} deaths · +${formatNumber(c.dailyDeaths)}`
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
