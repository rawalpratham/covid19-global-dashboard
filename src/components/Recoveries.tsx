import { useMemo } from 'react';
import { globalStats } from '@/data/covidData';
import { formatNumber } from '@/utils/formatNumber';
import { useInView } from '@/hooks/useInView';
import { SectionHeader } from './SectionHeader';

export function Recoveries() {
  const [ref, inView] = useInView<HTMLDivElement>();

  const { recovered, fatalities, cases } = globalStats;
  const total = recovered + fatalities;
  const recoveredPct = useMemo(() => (recovered / total) * 100, [recovered, total]);
  const fatalityPct = 100 - recoveredPct;
  const recoveredShareOfCases = (recovered / cases) * 100;
  const fatalityShareOfCases = (fatalities / cases) * 100;

  return (
    <section id="recoveries" className="border-b border-base">
      <div className="container-editorial py-10 sm:py-14 md:py-20">
        <SectionHeader
          index="05"
          title="Recoveries"
          subtitle="Global recoveries compared to global fatalities"
        />

        <div ref={ref} className="flex flex-col gap-10 md:gap-14">
          {/* Proportional bar — the main custom visualization */}
          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <span className="label-mono text-muted">Outcome distribution</span>
              <span className="tabular text-xs text-faint">
                {formatNumber(total)} resolved cases
              </span>
            </div>

            <div
              className="relative flex h-12 overflow-hidden border border-base sm:h-16"
              role="img"
              aria-label={`Of resolved cases, ${recoveredPct.toFixed(1)}% recovered and ${fatalityPct.toFixed(1)}% were fatalities.`}
            >
              <div
                className="flex items-center justify-end px-3 text-white"
                style={{
                  width: inView ? `${recoveredPct}%` : '0%',
                  background: '#059669',
                  transition: 'width 1.4s cubic-bezier(0.25,0.1,0.25,1)',
                }}
              >
                <span className="tabular text-xs font-semibold sm:text-sm">
                  {recoveredPct.toFixed(1)}%
                </span>
              </div>
              <div
                className="flex items-center px-3 text-white"
                style={{
                  width: inView ? `${fatalityPct}%` : '0%',
                  background: '#7f1d1d',
                  transition: 'width 1.4s cubic-bezier(0.25,0.1,0.25,1) 0.1s',
                }}
              >
                <span className="tabular text-xs font-semibold sm:text-sm">
                  {fatalityPct.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5"
                  style={{ background: '#059669' }}
                  aria-hidden="true"
                />
                <span className="text-sm text-muted">Recoveries</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm text-muted">Fatalities</span>
                <span
                  className="inline-block h-2.5 w-2.5"
                  style={{ background: '#7f1d1d' }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Detailed comparison */}
          <div className="grid grid-cols-1 gap-px border border-base bg-base sm:grid-cols-2">
            <div className="bg-base p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2"
                  style={{ background: '#059669' }}
                  aria-hidden="true"
                />
                <span className="label-mono text-muted">Recoveries</span>
              </div>
              <div className="tabular mt-3 font-serif text-3xl font-medium tracking-tightest sm:text-4xl md:text-5xl">
                {formatNumber(recovered)}
              </div>
              <div className="mt-2 space-y-1 text-[13px] text-muted">
                <div className="flex justify-between">
                  <span>Share of resolved</span>
                  <span className="tabular font-semibold text-ink">{recoveredPct.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Share of all cases</span>
                  <span className="tabular font-semibold text-ink">{recoveredShareOfCases.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-base p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2"
                  style={{ background: '#7f1d1d' }}
                  aria-hidden="true"
                />
                <span className="label-mono text-muted">Fatalities</span>
              </div>
              <div className="tabular mt-3 font-serif text-3xl font-medium tracking-tightest sm:text-4xl md:text-5xl">
                {formatNumber(fatalities)}
              </div>
              <div className="mt-2 space-y-1 text-[13px] text-muted">
                <div className="flex justify-between">
                  <span>Share of resolved</span>
                  <span className="tabular font-semibold text-ink">{fatalityPct.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Share of all cases</span>
                  <span className="tabular font-semibold text-ink">{fatalityShareOfCases.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ratio statement */}
          <p className="font-serif text-lg text-muted sm:text-xl md:text-2xl">
            For every fatality, approximately{' '}
            <span className="font-semibold text-ink tabular">
              {Math.round(recovered / fatalities).toLocaleString()}
            </span>{' '}
            patients recovered.
          </p>
        </div>
      </div>
    </section>
  );
}
