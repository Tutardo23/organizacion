import {
  CalendarBlank,
  ChatCircleText,
  CheckCircle,
  Clock,
  DotsThree,
  FunnelSimple,
  MagnifyingGlass,
  Paperclip,
  Plus,
  SquaresFour,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";
import type { ProjectStatus } from "../data";
import { projects } from "../data";
import { PageHeader, ProgressBar, ToneBadge } from "../components/ui";

const columns: ProjectStatus[] = ["Por hacer", "En curso", "En revisión", "Finalizado"];

const columnTone = {
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

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex h-full max-w-[1600px] flex-col gap-6 pb-8">
      <PageHeader
        eyebrow="Flujo de trabajo"
        title="Proyectos, cargas y validaciones"
        description="Vista operativa para entender dónde está cada iniciativa, qué documentación tiene, quién responde y qué decisión falta."
      >
        <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
          <button className="flex h-8 items-center gap-2 rounded-md bg-slate-950 px-3 text-sm font-bold text-white">
            <SquaresFour size={17} weight="bold" />
            Tablero
          </button>
          <button className="flex h-8 items-center gap-2 rounded-md px-3 text-sm font-bold text-slate-500 transition hover:text-slate-900">
            <CalendarBlank size={17} weight="bold" />
            Calendario
          </button>
        </div>
        <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700">
          <FunnelSimple size={18} weight="bold" />
          Filtros
        </button>
        <button className="flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700">
          <Plus size={18} weight="bold" />
          Nuevo proyecto
        </button>
      </PageHeader>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Buscar por proyecto, equipo, responsable o próxima acción..."
            className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="grid grid-cols-3 gap-3 sm:w-[520px]">
          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">A tiempo</p>
            <p className="mt-1 text-xl font-extrabold text-emerald-600">8</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">En alerta</p>
            <p className="mt-1 text-xl font-extrabold text-orange-600">3</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Bloqueados</p>
            <p className="mt-1 text-xl font-extrabold text-rose-600">1</p>
          </div>
        </div>
      </section>

      <section className="flex flex-1 gap-5 overflow-x-auto pb-4">
        {columns.map((column) => {
          const columnProjects = projects.filter((project) => project.status === column);
          return (
            <div key={column} className="flex w-[340px] shrink-0 flex-col">
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full ${
                      column === "En curso"
                        ? "bg-blue-500"
                        : column === "En revisión"
                          ? "bg-orange-400"
                          : column === "Finalizado"
                            ? "bg-emerald-500"
                            : "bg-slate-300"
                    }`}
                  />
                  <h2 className="font-extrabold text-slate-800">{column}</h2>
                  <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-extrabold text-slate-500 shadow-sm ring-1 ring-slate-200">
                    {columnProjects.length}
                  </span>
                </div>
                <button className="grid h-8 w-8 place-items-center rounded-lg bg-white text-slate-400 shadow-sm ring-1 ring-slate-200 transition hover:text-blue-700">
                  <Plus size={17} weight="bold" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {columnProjects.map((project) => (
                  <article
                    key={project.id}
                    className={`rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                      project.risk === "Crítico" ? "border-orange-200 bg-orange-50/40" : "border-slate-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <ToneBadge tone={columnTone[column]}>{project.team}</ToneBadge>
                        <ToneBadge tone={riskTone[project.risk]}>{project.risk}</ToneBadge>
                      </div>
                      <button className="text-slate-300 transition hover:text-slate-700">
                        <DotsThree size={24} weight="bold" />
                      </button>
                    </div>

                    <h3 className="mt-4 text-base font-extrabold leading-tight text-slate-950">{project.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{project.summary}</p>

                    {project.status === "En revisión" ? (
                      <div className="mt-4 flex items-start gap-2 rounded-lg border border-orange-100 bg-white p-3">
                        <WarningCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-orange-500" />
                        <p className="text-xs font-bold leading-5 text-orange-800">{project.nextAction}</p>
                      </div>
                    ) : null}

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-500">Avance documental</span>
                        <span className={project.status === "Finalizado" ? "text-emerald-600" : "text-blue-700"}>{project.progress}%</span>
                      </div>
                      <ProgressBar value={project.progress} tone={project.status === "Finalizado" ? "emerald" : project.risk === "Crítico" ? "orange" : "blue"} />
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        {project.status === "Finalizado" ? <CheckCircle size={16} weight="fill" className="text-emerald-500" /> : <Clock size={16} weight="bold" className="text-orange-500" />}
                        {project.status === "Finalizado" ? `Completado ${project.due}` : `${project.daysLeft} días`}
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                        <span className="flex items-center gap-1">
                          <Paperclip size={16} weight="bold" /> {project.docs}
                        </span>
                        <span className="flex items-center gap-1">
                          <ChatCircleText size={16} weight="bold" /> {project.comments}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-400">Responsable</span>
                      <span className="text-xs font-extrabold text-slate-800">{project.owner}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
