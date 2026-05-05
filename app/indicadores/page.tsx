"use client";

import { 
  ChartLineUp, 
  DownloadSimple, 
  FunnelSimple, 
  TrendUp,
  UsersThree
} from "@phosphor-icons/react/dist/ssr";
import { PageHeader, MetricCard, ToneBadge, ProgressBar } from "../components/ui";
import { metrics, teams } from "../data";

export default function IndicadoresPage() {
  return (
    <div className="mx-auto flex h-full max-w-[1600px] flex-col gap-6 pb-8">
      <PageHeader
        eyebrow="Analítica institucional"
        title="Indicadores de Gestión"
        description="Métricas en tiempo real sobre el rendimiento de los equipos, carga de documentación y estado general del ciclo lectivo."
      >
        <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700">
          <FunnelSimple size={18} weight="bold" />
          Filtrar período
        </button>
        <button className="flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700">
          <DownloadSimple size={18} weight="bold" />
          Exportar reporte
        </button>
      </PageHeader>

      {/* Tarjetas de Métricas Principales (Reutilizando tu UI y Data) */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, idx) => (
          <MetricCard
            key={idx}
            label={metric.label}
            value={metric.value}
            detail={metric.detail}
            trend={metric.trend}
            icon={metric.icon}
            tone={metric.tone}
          />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Gráfico de Rendimiento por Departamento */}
        <section className="col-span-1 lg:col-span-2 flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChartLineUp size={24} className="text-slate-400" />
              <h2 className="text-lg font-extrabold text-slate-950">Rendimiento Documental por Equipo</h2>
            </div>
            <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 outline-none">
              <option>Este mes</option>
              <option>Trimestre anterior</option>
            </select>
          </div>
          
          <div className="flex-1 space-y-6">
            {teams.map((team) => (
              <div key={team.id} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-600">
                      <team.icon size={18} weight="fill" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{team.name}</h3>
                      <p className="text-[11px] font-medium text-slate-500">Tiempo de respuesta: {team.responseTime}</p>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-slate-900">{team.documents} doc.</span>
                </div>
                <ProgressBar value={Math.min((team.documents / 150) * 100, 100)} tone={team.color as any} />
              </div>
            ))}
          </div>
        </section>

        {/* Resumen de Eficiencia */}
        <section className="col-span-1 flex flex-col rounded-xl border border-slate-200 bg-slate-950 p-6 shadow-md">
           <div className="mb-2 flex items-center gap-2 text-white/60">
              <TrendUp size={20} weight="bold" />
              <h2 className="text-sm font-bold uppercase tracking-widest">Eficiencia Global</h2>
           </div>
           <p className="mt-2 text-5xl font-extrabold tracking-tight text-white">86%</p>
           <p className="mt-2 text-sm leading-6 text-slate-400">
             De los informes y proyectos requeridos para este ciclo han sido cargados o tienen un responsable asignado trabajando en ellos.
           </p>
           
           <div className="mt-8 flex-1 rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">Cuellos de botella</h3>
              <ul className="space-y-3">
                <li className="flex items-start justify-between border-b border-white/10 pb-3">
                  <span className="text-sm font-medium text-slate-300">Validaciones directivas</span>
                  <ToneBadge tone="rose">3 días retraso</ToneBadge>
                </li>
                <li className="flex items-start justify-between">
                  <span className="text-sm font-medium text-slate-300">Carga de actas ESI</span>
                  <ToneBadge tone="orange">En riesgo</ToneBadge>
                </li>
              </ul>
           </div>
        </section>
      </div>
    </div>
  );
}