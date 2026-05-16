"use client";

import { Plus, FunnelSimple } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "../components/ui";
import { useProfile } from "../components/ProfileContext";

export default function CalendarioPage() {
  const { visibleTeam, profile, visibleProjects } = useProfile();
  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const monthDays = Array.from({ length: 31 }, (_, idx) => idx + 1);

  return (
    <div className="mx-auto flex h-full max-w-[1600px] flex-col gap-6 pb-8">
      <PageHeader
        eyebrow="Agenda Global"
        title="Calendario Institucional"
        description={`Agenda del perfil ${profile}: entregas y reuniones para ${visibleTeam}.`}
      >
        <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700">
          <FunnelSimple size={18} weight="bold" />
          Filtrar vista
        </button>
        <button className="flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700">
          <Plus size={18} weight="bold" />
          Nuevo evento
        </button>
      </PageHeader>

      <section className="flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Cabecera del Calendario */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-950">Calendario operativo ({visibleTeam})</h2>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Datos cargados por tu equipo</div>
          </div>
          
          {/* Leyenda */}
          <div className="hidden items-center gap-4 text-xs font-bold text-slate-500 md:flex">
            <span className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-blue-500"/> Entregas Proyectos</span>
            <span className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-emerald-500"/> Reuniones Staff</span>
            <span className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-rose-400"/> Feriados</span>
          </div>
        </div>

        {/* Grilla del Calendario */}
        <div className="flex flex-1 flex-col overflow-auto bg-slate-50">
          <div className="grid grid-cols-7 border-b border-slate-200 bg-white">
            {daysOfWeek.map((day) => (
              <div key={day} className="border-r border-slate-100 py-3 text-center text-[11px] font-black uppercase tracking-widest text-slate-400 last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid flex-1 grid-cols-7 grid-rows-5">
            {monthDays.map((dayNumber) => {
              const hasProject = visibleProjects.some((p) => {
                const fromDue = Number((p.due ?? "0").split(" ")[0]);
                const fromIso = Number((p as { dueDate?: string }).dueDate?.slice(8, 10));
                return fromDue === dayNumber || fromIso === dayNumber;
              });
              return (
              <div
                key={dayNumber}
                className="min-h-[110px] border-b border-r border-slate-200 bg-white p-2 transition hover:bg-slate-50/80"
              >
                <span className="block text-sm font-extrabold text-slate-400">{dayNumber}</span>
                <div className="mt-2 flex flex-col gap-1.5">
                  {hasProject ? (
                    <div className="rounded-md border border-blue-100 bg-blue-50 px-2 py-1.5 text-xs font-bold text-blue-800">
                      Entregas del equipo
                    </div>
                  ) : null}
                </div>
              </div>
            );})}          </div>
        </div>
      </section>
    </div>
  );
}