import {
  ArrowRight,
  CalendarBlank,
  CheckCircle,
  FileText,
  Lightning,
  Plus,
  SealWarning,
  UploadSimple,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import { activity, institutionalPriorities, metrics, projects, teams } from "./data";
import { MetricCard, PageHeader, ProgressBar, ToneBadge } from "./components/ui";

const urgentProjects = projects
  .filter((project) => project.status !== "Finalizado")
  .sort((a, b) => a.daysLeft - b.daysLeft)
  .slice(0, 3);

const statusTone = {
  "Por hacer": "slate",
  "En curso": "blue",
  "En revisión": "orange",
  Finalizado: "emerald",
} as const;

const riskTone = {
  Normal: "slate",
  Atención: "orange",
  Crítico: "rose",
} as const;

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-8 pb-10">
      <PageHeader
        eyebrow="Centro de mando institucional"
        title="Seguimiento vivo de equipos, informes y decisiones"
        description="Un tablero para que dirección, secretaría, DOE y coordinación académica vean prioridades, responsables, vencimientos y documentación sin perseguir información por varios canales."
      >
        <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700">
          <CalendarBlank size={18} weight="bold" />
          Agenda semanal
        </button>
        <button className="flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700">
          <Plus size={18} weight="bold" />
          Nuevo seguimiento
        </button>
      </PageHeader>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <SealWarning size={20} weight="fill" className="text-orange-500" />
                <h2 className="text-lg font-extrabold text-slate-950">Atención de hoy</h2>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-500">Lo que puede trabar decisiones si nadie lo toma.</p>
            </div>
            <button className="flex w-fit items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-blue-700 shadow-sm ring-1 ring-slate-200 transition hover:ring-blue-200">
              Ver todas <ArrowRight size={16} weight="bold" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {urgentProjects.map((project) => (
              <article key={project.id} className="grid gap-4 p-5 transition hover:bg-slate-50/60 lg:grid-cols-[1fr_190px]">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <ToneBadge tone={statusTone[project.status]}>{project.status}</ToneBadge>
                    <ToneBadge tone={riskTone[project.risk]}>{project.risk}</ToneBadge>
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-400">{project.team}</span>
                  </div>
                  <h3 className="mt-3 text-base font-extrabold text-slate-950">{project.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">{project.summary}</p>
                  <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Próxima acción</p>
                    <p className="mt-1 text-sm font-bold text-slate-800">{project.nextAction}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-4 rounded-lg bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-400">Vence</span>
                    <span className="rounded-md bg-white px-2 py-1 text-xs font-extrabold text-slate-800 shadow-sm">{project.due}</span>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-500">Avance</span>
                      <span className="text-blue-700">{project.progress}%</span>
                    </div>
                    <ProgressBar value={project.progress} tone={project.risk === "Crítico" ? "orange" : "blue"} />
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <FileText size={15} weight="bold" /> {project.docs} docs
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={15} weight="bold" /> {project.owner}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-950">Acciones rápidas</h2>
              <Lightning size={22} weight="fill" className="text-blue-600" />
            </div>
            <div className="mt-5 grid gap-3">
              {[
                { icon: UploadSimple, label: "Subir informe", detail: "PDF, acta, planilla o entrevista" },
                { icon: CheckCircle, label: "Validar pendiente", detail: "Revisiones para dirección" },
                { icon: Users, label: "Asignar responsable", detail: "Equipo, rol y fecha límite" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:border-blue-200 hover:bg-blue-50/40"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-slate-700">
                        <Icon size={20} weight="bold" />
                      </span>
                      <span>
                        <span className="block text-sm font-extrabold text-slate-900">{item.label}</span>
                        <span className="block text-xs font-medium text-slate-500">{item.detail}</span>
                      </span>
                    </span>
                    <ArrowRight size={17} weight="bold" className="text-slate-400" />
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-950">Prioridades institucionales</h2>
            <div className="mt-5 space-y-4">
              {institutionalPriorities.map((priority) => (
                <div key={priority.title} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-extrabold text-slate-900">{priority.title}</p>
                      <p className="mt-1 text-sm leading-5 text-slate-500">{priority.description}</p>
                    </div>
                    <span className="rounded-lg bg-slate-950 px-2.5 py-1 text-sm font-extrabold text-white">{priority.count}</span>
                  </div>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-400">{priority.owner}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-950">Salud por equipo</h2>
            <ToneBadge tone="blue">4 áreas</ToneBadge>
          </div>
          <div className="mt-5 space-y-4">
            {teams.map((team) => {
              const Icon = team.icon;
              const completion = Math.min(96, 52 + team.documents / 2);
              return (
                <div key={team.id} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-slate-100 text-slate-700">
                      <Icon size={22} weight="fill" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-extrabold text-slate-900">{team.name}</p>
                        <span className="text-xs font-bold text-slate-500">{team.responseTime}</span>
                      </div>
                      <div className="mt-2">
                        <ProgressBar value={completion} tone={team.color === "emerald" ? "emerald" : team.color === "orange" ? "orange" : "blue"} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>{team.activeProjects} proyectos activos</span>
                    <span>{team.documents} documentos</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 p-5">
            <div>
              <h2 className="text-lg font-extrabold text-slate-950">Historial de carga</h2>
              <p className="mt-1 text-sm font-medium text-slate-500">Últimos movimientos visibles para trazabilidad.</p>
            </div>
            <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:text-blue-700">
              Registro completo
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {activity.map((item) => (
              <article key={`${item.time}-${item.title}`} className="grid gap-4 p-5 transition hover:bg-slate-50 sm:grid-cols-[150px_1fr_auto]">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wide text-slate-400">{item.time}</p>
                  <p className="mt-1 text-sm font-bold text-slate-700">{item.person}</p>
                </div>
                <div>
                  <ToneBadge tone={item.tone as "blue" | "emerald" | "orange" | "slate"}>{item.team}</ToneBadge>
                  <h3 className="mt-2 text-sm font-extrabold text-slate-950">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{item.detail}</p>
                </div>
                <button className="h-fit rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">
                  {item.action}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
