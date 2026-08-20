import { LAST_UPDATED } from '@/data/covidData';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import { formatNumber } from '@/utils/formatNumber';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatProps {
  label: string;
  value: number;
  daily: number;
  dailyLabel: string;
  icon: LucideIcon;
  color: string;
  active: boolean;
  delay: number;
}

function Stat({ label, value, daily, dailyLabel, icon: Icon, color, active, delay }: StatProps) {
  const animated = useCountUp(value, active, 1600);
  const animatedDaily = useCountUp(daily, active, 1600);

  return (
    <div
      className="relative flex flex-col gap-3 border-b border-base py-7 sm:py-9 md:border-b-0 md:border-r md:py-12 md:pr-8 md:last:border-r-0"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div className="flex items-center gap-2">
        <Icon size={15} strokeWidth={1.5} style={{ color }} aria-hidden="true" />
        <span className="label-mono text-muted">{label}</span>
      </div>
      <div>
        <div className="tabular font-serif text-4xl font-medium leading-none tracking-tightest sm:text-5xl md:text-6xl lg:text-7xl">
          {formatNumber(animated)}
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-[13px]">
        <span className="tabular font-semibold" style={{ color }}>
          +{formatNumber(animatedDaily)}
        </span>
        <span className="text-faint">{dailyLabel}</span>
      </div>
    </div>
  );
}

export function GlobalStats() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section id="top" className="border-b border-base">
      <div className="container-editorial">
        <div className="border-b border-base py-8 sm:py-12 md:py-16">
          <div className="flex flex-col gap-4">
            <span className="label-mono text-faint">Historical Data Snapshot</span>
            <h1 className="font-serif text-5xl font-medium leading-[0.95] tracking-tightest sm:text-6xl md:text-7xl lg:text-[96px]">
              Covid–19
              <span className="mt-1 block text-2xl font-normal text-muted sm:text-3xl md:mt-3 md:text-4xl lg:text-5xl">
                Global Data Dashboard
              </span>
            </h1>
            <div className="mt-2 flex items-center gap-2 text-[13px] text-muted">
              <span className="inline-flex h-2 w-2 rounded-full bg-cases" aria-hidden="true" />
              <span className="tabular">Last updated: {LAST_UPDATED}</span>
            </div>
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3">
          <Stat
            label="Cases"
            value={6_150_482}
            daily={136_022}
            dailyLabel="daily increase"
            icon={TrendingUp}
            color="#e11d2a"
            active={inView}
            delay={0}
          />
          <Stat
            label="Fatalities"
            value={370_506}
            daily={5_435}
            dailyLabel="daily increase"
            icon={TrendingDown}
            color="#7f1d1d"
            active={inView}
            delay={120}
          />
          <Stat
            label="Active Cases"
            value={3_045_430}
            daily={22_102}
            dailyLabel="daily change"
            icon={Activity}
            color="#f59e0b"
            active={inView}
            delay={240}
          />
        </div>
      </div>
    </section>
  );
}
