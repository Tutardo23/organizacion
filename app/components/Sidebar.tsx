"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  CalendarCheck,
  ChartLineUp,
  Gear,
  House,
  SignOut,
  Users,
} from "@phosphor-icons/react";

const navItems = [
  { name: "Panel", href: "/", icon: House, badge: null },
  { name: "Proyectos", href: "/proyectos", icon: Briefcase, badge: "5" },
  { name: "Equipos", href: "/equipos", icon: Users, badge: null },
];

const secondaryItems = [
  { name: "Calendario", href: "/calendario", icon: CalendarCheck },
  { name: "Indicadores", href: "/indicadores", icon: ChartLineUp },
  { name: "Ajustes", href: "/ajustes", icon: Gear },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="z-20 hidden w-72 shrink-0 flex-col border-r border-slate-200 bg-white shadow-[4px_0_28px_rgba(15,23,42,0.04)] md:flex">
      <div className="flex h-16 items-center gap-3 border-b border-slate-100 px-6">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-700 text-sm font-black text-white shadow-sm">
          P
        </div>
        <div className="min-w-0">
          <p className="text-base font-extrabold tracking-tight text-slate-950">Pucará</p>
          <p className="truncate text-xs font-semibold text-slate-500">Gestión institucional</p>
        </div>
      </div>

      <div className="border-b border-slate-100 p-4">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wide text-blue-700">Ciclo 2026</span>
            <span className="rounded-md bg-white px-2 py-1 text-[11px] font-bold text-blue-700 shadow-sm">86%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
            <div className="h-full w-[86%] rounded-full bg-blue-700" />
          </div>
          <p className="mt-3 text-xs font-medium leading-5 text-blue-900">
            Documentación crítica con responsable asignado.
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-5">
        <p className="px-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Trabajo diario</p>
        <div className="mt-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-bold transition ${
                  isActive
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={20} weight={isActive ? "fill" : "regular"} />
                  {item.name}
                </span>
                {item.badge ? (
                  <span className={`rounded-md px-2 py-0.5 text-[11px] ${isActive ? "bg-white/15 text-white" : "bg-blue-50 text-blue-700"}`}>
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>

        <p className="mt-8 px-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Planificación</p>
        <div className="mt-3 space-y-1">
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-slate-100 bg-slate-50 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-rose-50 hover:text-rose-700">
          <SignOut size={20} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
