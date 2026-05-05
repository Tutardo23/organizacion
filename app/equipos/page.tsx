"use client"; // Necesario para los íconos de Phosphor en Next.js App Router

import { 
  Users, 
  UsersThree, 
  Briefcase, 
  Files, 
  MagnifyingGlass, 
  Plus, 
  DotsThree,
  EnvelopeSimple,
  CaretRight
} from "@phosphor-icons/react";

export default function TeamsPage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-10">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Equipos de Trabajo</h1>
          <p className="text-slate-500 text-sm mt-1">Directorio de departamentos, responsables y carga de proyectos.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <MagnifyingGlass size={16} weight="bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar equipo o persona..." 
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent w-72 shadow-sm"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm">
            <Plus size={16} weight="bold" />
            Nuevo Equipo
          </button>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Card: DOE */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 relative">
            <div className="absolute top-6 right-6">
              <button className="text-slate-400 hover:text-slate-700 transition-colors">
                <DotsThree size={24} weight="bold" />
              </button>
            </div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4 border border-indigo-100">
              <UsersThree size={24} weight="fill" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Departamento de Orientación (DOE)</h2>
            <p className="text-sm text-slate-500 mt-1">Seguimiento psicológico y conductual del alumnado.</p>
          </div>
          
          <div className="p-6 bg-slate-50/50 flex-1 flex flex-col gap-5">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Responsable</span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">V</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Lic. Verón</p>
                  <p className="text-xs text-slate-500">Coordinador Principal</p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Miembros (4)</span>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600">MR</div>
                <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-600">AL</div>
                <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-xs font-bold text-emerald-600">TJ</div>
                <button className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 border-dashed flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-400 transition-colors">
                  <Plus size={12} weight="bold" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-4 text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-1.5"><Briefcase size={16} className="text-blue-500" /> 2 Activos</div>
              <div className="flex items-center gap-1.5"><Files size={16} className="text-emerald-500" /> 14 Informes</div>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-1">
              Ver detalle <CaretRight size={14} weight="bold" />
            </button>
          </div>
        </div>

        {/* Card: Directores de Nivel */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 relative">
            <div className="absolute top-6 right-6">
              <button className="text-slate-400 hover:text-slate-700 transition-colors">
                <DotsThree size={24} weight="bold" />
              </button>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4 border border-emerald-100">
              <Briefcase size={24} weight="fill" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Directores de Nivel</h2>
            <p className="text-sm text-slate-500 mt-1">Gestión académica y articulación entre primaria y secundaria.</p>
          </div>
          
          <div className="p-6 bg-slate-50/50 flex-1 flex flex-col gap-5">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Responsable</span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">G</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Prof. Gómez</p>
                  <p className="text-xs text-slate-500">Director General</p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Miembros (3)</span>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-xs font-bold text-orange-600">PT</div>
                <div className="w-8 h-8 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center text-xs font-bold text-pink-600">RS</div>
                <button className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 border-dashed flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-400 transition-colors">
                  <Plus size={12} weight="bold" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-4 text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-1.5"><Briefcase size={16} className="text-blue-500" /> 1 Activo</div>
              <div className="flex items-center gap-1.5"><Files size={16} className="text-emerald-500" /> 38 Informes</div>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-1">
              Ver detalle <CaretRight size={14} weight="bold" />
            </button>
          </div>
        </div>

        {/* Card: Administración */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 relative">
            <div className="absolute top-6 right-6">
              <button className="text-slate-400 hover:text-slate-700 transition-colors">
                <DotsThree size={24} weight="bold" />
              </button>
            </div>
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-4 border border-orange-100">
              <Files size={24} weight="fill" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Administración y Secretaría</h2>
            <p className="text-sm text-slate-500 mt-1">Control de legajos, asistencia docente y documentación legal.</p>
          </div>
          
          <div className="p-6 bg-slate-50/50 flex-1 flex flex-col gap-5">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Responsable</span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-800 flex items-center justify-center text-xs font-bold">LC</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Lucía Casares</p>
                  <p className="text-xs text-slate-500">Jefa de Secretaría</p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Miembros (5)</span>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600">AB</div>
                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600">CD</div>
                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600">EF</div>
                <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">+2</div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-4 text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-1.5"><Briefcase size={16} className="text-blue-500" /> 3 Activos</div>
              <div className="flex items-center gap-1.5"><Files size={16} className="text-emerald-500" /> 102 Informes</div>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-1">
              Ver detalle <CaretRight size={14} weight="bold" />
            </button>
          </div>
        </div>

      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-8">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Directorio de Personal</h2>
          <button className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-2 border border-slate-200 px-3 py-1.5 rounded-lg">
            <Users size={16} /> Exportar Lista
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4 pl-6">Nombre</th>
                <th className="p-4">Rol / Cargo</th>
                <th className="p-4">Equipo</th>
                <th className="p-4">Última Actividad</th>
                <th className="p-4 text-right pr-6">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* Fila 1 */}
              <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 pl-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">V</div>
                    <span className="font-semibold text-slate-900">Lic. Verón</span>
                  </div>
                </td>
                <td className="p-4 text-slate-600">Coordinador Principal</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium text-xs">DOE</span>
                </td>
                <td className="p-4 text-slate-500">Hoy, 11:30 AM</td>
                <td className="p-4 text-right pr-6">
                  <button className="text-slate-400 hover:text-blue-600 transition-colors p-1.5">
                    <EnvelopeSimple size={18} />
                  </button>
                </td>
              </tr>
              
              {/* Fila 2 */}
              <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 pl-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">G</div>
                    <span className="font-semibold text-slate-900">Prof. Gómez</span>
                  </div>
                </td>
                <td className="p-4 text-slate-600">Director General</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium text-xs">Directores</span>
                </td>
                <td className="p-4 text-slate-500">Ayer, 16:45 PM</td>
                <td className="p-4 text-right pr-6">
                  <button className="text-slate-400 hover:text-blue-600 transition-colors p-1.5">
                    <EnvelopeSimple size={18} />
                  </button>
                </td>
              </tr>

               {/* Fila 3 */}
               <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 pl-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">MR</div>
                    <span className="font-semibold text-slate-900">Martín Rivas</span>
                  </div>
                </td>
                <td className="p-4 text-slate-600">Psicopedagogo</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium text-xs">DOE</span>
                </td>
                <td className="p-4 text-slate-500">28 Abr 2026</td>
                <td className="p-4 text-right pr-6">
                  <button className="text-slate-400 hover:text-blue-600 transition-colors p-1.5">
                    <EnvelopeSimple size={18} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}