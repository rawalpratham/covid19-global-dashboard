export interface ScaleOptions {
  values: number[];
  padding?: number;
}

export function linearScale(domain: number[], range: number[]): (v: number) => number {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  if (d1 === d0) return () => (r0 + r1) / 2;
  return (v: number) => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);
}

export function niceDomain({ values, padding = 0.08 }: ScaleOptions): [number, number] {
  const max = Math.max(...values, 0);
  if (max === 0) return [0, 1];
  const padded = max * (1 + padding);
  const magnitude = Math.pow(10, Math.floor(Math.log10(padded)));
  return [0, Math.ceil(padded / magnitude) * magnitude];
}

export function buildLinePath(
  points: { x: number; y: number }[],
  smooth = true,
): string {
  if (points.length === 0) return '';
  if (points.length === 1 || !smooth) {
    return points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
      .join(' ');
  }
  const segments: string[] = [`M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    segments.push(
      `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
    );
  }
  return segments.join(' ');
}

export function buildAreaPath(
  points: { x: number; y: number }[],
  baseline: number,
  smooth = true,
): string {
  if (points.length === 0) return '';
  const line = buildLinePath(points, smooth);
  const last = points[points.length - 1];
  const first = points[0];
  return `${line} L ${last.x.toFixed(2)} ${baseline.toFixed(2)} L ${first.x.toFixed(2)} ${baseline.toFixed(2)} Z`;
}
