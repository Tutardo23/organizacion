"use client";

import { 
  CaretLeft, 
  CaretRight, 
  Plus, 
  FunnelSimple,
  CalendarCheck
} from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "../components/ui";

export default function CalendarioPage() {
  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  // Generamos un array de 35 días para simular una grilla de mes completo
  const days = Array.from({ length: 35 }).map((_, i) => {
    const dayNumber = i - 2; // Desfasaje para que empiece un miércoles (ejemplo)
    const isCurrentMonth = dayNumber > 0 && dayNumber <= 31;
    return { dayNumber, isCurrentMonth };
  });

  return (
    <div className="mx-auto flex h-full max-w-[1600px] flex-col gap-6 pb-8">
      <PageHeader
        eyebrow="Agenda Global"
        title="Calendario Institucional"
        description="Visión unificada de entregas de proyectos, reuniones de equipo, jornadas docentes y feriados escolares."
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
            <h2 className="text-xl font-extrabold tracking-tight text-slate-950">Mayo 2026</h2>
            <div className="flex items-center gap-1">
              <button className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">
                <CaretLeft size={16} weight="bold" />
              </button>
              <button className="px-3 py-1 text-sm font-bold text-slate-600 transition hover:text-slate-900">
                Hoy
              </button>
              <button className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">
                <CaretRight size={16} weight="bold" />
              </button>
            </div>
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
            {days.map((day, idx) => (
              <div 
                key={idx} 
                className={`min-h-[120px] border-b border-r border-slate-200 p-2 transition hover:bg-slate-50/80 ${day.isCurrentMonth ? 'bg-white' : 'bg-slate-50/50'}`}
              >
                {day.dayNumber > 0 && day.dayNumber <= 31 ? (
                  <>
                    <span className={`block text-sm font-extrabold ${day.dayNumber === 5 ? 'flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white' : 'text-slate-400'}`}>
                      {day.dayNumber}
                    </span>
                    
                    <div className="mt-2 flex flex-col gap-1.5">
                      {/* Simulando eventos clave */}
                      {day.dayNumber === 8 && (
                        <div className="rounded-md border border-blue-100 bg-blue-50 px-2 py-1.5 shadow-sm cursor-pointer hover:border-blue-300 transition">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-blue-500">10:00 AM</p>
                          <p className="text-xs font-bold leading-tight text-blue-800">Entrega Seguimiento 3A (DOE)</p>
                        </div>
                      )}
                      {day.dayNumber === 10 && (
                        <div className="rounded-md border border-emerald-100 bg-emerald-50 px-2 py-1.5 shadow-sm cursor-pointer hover:border-emerald-300 transition">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-500">14:30 PM</p>
                          <p className="text-xs font-bold leading-tight text-emerald-800">Reunión Articulación Directiva</p>
                        </div>
                      )}
                      {day.dayNumber === 25 && (
                        <div className="rounded-md border border-rose-100 bg-rose-50 px-2 py-1.5 shadow-sm">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-rose-500">Todo el día</p>
                          <p className="text-xs font-bold leading-tight text-rose-800">Feriado Nacional (25 de Mayo)</p>
                        </div>
                      )}
                    </div>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}