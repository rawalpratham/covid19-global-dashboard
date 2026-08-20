interface SectionHeaderProps {
  index: string;
  title: string;
  subtitle?: string;
  toggle?: React.ReactNode;
}

export function SectionHeader({ index, title, subtitle, toggle }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-t border-strong pt-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:pt-6">
      <div className="flex flex-col gap-1">
        <span className="label-mono text-faint">
          {index} — Data
        </span>
        <h2 className="font-serif text-2xl font-medium leading-tight tracking-tightest sm:text-3xl md:text-[34px]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted sm:text-[15px]">{subtitle}</p>
        )}
      </div>
      {toggle && <div className="shrink-0">{toggle}</div>}
    </div>
  );
}
