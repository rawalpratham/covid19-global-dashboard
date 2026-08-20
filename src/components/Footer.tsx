import { LAST_UPDATED } from '@/data/covidData';

export function Footer() {
  return (
    <footer className="border-t border-strong bg-base">
      <div className="container-editorial py-10 sm:py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-xl">
            <h3 className="font-serif text-xl font-medium tracking-tightest sm:text-2xl">
              Covid–19 / Global Data Dashboard
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              A historical data visualization recreating the editorial dashboard at
              covid19virusdata.com. Built as an internship selection task demonstrating
              frontend engineering, data visualization and responsive design.
            </p>
          </div>

          <div className="flex flex-col gap-1 text-xs text-faint md:items-end">
            <span className="tabular">Data snapshot: {LAST_UPDATED}</span>
            <span>Demo dataset — not current medical information</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-base pt-5 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>Original design © Andrew Winter, winteractive.co</p>
          <p className="tabular">Recreation for educational purposes</p>
        </div>
      </div>
    </footer>
  );
}
