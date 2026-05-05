"use client";

import { 
  Plus, 
  MagnifyingGlass, 
  SquaresFour, 
  CalendarBlank, 
  DotsThree, 
  Paperclip, 
  Clock, 
  CheckCircle,
  WarningCircle,
  ChatCircleText
} from "@phosphor-icons/react";

export default function ProjectsPage() {
  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col space-y-6 pb-10">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tablero de Proyectos y Cargas</h1>
          <p className="text-slate-500 text-sm mt-1">Gestiona el flujo de trabajo de los distintos departamentos y la documentación.</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* View Toggles */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-lg border border-slate-200">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white shadow-sm text-slate-900 rounded-md text-sm font-semibold transition-all">
              <SquaresFour size={18} weight="bold" />
              Tablero
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-slate-500 hover:text-slate-900 rounded-md text-sm font-medium transition-all">
              <CalendarBlank size={18} weight="bold" />
              Calendario
            </button>
          </div>

          <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

          {/* Search */}
          <div className="relative hidden md:block">
            <MagnifyingGlass size={16} weight="bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar proyecto o informe..." 
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 shadow-sm"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm">
            <Plus size={16} weight="bold" />
            Nuevo Proyecto
          </button>
        </div>
      </div>

      {/* Kanban Board Layout */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-6 pt-2 snap-x">
        
        {/* Columna: Por Hacer */}
        <div className="w-[320px] flex-shrink-0 flex flex-col snap-start">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300 border-2 border-slate-100 shadow-sm"></div>
              <h3 className="font-bold text-slate-700">Por Hacer</h3>
              <span className="text-xs font-bold bg-slate-200 text-slate-600 px-2.5 py-0.5 rounded-full">1</span>
            </div>
            <button className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-1 rounded-md transition-colors"><Plus size={18} weight="bold"/></button>
          </div>
          
          <div className="flex flex-col gap-4">
            {/* Tarjeta */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-grab active:cursor-grabbing group">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold px-2.5 py-1 bg-pink-50 text-pink-700 rounded-md uppercase tracking-wider border border-pink-100">
                  Tutorías
                </span>
                <button className="text-slate-300 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"><DotsThree size={24} weight="bold"/></button>
              </div>
              <h4 className="font-bold text-slate-900 mb-2 leading-tight text-[15px]">Planificación Taller ESI</h4>
              <p className="text-sm text-slate-500 mb-5 line-clamp-2 leading-relaxed">Definir temarios e informes históricos a cargar para las charlas de 4to y 5to año.</p>
              
              <div className="flex items-center justify-between pt-3.5 border-t border-slate-100">
                <div className="flex items-center gap-3 text-slate-500 text-xs font-semibold">
                  <div className="flex items-center gap-1.5"><Clock size={16} weight="bold" /> 15 May</div>
                </div>
                <div className="w-7 h-7 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-pink-700 shadow-sm">SJ</div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna: En Curso */}
        <div className="w-[320px] flex-shrink-0 flex flex-col snap-start">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-blue-100 shadow-sm"></div>
              <h3 className="font-bold text-slate-700">En Curso</h3>
              <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full border border-blue-100">2</span>
            </div>
            <button className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-1 rounded-md transition-colors"><Plus size={18} weight="bold"/></button>
          </div>
          
          <div className="flex flex-col gap-4">
            {/* Tarjeta 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-grab group">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md uppercase tracking-wider border border-indigo-100">
                  DOE
                </span>
                <button className="text-slate-300 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"><DotsThree size={24} weight="bold"/></button>
              </div>
              <h4 className="font-bold text-slate-900 mb-1 leading-tight text-[15px]">Seguimiento Conductual 3A</h4>
              
              <div className="mt-4 mb-5">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-500">Carga de informes</span>
                  <span className="text-blue-600">65%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3.5 border-t border-slate-100">
                <div className="flex items-center gap-3 text-slate-500 text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-orange-500 bg-orange-50 px-2 py-1 rounded"><Clock size={16} weight="bold" /> 3 días</div>
                  <div className="flex items-center gap-1.5"><Paperclip size={16} weight="bold" /> 14</div>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm">V</div>
                  <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600 shadow-sm">M</div>
                </div>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-grab group">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md uppercase tracking-wider border border-slate-200">
                  Administración
                </span>
                <button className="text-slate-300 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"><DotsThree size={24} weight="bold"/></button>
              </div>
              <h4 className="font-bold text-slate-900 mb-1 leading-tight text-[15px]">Auditoría Histórica de Legajos</h4>
              
              <div className="mt-4 mb-5">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-500">Revisión de planillas</span>
                  <span className="text-blue-600">30%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3.5 border-t border-slate-100">
                <div className="flex items-center gap-3 text-slate-500 text-xs font-semibold">
                  <div className="flex items-center gap-1.5"><Clock size={16} weight="bold" /> 20 May</div>
                </div>
                <div className="w-7 h-7 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-orange-700 shadow-sm">LC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna: En Revisión (RESTABLECIDA) */}
        <div className="w-[320px] flex-shrink-0 flex flex-col snap-start">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-400 border-2 border-orange-100 shadow-sm"></div>
              <h3 className="font-bold text-slate-700">En Revisión</h3>
              <span className="text-xs font-bold bg-orange-50 text-orange-600 px-2.5 py-0.5 rounded-full border border-orange-100">1</span>
            </div>
            <button className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-1 rounded-md transition-colors"><Plus size={18} weight="bold"/></button>
          </div>
          
          <div className="flex flex-col gap-4">
            {/* Tarjeta de Revisión (Con diseño de alerta) */}
            <div className="bg-orange-50/50 p-5 rounded-2xl border border-orange-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all cursor-grab group">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-md uppercase tracking-wider border border-emerald-200">
                  Directores
                </span>
                <button className="text-orange-300 hover:text-orange-700 opacity-0 group-hover:opacity-100 transition-opacity"><DotsThree size={24} weight="bold"/></button>
              </div>
              <h4 className="font-bold text-slate-900 mb-2 leading-tight text-[15px]">Articulación Primaria - Secundaria</h4>
              
              <div className="bg-white p-3 rounded-lg border border-orange-100 mb-5 flex items-start gap-2">
                <WarningCircle size={18} weight="fill" className="text-orange-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-orange-800 font-medium leading-relaxed">
                  Esperando validación de la Dirección General sobre los informes del primer trimestre.
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-3.5 border-t border-orange-200/60">
                <div className="flex items-center gap-3 text-orange-700 text-xs font-semibold">
                  <div className="flex items-center gap-1.5"><Paperclip size={16} weight="bold" /> 8 actas</div>
                  <div className="flex items-center gap-1.5"><ChatCircleText size={16} weight="fill" /> 2</div>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm">G</div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna: Finalizado */}
        <div className="w-[320px] flex-shrink-0 flex flex-col snap-start">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-emerald-100 shadow-sm"></div>
              <h3 className="font-bold text-slate-700">Finalizado</h3>
              <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full border border-emerald-100">1</span>
            </div>
            <button className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-1 rounded-md transition-colors"><DotsThree size={24} weight="bold"/></button>
          </div>
          
          <div className="flex flex-col gap-4">
            {/* Tarjeta Finalizada */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm opacity-80 hover:opacity-100 transition-opacity cursor-grab group">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold px-2.5 py-1 bg-slate-200 text-slate-700 rounded-md uppercase tracking-wider border border-slate-300">
                  Académico
                </span>
                <CheckCircle size={22} weight="fill" className="text-emerald-500"/>
              </div>
              <h4 className="font-bold text-slate-900 mb-1 leading-tight text-[15px] line-through decoration-slate-400 decoration-2">Carga Histórica Trimestre 1</h4>
              
              <div className="flex items-center justify-between pt-3.5 mt-5 border-t border-slate-200">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                  <CheckCircle size={14} weight="bold" /> Completado el 28 Abr
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}