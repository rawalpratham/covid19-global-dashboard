import { useState } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export function Information() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="information"
      className="border-b border-base bg-elevated"
      aria-label="About this dashboard"
    >
      <div className="container-editorial py-5 sm:py-6">
        <div className="flex items-start gap-3">
          <AlertCircle
            size={16}
            strokeWidth={1.5}
            className="mt-0.5 shrink-0 text-faint"
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="label-mono text-muted">Information</span>
              <ChevronDown
                size={16}
                strokeWidth={1.5}
                className="shrink-0 text-faint transition-transform duration-300"
                style={{ transform: open ? 'rotate(180deg)' : 'none' }}
                aria-hidden="true"
              />
            </button>

            <div
              className="grid transition-all duration-500 ease-out"
              style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div className="max-w-2xl pt-4 text-sm leading-relaxed text-muted">
                  <p>
                    The horrific COVID-19 pandemic is affecting the whole world — some
                    countries far worse than others. This dashboard has been created for
                    public information purposes, visualising the key data, limited to the
                    16 worst affected countries at any given time. It is not intended to be
                    a comprehensive report, nor does it offer any opinion or comment. It is
                    a simple snapshot — designed to be informative, user-friendly and easy
                    to digest.
                  </p>
                  <p className="mt-3 flex items-start gap-2 rounded-sm border border-base bg-base p-3 text-[13px]">
                    <span className="label-mono mt-0.5 shrink-0 text-cases">Disclaimer</span>
                    <span>
                      This is a <strong className="font-semibold text-ink">historical
                      demonstration</strong> using data from May 2020. It should not be
                      interpreted as current medical information or used for any
                      decision-making.
                    </span>
                  </p>
                  <div className="mt-4 border-t border-base pt-4">
                    <h4 className="label-mono text-faint">About the Developer</h4>
                    <p className="mt-2">
                      Andrew Winter is a British Art Director, Designer and Developer
                      specialising in brand identity, website and UI design. Over recent
                      years he has led data visualisation projects for a number of leading
                      apps and brands including FIFA, Formula E, McLaren and Samsung.
                    </p>
                    <p className="mt-2">
                      <a
                        href="https://winteractive.co"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-faint underline-offset-2 transition-colors hover:text-ink"
                      >
                        winteractive.co
                      </a>
                    </p>
                    <p className="mt-4 text-xs text-faint">
                      This is an independent recreation built for an internship selection
                      task. Original design credit:{' '}
                      <a
                        href="https://www.covid19virusdata.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-faint underline-offset-2 transition-colors hover:text-ink"
                      >
                        covid19virusdata.com
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
