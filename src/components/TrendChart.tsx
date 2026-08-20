import { useEffect, useMemo, useRef, useState } from 'react';
import { trendData } from '@/data/covidData';
import { formatNumber } from '@/utils/formatNumber';
import { useInView } from '@/hooks/useInView';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { buildLinePath, buildAreaPath, linearScale } from '@/utils/chartUtils';
import { SectionHeader } from './SectionHeader';

const VB_WIDTH = 1000;
const VB_HEIGHT = 360;
const PAD = { top: 30, right: 50, bottom: 50, left: 70 };

export function TrendChart() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [size, setSize] = useState({ width: 800, height: 360 });
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      const w = Math.max(320, cr.width);
      const h = Math.max(220, Math.min(440, w * 0.36));
      setSize({ width: w, height: h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const geometry = useMemo(() => {
    const values = trendData.map((d) => d.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    const yDomain: [number, number] = [min - range * 0.15, max + range * 0.15];

    const xScale = linearScale([0, trendData.length - 1], [PAD.left, VB_WIDTH - PAD.right]);
    const yScale = linearScale(yDomain, [VB_HEIGHT - PAD.bottom, PAD.top]);

    const points = trendData.map((d, i) => ({ x: xScale(i), y: yScale(d.value) }));
    const linePath = buildLinePath(points);
    const areaPath = buildAreaPath(points, VB_HEIGHT - PAD.bottom);

    const yTicks = 5;
    const ticks = Array.from({ length: yTicks }, (_, i) => {
      const t = i / (yTicks - 1);
      const v = yDomain[0] + (yDomain[1] - yDomain[0]) * t;
      return { value: v, y: yScale(v) };
    });

    return { points, linePath, areaPath, ticks, xScale, yScale };
  }, []);

  const { points, linePath, areaPath, ticks, xScale } = geometry;

  const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const xPx = e.clientX - rect.left;
    const xVb = (xPx / rect.width) * VB_WIDTH;
    let nearest = 0;
    let best = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(p.x - xVb);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setHoverIdx(nearest);
  };

  const pathLen = 2600;
  const drawDelay = inView && !reduced ? 200 : 0;

  return (
    <section id="trend" className="border-b border-base bg-elevated">
      <div className="container-editorial py-10 sm:py-14 md:py-20">
        <SectionHeader
          index="06"
          title="Trend"
          subtitle="Total number of cases globally — past 7 days"
        />

        <div ref={ref}>
          <div ref={measureRef} className="w-full">
            <svg
              viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT}`}
              width={size.width}
              height={size.height}
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Line chart of global COVID-19 cases over the past 7 days"
              onMouseMove={handleMove}
              onMouseLeave={() => setHoverIdx(null)}
              className="touch-none select-none"
            >
              <defs>
                <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e11d2a" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#e11d2a" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid lines + Y labels */}
              {ticks.map((t, i) => (
                <g key={i}>
                  <line
                    x1={PAD.left}
                    x2={VB_WIDTH - PAD.right}
                    y1={t.y}
                    y2={t.y}
                    stroke="var(--border)"
                    strokeWidth="1"
                    strokeDasharray={i === ticks.length - 1 ? '0' : '2 4'}
                  />
                  <text
                    x={PAD.left - 14}
                    y={t.y + 4}
                    textAnchor="end"
                    fontSize="15"
                    fill="var(--ink-faint)"
                    className="tabular"
                  >
                    {formatNumber(t.value)}
                  </text>
                </g>
              ))}

              {/* X labels */}
              {trendData.map((d, i) => (
                <text
                  key={d.date}
                  x={xScale(i)}
                  y={VB_HEIGHT - PAD.bottom + 26}
                  textAnchor="middle"
                  fontSize="15"
                  fill="var(--ink-faint)"
                  className="tabular"
                >
                  {d.date}
                </text>
              ))}

              {/* Area */}
              <path
                d={areaPath}
                fill="url(#trendArea)"
                style={{
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.8s ease ${drawDelay + 600}ms`,
                }}
              />

              {/* Line */}
              <path
                d={linePath}
                fill="none"
                stroke="#e11d2a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: pathLen,
                  strokeDashoffset: inView && !reduced ? 0 : pathLen,
                  transition: `stroke-dashoffset 1.6s cubic-bezier(0.25,0.1,0.25,1) ${drawDelay}ms`,
                }}
              />

              {/* Points + hover */}
              {points.map((p, i) => (
                <g key={i}>
                  {hoverIdx === i && (
                    <line
                      x1={p.x}
                      x2={p.x}
                      y1={PAD.top}
                      y2={VB_HEIGHT - PAD.bottom}
                      stroke="var(--ink)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      opacity="0.4"
                    />
                  )}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hoverIdx === i ? 5 : 3.5}
                    fill="var(--bg)"
                    stroke="#e11d2a"
                    strokeWidth="2"
                    style={{
                      opacity: inView ? 1 : 0,
                      transition: `opacity 0.4s ease ${drawDelay + 1200 + i * 80}ms, r 0.2s ease`,
                    }}
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Tooltip */}
          {hoverIdx !== null && (
            <div
              className="pointer-events-none mt-2 flex items-center gap-3 border border-base bg-base px-3 py-2 text-sm"
              style={{ width: 'fit-content' }}
            >
              <span className="label-mono text-faint">{trendData[hoverIdx].date}</span>
              <span className="tabular font-semibold">{formatNumber(trendData[hoverIdx].value)}</span>
              <span className="text-faint">cases</span>
            </div>
          )}

          {/* Data summary for mobile / screen readers */}
          <table className="sr-only">
            <caption>Global cases over the past 7 days</caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Total cases</th>
              </tr>
            </thead>
            <tbody>
              {trendData.map((d) => (
                <tr key={d.date}>
                  <td>{d.date}</td>
                  <td>{formatNumber(d.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
