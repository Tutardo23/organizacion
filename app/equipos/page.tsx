import {
  ArrowRight,
  Briefcase,
  DotsThree,
  EnvelopeSimple,
  Export,
  Files,
  MagnifyingGlass,
  Plus,
  UserPlus,
} from "@phosphor-icons/react/dist/ssr";
import { projects, staff, teams } from "../data";
import { PageHeader, ProgressBar, ToneBadge } from "../components/ui";

const teamTone = {
  doe: "indigo",
  directores: "emerald",
  secretaria: "orange",
  academico: "blue",
} as const;

export default function TeamsPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-8 pb-10">
      <PageHeader
        eyebrow="Mapa de responsabilidades"
        title="Equipos, referentes y carga de trabajo"
        description="Un directorio vivo para saber quién lidera cada área, qué proyectos tiene abiertos y dónde conviene reforzar seguimiento."
      >
        <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700">
          <Export size={18} weight="bold" />
          Exportar
        </button>
        <button className="flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700">
          <UserPlus size={18} weight="bold" />
          Nuevo integrante
        </button>
      </PageHeader>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Buscar equipo, persona, cargo o área..."
            className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="grid grid-cols-3 gap-3 sm:w-[480px]">
          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Equipos</p>
            <p className="mt-1 text-xl font-extrabold text-slate-950">{teams.length}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Personas</p>
            <p className="mt-1 text-xl font-extrabold text-slate-950">{staff.length}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Activos</p>
            <p className="mt-1 text-xl font-extrabold text-blue-700">{projects.filter((project) => project.status !== "Finalizado").length}</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        {teams.map((team) => {
          const Icon = team.icon;
          const completion = Math.min(96, 52 + team.documents / 2);
          return (
            <article key={team.id} className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="border-b border-slate-100 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-slate-100 text-slate-700">
                    <Icon size={25} weight="fill" />
                  </div>
                  <button className="text-slate-300 transition hover:text-slate-700">
                    <DotsThree size={24} weight="bold" />
                  </button>
                </div>
                <div className="mt-5">
                  <ToneBadge tone={teamTone[team.id as keyof typeof teamTone]}>{team.shortName}</ToneBadge>
                  <h2 className="mt-3 text-lg font-extrabold leading-tight text-slate-950">{team.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{team.description}</p>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-5 bg-slate-50/60 p-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Responsable</p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-slate-950 text-xs font-extrabold text-white">
                      {team.lead
                        .split(" ")
                        .filter(Boolean)
                        .slice(-1)[0]
                        .charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-950">{team.lead}</p>
                      <p className="text-xs font-medium text-slate-500">{team.leadRole}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-xs font-bold">
                    <span className="uppercase tracking-wide text-slate-400">Carga saludable</span>
                    <span className="text-blue-700">{Math.round(completion)}%</span>
                  </div>
                  <ProgressBar value={completion} tone={team.color === "emerald" ? "emerald" : team.color === "orange" ? "orange" : "blue"} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <Briefcase size={18} weight="fill" className="text-blue-600" />
                    <p className="mt-2 text-lg font-extrabold text-slate-950">{team.activeProjects}</p>
                    <p className="text-xs font-bold text-slate-500">Proyectos</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <Files size={18} weight="fill" className="text-emerald-600" />
                    <p className="mt-2 text-lg font-extrabold text-slate-950">{team.documents}</p>
                    <p className="text-xs font-bold text-slate-500">Documentos</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Miembros</p>
                  <div className="mt-3 flex -space-x-2">
                    {team.members.slice(0, 4).map((member) => (
                      <div
                        key={member}
                        className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-white text-[10px] font-extrabold text-slate-600 shadow-sm ring-1 ring-slate-200"
                      >
                        {member}
                      </div>
                    ))}
                    <button className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-slate-950 text-white shadow-sm">
                      <Plus size={12} weight="bold" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 bg-white p-4">
                <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-extrabold text-blue-700 transition hover:bg-blue-50">
                  Ver tablero del equipo
                  <ArrowRight size={17} weight="bold" />
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 p-5">
            <div>
              <h2 className="text-lg font-extrabold text-slate-950">Directorio de personal</h2>
              <p className="mt-1 text-sm font-medium text-slate-500">Contactos y estado de actividad por área.</p>
            </div>
            <button className="hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:text-blue-700 sm:block">
              Exportar lista
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-white text-xs font-bold uppercase tracking-wide text-slate-400">
                  <th className="px-5 py-4">Nombre</th>
                  <th className="px-5 py-4">Rol</th>
                  <th className="px-5 py-4">Equipo</th>
                  <th className="px-5 py-4">Última actividad</th>
                  <th className="px-5 py-4">Estado</th>
                  <th className="px-5 py-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {staff.map((person) => (
                  <tr key={person.name} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-lg bg-slate-950 text-xs font-extrabold text-white">{person.initials}</div>
                        <span className="font-extrabold text-slate-950">{person.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-600">{person.role}</td>
                    <td className="px-5 py-4">
                      <ToneBadge tone={person.team === "DOE" ? "indigo" : person.team === "Dirección" ? "emerald" : person.team === "Secretaría" ? "orange" : "blue"}>
                        {person.team}
                      </ToneBadge>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-500">{person.lastActivity}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">{person.status}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-700">
                        <EnvelopeSimple size={18} weight="bold" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-950">Sugerencias de coordinación</h2>
          <div className="mt-5 space-y-4">
            <div className="rounded-lg border border-orange-100 bg-orange-50 p-4">
              <p className="text-sm font-extrabold text-orange-900">Reforzar dirección esta semana</p>
              <p className="mt-2 text-sm leading-6 text-orange-800">
                Hay validaciones acumuladas en articulación y seguimiento trimestral. Conviene reservar un bloque de revisión.
              </p>
            </div>
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-extrabold text-blue-900">Unificar criterios de carga</p>
              <p className="mt-2 text-sm leading-6 text-blue-800">
                DOE y Secretaría cargan documentos similares. Un formulario común bajaría errores y duplicación.
              </p>
            </div>
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-sm font-extrabold text-emerald-900">Buen ritmo documental</p>
              <p className="mt-2 text-sm leading-6 text-emerald-800">
                La documentación crítica está cerca del objetivo. Mantener responsables visibles ayuda a sostenerlo.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
