import type { Icon } from "@phosphor-icons/react";

export function ToneBadge({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "blue" | "emerald" | "orange" | "rose" | "indigo" | "slate" | "pink";
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
    rose: "bg-rose-50 text-rose-700 border-rose-100",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    pink: "bg-pink-50 text-pink-700 border-pink-100",
  };

  return (
    <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function MetricCard({
  label,
  value,
  detail,
  trend,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  trend: string;
  icon: Icon;
  tone: "blue" | "emerald" | "orange" | "rose";
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <div className="mt-2 flex items-end gap-3">
            <span className="text-4xl font-extrabold tracking-tight text-slate-950">{value}</span>
            <span className="mb-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{trend}</span>
          </div>
        </div>
        <div className={`rounded-lg border p-2.5 ${tones[tone]}`}>
          <Icon size={22} weight="fill" />
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500">{detail}</p>
    </section>
  );
}

export function ProgressBar({ value, tone = "blue" }: { value: number; tone?: "blue" | "emerald" | "orange" | "slate" }) {
  const tones = {
    blue: "bg-blue-600",
    emerald: "bg-emerald-500",
    orange: "bg-orange-500",
    slate: "bg-slate-700",
  };

  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full ${tones[tone]}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">{eyebrow}</p> : null}
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>
      {children ? <div className="flex flex-wrap items-center gap-3">{children}</div> : null}
    </div>
  );
}
