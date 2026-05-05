"use client";

import { 
  Briefcase, 
  Users, 
  Plus, 
  CalendarBlank, 
  CheckCircle,
  FileText,
  CloudArrowUp,
  MagnifyingGlass,
  ArrowUpRight,
  Clock
} from "@phosphor-icons/react";

export default function Dashboard() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Seguimiento de Equipos</h1>
          <p className="text-slate-500 text-sm mt-1">Monitorea el avance de proyectos, responsables y carga histórica de informes.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar informe o docente..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors shadow-md shadow-slate-200">
            <Plus size={18} weight="bold" />
            Nuevo Proyecto
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-center hover:border-blue-200 transition-colors">
          <div className="flex items-center gap-3 text-slate-500 mb-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
              <Briefcase size={22} weight="fill" />
            </div>
            <h3 className="text-sm font-semibold text-slate-700">Proyectos Activos</h3>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">12</span>
            <span className="flex items-center text-sm font-medium text-emerald-600 mb-1 bg-emerald-50 px-2 py-0.5 rounded">
              <ArrowUpRight size={16} weight="bold" className="mr-1"/> 2 nuevos
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium mt-3">
            Distribuidos en 4 departamentos diferentes
          </span>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-center hover:border-emerald-200 transition-colors">
          <div className="flex items-center gap-3 text-slate-500 mb-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle size={22} weight="fill" />
            </div>
            <h3 className="text-sm font-semibold text-slate-700">Informes Subidos</h3>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">142</span>
          </div>
          <span className="text-xs text-emerald-700 font-semibold mt-3 bg-emerald-100/50 w-fit px-2.5 py-1 rounded-md">
            +15% de carga histórica este mes
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-center relative overflow-hidden">
           <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-400"></div>
           <div className="flex items-center gap-2 mb-4">
             <Clock size={20} weight="fill" className="text-orange-500" />
             <h3 className="text-sm font-bold text-slate-900">Entregas Próximas a Vencer</h3>
           </div>
           <div className="space-y-3.5">
             <div className="flex items-center justify-between text-sm p-2 bg-orange-50/50 rounded-lg border border-orange-100">
               <span className="font-medium text-slate-700">Articulación Primaria</span>
               <span className="text-orange-600 font-bold bg-white px-2.5 py-1 rounded shadow-sm border border-orange-100">3 días</span>
             </div>
             <div className="flex items-center justify-between text-sm p-2 hover:bg-slate-50 rounded-lg transition-colors">
               <span className="font-medium text-slate-600">Planilla Histórica ESI</span>
               <span className="text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded">12 días</span>
             </div>
           </div>
        </div>
      </div>

      {/* Main Grid: Projects & Timeline */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Active Projects List */}
        <div className="xl:col-span-2 flex flex-col gap-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-900">Proyectos en Curso (Detalle)</h2>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">Ver todos</button>
          </div>
          
          {/* Tarjeta de Proyecto 1: DOE */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -z-10 opacity-50 group-hover:scale-110 transition-transform"></div>
            <div className="flex justify-between items-start mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md uppercase tracking-widest border border-indigo-100">
                    DOE
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Seguimiento Conductual Trimestral
                  </h3>
                </div>
                <p className="text-sm text-slate-500 pr-10">
                  Análisis y carga de informes de entrevistas con alumnos de 3er año. Registro histórico del ciclo lectivo.
                </p>
              </div>
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full bg-slate-800 border-2 border-white flex items-center justify-center text-xs font-bold text-white z-20 shadow-sm" title="Lic. Verón">V</div>
                <div className="w-9 h-9 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600 z-10 shadow-sm" title="Martín Rivas">MR</div>
                <div className="w-9 h-9 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600 z-0 shadow-sm" title="Ana López">AL</div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-600 mb-6 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <Users size={18} weight="bold" className="text-slate-400" />
                <span className="font-semibold text-slate-900">Lic. Verón</span> <span className="text-xs text-slate-400">(Resp.)</span>
              </div>
              <div className="w-px h-4 bg-slate-300 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <CalendarBlank size={18} weight="bold" className="text-slate-400" />
                <span className="font-medium text-slate-700">10 Mar - 30 May</span>
              </div>
              <div className="w-px h-4 bg-slate-300 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <FileText size={18} weight="bold" className="text-indigo-400" />
                <span className="font-medium text-indigo-700">14 Informes subidos</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-slate-700">Progreso de carga histórica</span>
                <span className="font-bold text-blue-600">65%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>

          {/* Tarjeta de Proyecto 2: Directores */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-10 opacity-50 group-hover:scale-110 transition-transform"></div>
            <div className="flex justify-between items-start mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md uppercase tracking-widest border border-emerald-100">
                    Directores de Nivel
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Articulación Primaria - Secundaria
                  </h3>
                </div>
                <p className="text-sm text-slate-500 pr-10">
                  Documentación, actas de reuniones y adaptación de currícula para el traspaso de nivel.
                </p>
              </div>
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full bg-slate-800 border-2 border-white flex items-center justify-center text-xs font-bold text-white z-20 shadow-sm" title="Prof. Gómez">G</div>
                <div className="w-9 h-9 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600 z-10 shadow-sm" title="Pablo Torres">PT</div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-600 mb-6 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <Users size={18} weight="bold" className="text-slate-400" />
                <span className="font-semibold text-slate-900">Prof. Gómez</span> <span className="text-xs text-slate-400">(Resp.)</span>
              </div>
              <div className="w-px h-4 bg-slate-300 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <CalendarBlank size={18} weight="bold" className="text-slate-400" />
                <span className="font-medium text-slate-700">01 Abr - 15 May</span>
              </div>
              <div className="w-px h-4 bg-slate-300 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <FileText size={18} weight="bold" className="text-emerald-400" />
                <span className="font-medium text-emerald-700">8 Actas subidas</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-slate-700">Progreso general de documentación</span>
                <span className="font-bold text-emerald-600">85%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>

        </div>

        {/* Timeline Histórico de Carga (Right Sidebar) */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col h-fit">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Historial de Carga</h2>
              <p className="text-xs text-slate-500 mt-0.5">Últimos movimientos del sistema</p>
            </div>
            <button className="text-slate-400 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg">
              <CloudArrowUp size={24} weight="bold" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="space-y-8">
              
              {/* Item 1 */}
              <div className="relative pl-6 border-l-2 border-slate-100">
                <div className="absolute w-3.5 h-3.5 bg-white border-[3px] border-blue-500 rounded-full -left-[9px] top-0.5 shadow-sm"></div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Hoy, 11:30 AM</div>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold uppercase border border-slate-200">Verón</span>
                </div>
                <div className="text-sm font-bold text-slate-900">Informe de Observación Áulica 3A</div>
                <div className="text-sm text-slate-500 mt-1 italic leading-relaxed">
                  "Registro histórico de la observación en la clase de matemáticas de la Prof. Laura."
                </div>
                <button className="mt-3 text-xs font-bold text-blue-700 hover:bg-blue-100 flex items-center gap-1.5 transition-colors bg-blue-50 w-fit px-3 py-2 rounded-lg border border-blue-100">
                  <FileText size={16} weight="fill" /> Ver documento en visor
                </button>
              </div>

              {/* Item 2 */}
              <div className="relative pl-6 border-l-2 border-slate-100">
                <div className="absolute w-3.5 h-3.5 bg-white border-[3px] border-emerald-500 rounded-full -left-[9px] top-0.5 shadow-sm"></div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Ayer, 16:45 PM</div>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold uppercase border border-slate-200">Gómez</span>
                </div>
                <div className="text-sm font-bold text-slate-900">Acta de Articulación Primaria</div>
                <div className="text-sm text-slate-500 mt-1">
                  Se subió el acta firmada por los directivos de ambos niveles.
                </div>
                <button className="mt-3 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors bg-slate-50 w-fit px-3 py-2 rounded-lg border border-slate-200">
                  <FileText size={16} weight="fill" /> Descargar PDF
                </button>
              </div>

              {/* Item 3 */}
              <div className="relative pl-6 border-l-2 border-slate-100">
                <div className="absolute w-3.5 h-3.5 bg-white border-[3px] border-slate-300 rounded-full -left-[9px] top-0.5"></div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">02 Mayo, 09:15 AM</div>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold uppercase border border-slate-200">Administración</span>
                </div>
                <div className="text-sm font-bold text-slate-900">Carga Histórica de Legajos</div>
                <div className="text-sm text-slate-500 mt-1">
                  Se consolidó la planilla de inasistencias docentes de Abril.
                </div>
              </div>

            </div>
          </div>
          
          <div className="p-4 border-t border-slate-100 text-center bg-slate-50">
            <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors py-1 w-full">
              Abrir registro completo de carga
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}