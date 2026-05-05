"use client";

import { useState } from "react";
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
  GoogleLogo,
  X,
  ArrowRight,
  ArrowLeft,
  TrendUp,
  FilePdf
} from "@phosphor-icons/react/dist/ssr";
import type { ProjectStatus } from "../data";
import { projects, teams, staff, activity } from "../data";
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
  const [view, setView] = useState<"board" | "calendar">("board");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncCalendar = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="mx-auto flex h-full max-w-[1600px] flex-col gap-6 pb-8">
      <PageHeader
        eyebrow="Flujo de trabajo"
        title="Proyectos, cargas y validaciones"
        description="Vista operativa para entender dónde está cada iniciativa, qué documentación tiene, quién responde y qué decisión falta."
      >
        <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
          <button 
            onClick={() => setView("board")}
            className={`flex h-8 items-center gap-2 rounded-md px-3 text-sm font-bold transition ${
              view === "board" ? "bg-slate-950 text-white" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <SquaresFour size={17} weight="bold" />
            Tablero
          </button>
          <button 
            onClick={() => setView("calendar")}
            className={`flex h-8 items-center gap-2 rounded-md px-3 text-sm font-bold transition ${
              view === "calendar" ? "bg-slate-950 text-white" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <CalendarBlank size={17} weight="bold" />
            Calendario
          </button>
        </div>
        <button 
          onClick={handleSyncCalendar}
          className={`flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 ${isSyncing ? "animate-pulse" : ""}`}
        >
          <GoogleLogo size={18} weight="bold" className="text-blue-600" />
          {isSyncing ? "Sincronizando..." : "Vincular"}
        </button>
        <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700">
          <FunnelSimple size={18} weight="bold" />
          Filtros
        </button>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
        >
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

      {view === "board" ? (
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
                      onClick={() => setSelectedProject(project)}
                      className={`cursor-pointer rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
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
      ) : (
        /* VISTA CALENDARIO - Estética Amplia y Limpia */
        <section className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">Mayo 2026</h2>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-3 mr-4">
                 <span className="flex items-center gap-2 text-sm font-bold text-slate-500"><div className="h-3 w-3 rounded-full bg-blue-500"/> En curso</span>
                 <span className="flex items-center gap-2 text-sm font-bold text-slate-500"><div className="h-3 w-3 rounded-full bg-orange-400"/> Revisión</span>
               </div>
               <div className="flex gap-2">
                <button className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"><ArrowLeft size={20} weight="bold"/></button>
                <button className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"><ArrowRight size={20} weight="bold"/></button>
               </div>
            </div>
          </div>
          <div className="overflow-x-auto min-w-full flex-1">
            <div className="min-w-[800px] grid grid-cols-7 border-t border-l border-slate-100 h-full">
              {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(d => (
                <div key={d} className="bg-slate-50 p-4 text-center text-xs font-bold uppercase tracking-widest text-slate-500 border-r border-b border-slate-100">{d}</div>
              ))}
              {Array.from({ length: 31 }).map((_, i) => {
                const dayProjects = projects.filter(p => parseInt(p.due.split(" ")[0]) === i + 1);
                return (
                  <div key={i} className="min-h-[140px] p-2 border-r border-b border-slate-100 transition hover:bg-slate-50/50">
                    <span className="text-sm font-extrabold text-slate-400 ml-2 mt-1 block">{i + 1}</span>
                    <div className="mt-2 space-y-2">
                      {dayProjects.map(p => (
                        <div 
                          key={p.id}
                          onClick={() => setSelectedProject(p)}
                          className={`cursor-pointer rounded-lg p-2.5 shadow-sm border transition hover:shadow-md ${p.status === "En revisión" ? "bg-orange-50 border-orange-200" : "bg-blue-50 border-blue-200"}`}
                        >
                          <p className={`text-xs font-bold leading-tight ${p.status === "En revisión" ? "text-orange-800" : "text-blue-800"}`}>{p.title}</p>
                          <p className={`text-[10px] font-bold uppercase tracking-wide mt-1 ${p.status === "En revisión" ? "text-orange-500" : "text-blue-500"}`}>{p.team}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* PANEL LATERAL DE DETALLE (Slide-Over) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedProject(null)} />
          <div className="relative w-full max-w-xl h-full bg-slate-50 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col border-l border-slate-200">
            
            <div className="px-8 py-6 border-b border-slate-200 bg-white flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <ToneBadge tone="slate">{selectedProject.team}</ToneBadge>
                  <ToneBadge tone={riskTone[selectedProject.risk]}>{selectedProject.risk}</ToneBadge>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-950 mt-1">{selectedProject.title}</h2>
              </div>
              <button onClick={() => setSelectedProject(null)} className="grid h-10 w-10 place-items-center rounded-full bg-slate-50 text-slate-400 transition hover:bg-slate-200 hover:text-slate-900">
                <X size={20} weight="bold" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Estado General</p>
                  <div className="flex items-center gap-3">
                    <span className={`h-3 w-3 rounded-full ${selectedProject.status === "Finalizado" ? "bg-emerald-500" : selectedProject.status === "En revisión" ? "bg-orange-400" : "bg-blue-500"}`} />
                    <span className="text-base font-extrabold text-slate-900">{selectedProject.status}</span>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Vencimiento</p>
                  <div className="flex items-center gap-3">
                    <Clock size={20} weight="bold" className="text-slate-400" />
                    <span className="text-base font-extrabold text-slate-900">{selectedProject.due}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                  <TrendUp size={18} weight="bold" className="text-slate-400"/> Progreso del equipo
                </h3>
                <div>
                   <div className="flex justify-between items-center text-sm font-bold mb-3">
                      <span className="text-slate-600">Avance documental</span>
                      <span className="text-slate-900">{selectedProject.progress}%</span>
                   </div>
                   <ProgressBar value={selectedProject.progress} tone={selectedProject.status === "Finalizado" ? "emerald" : "blue"} />
                </div>
                <p className="text-sm leading-6 text-slate-600">
                  El equipo liderado por <span className="font-extrabold text-slate-900">{selectedProject.owner}</span> tiene <span className="font-extrabold text-slate-900">{selectedProject.docs} documentos</span> cargados y listos para revisión en la plataforma.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                  <Paperclip size={18} weight="bold" className="text-slate-400"/> Entregables
                </h3>
                <div className="divide-y divide-slate-100 rounded-lg border border-slate-100 bg-slate-50 overflow-hidden">
                  {activity.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between transition hover:bg-slate-100 cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="grid h-10 w-10 place-items-center rounded-lg bg-rose-100 text-rose-600"><FilePdf size={20} weight="fill" /></div>
                        <div>
                          <p className="text-sm font-extrabold text-slate-900">{item.title}</p>
                          <p className="text-xs font-medium text-slate-500 mt-1">{item.time} • Por {item.person}</p>
                        </div>
                      </div>
                      <ArrowRight size={16} weight="bold" className="text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL NUEVO PROYECTO (Respetando inputs de layout.tsx) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-slate-50 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-200 bg-white flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-950">Nueva iniciativa</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">Configura los parámetros del proyecto y asigna responsables.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="grid h-10 w-10 place-items-center rounded-lg bg-slate-50 text-slate-400 transition hover:bg-slate-200 hover:text-slate-900">
                <X size={20} weight="bold" />
              </button>
            </div>
            
            <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
               <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Nombre del Proyecto</label>
                  <input 
                    type="text" 
                    placeholder="Ej: Auditoría Trimestral"
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100" 
                  />
               </div>

               <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Equipo Encargado</label>
                    <select className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100 appearance-none">
                      {teams.map(t => <option key={t.id}>{t.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Responsable Directo</label>
                    <select className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100 appearance-none">
                      {staff.map(s => <option key={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Fecha de Vencimiento</label>
                    <input type="date" className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Sincronización</label>
                    <div className="flex items-center gap-3 h-11 px-4 rounded-lg border border-slate-200 bg-white shadow-sm">
                      <GoogleLogo size={18} weight="bold" className="text-blue-600" />
                      <span className="text-sm font-medium text-slate-700">Crear evento</span>
                      <input type="checkbox" defaultChecked className="ml-auto h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    </div>
                  </div>
               </div>

               <div className="pt-6 flex gap-4 border-t border-slate-200">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="h-11 flex-1 rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">
                    Cancelar
                  </button>
                  <button type="submit" className="h-11 flex-[2] rounded-lg bg-slate-950 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700">
                    Crear proyecto
                  </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}