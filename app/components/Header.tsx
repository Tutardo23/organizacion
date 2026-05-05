"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Briefcase,
  CalendarCheck,
  ChartLineUp,
  FileArrowUp,
  FilePdf,
  House,
  List,
  MagnifyingGlass,
  Plus,
  Users,
  X,
  FileText,
  CheckCircle
} from "@phosphor-icons/react/dist/ssr";
import { projects } from "../data";

const navItems = [
  { name: "Panel", href: "/", icon: House, badge: null },
  { name: "Proyectos", href: "/proyectos", icon: Briefcase, badge: "5" },
  { name: "Equipos", href: "/equipos", icon: Users, badge: null },
];

const secondaryItems = [
  { name: "Calendario", href: "/calendario", icon: CalendarCheck },
  { name: "Indicadores", href: "/indicadores", icon: ChartLineUp },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success">("idle");

  // Simulación de carga premium
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadState("uploading");
    setTimeout(() => {
      setUploadState("success");
      setTimeout(() => {
        setIsUploadOpen(false);
        setUploadState("idle");
      }, 1500);
    }, 2000);
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur md:px-8">
        
        {/* Botón menú móvil (Solo visible en celulares) */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm md:hidden"
        >
          <List size={20} weight="bold" />
        </button>

        {/* Buscador (Se oculta en móvil muy chico para priorizar botones) */}
        <div className="hidden min-w-0 flex-1 items-center sm:flex">
          <div className="relative w-full max-w-xl">
            <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Buscar alumno, informe, proyecto..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Acciones de la derecha */}
        <div className="flex shrink-0 items-center gap-2 md:gap-3 ml-auto sm:ml-0">
          <button 
            onClick={() => setIsUploadOpen(true)}
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 md:px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={17} weight="bold" />
            <span className="hidden sm:block">Cargar informe</span>
          </button>
          
          <button className="relative grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-blue-200 hover:text-blue-700">
            <Bell size={20} weight="bold" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
          </button>
          
          <div className="hidden h-10 items-center gap-3 rounded-lg border border-slate-200 bg-white px-2.5 shadow-sm md:flex">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-slate-950 text-xs font-extrabold text-white">S</div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-slate-900">Secretaría</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Admin</p>
            </div>
          </div>
        </div>
      </header>

      {/* MENÚ MÓVIL (Slide-over) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative flex w-4/5 max-w-sm flex-col bg-white shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-blue-700 text-xs font-black text-white shadow-sm">P</div>
                <span className="text-sm font-bold text-slate-900">Colegio Pucará</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-slate-900">
                <X size={24} weight="bold" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <p className="mb-3 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Principal</p>
              <div className="space-y-1 mb-8">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-bold transition ${isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}>
                      <span className="flex items-center gap-3">
                        <Icon size={20} weight={isActive ? "fill" : "bold"} />
                        {item.name}
                      </span>
                      {item.badge && <span className={`rounded-md px-2 py-0.5 text-[10px] ${isActive ? "bg-blue-200/50 text-blue-800" : "bg-slate-100 text-slate-500"}`}>{item.badge}</span>}
                    </Link>
                  );
                })}
              </div>

              <p className="mb-3 px-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Planificación</p>
              <div className="space-y-1">
                {secondaryItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold transition ${isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}>
                      <Icon size={20} weight={isActive ? "fill" : "bold"} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL GLOBAL: CARGAR INFORME */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => uploadState === "idle" && setIsUploadOpen(false)} />
          
          <div className="relative w-full max-w-xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex-shrink-0 px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h2 className="text-lg md:text-xl font-extrabold tracking-tight text-slate-950">Subir documento</h2>
                <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Repositorio Institucional</p>
              </div>
              {uploadState === "idle" && (
                <button onClick={() => setIsUploadOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-slate-50 text-slate-400 transition hover:bg-slate-200 hover:text-slate-900">
                  <X size={20} weight="bold" />
                </button>
              )}
            </div>

            {/* Modal Body */}
            {uploadState === "idle" ? (
              <form id="uploadForm" onSubmit={handleUpload} className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Proyecto Asociado</label>
                  <select required className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-800 shadow-sm outline-none transition focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100 appearance-none">
                    <option value="">Selecciona un proyecto...</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.title} ({p.team})</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Tipo de Documento</label>
                    <select required className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-800 shadow-sm outline-none transition focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100 appearance-none">
                      <option>Acta de Reunión</option>
                      <option>Informe de Seguimiento</option>
                      <option>Planilla de Asistencia</option>
                      <option>Evaluación Diagnóstica</option>
                      <option>Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Fecha del Documento</label>
                    <input type="date" required className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-800 shadow-sm outline-none transition focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100" />
                  </div>
                </div>

                {/* Zona de Drop */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Archivo Adjunto</label>
                  <div className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 transition-colors hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer">
                    <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 group-hover:ring-blue-200">
                      <FileArrowUp size={24} weight="bold" className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <p className="text-sm font-extrabold text-slate-700 text-center">Arrastra el archivo aquí o haz clic para buscar</p>
                    <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">PDF, DOCX, XLSX (Max. 10MB)</p>
                    <input type="file" required className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Comentarios (Opcional)</label>
                  <textarea rows={2} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100 resize-none" placeholder="Añade notas adicionales sobre el documento..."></textarea>
                </div>
              </form>
            ) : (
              /* Estado de Subida / Éxito */
              <div className="flex-1 flex flex-col items-center justify-center p-12 min-h-[400px]">
                {uploadState === "uploading" ? (
                  <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    <div className="relative mb-6">
                      <div className="h-20 w-20 rounded-full border-4 border-slate-100"></div>
                      <div className="absolute inset-0 h-20 w-20 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                      <FilePdf size={28} weight="fill" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900">Subiendo documento...</h3>
                    <p className="text-sm font-bold text-slate-500 mt-2">Encriptando y guardando en repositorio</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
                      <CheckCircle size={40} weight="fill" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900">¡Documento cargado!</h3>
                    <p className="text-sm font-bold text-slate-500 mt-2">El informe ya está disponible en el proyecto.</p>
                  </div>
                )}
              </div>
            )}

            {/* Modal Footer */}
            {uploadState === "idle" && (
              <div className="flex-shrink-0 px-6 py-4 border-t border-slate-100 bg-white flex flex-col-reverse sm:flex-row gap-3">
                <button type="button" onClick={() => setIsUploadOpen(false)} className="w-full sm:w-auto flex-1 h-11 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">
                  Cancelar
                </button>
                <button type="submit" form="uploadForm" className="w-full sm:w-auto flex-[2] h-11 rounded-xl bg-slate-950 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700">
                  Subir y asociar informe
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}