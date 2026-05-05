import type { Metadata } from "next";
import { Bell, Command, MagnifyingGlass, Plus } from "@phosphor-icons/react/dist/ssr";
import Sidebar from "./components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gestión Institucional | Colegio Pucará",
  description: "Panel de seguimiento para proyectos, equipos, informes y documentación escolar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="flex h-screen overflow-hidden bg-slate-50 text-slate-950 antialiased">
        <Sidebar />

        <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur md:px-8">
            <div className="hidden min-w-0 flex-1 items-center md:flex">
              <div className="relative w-full max-w-xl">
                <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  placeholder="Buscar alumno, informe, proyecto o responsable..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-24 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
                <span className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-bold text-slate-400 lg:flex">
                  <Command size={12} weight="bold" /> K
                </span>
              </div>
            </div>

            <div className="flex min-w-0 items-center gap-3 md:hidden">
              <span className="truncate text-sm font-bold text-slate-900">Colegio Pucará</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 sm:flex">
                <Plus size={17} weight="bold" />
                Cargar informe
              </button>
              <button className="relative grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:text-blue-700">
                <Bell size={22} />
                <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-rose-500" />
              </button>
              <div className="flex h-10 items-center gap-3 rounded-lg border border-slate-200 bg-white px-2.5 shadow-sm">
                <div className="grid h-7 w-7 place-items-center rounded-md bg-slate-950 text-xs font-extrabold text-white">S</div>
                <div className="hidden leading-tight lg:block">
                  <p className="text-xs font-bold text-slate-900">Secretaría</p>
                  <p className="text-[11px] font-medium text-slate-500">Turno mañana</p>
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">{children}</div>
        </main>
      </body>
    </html>
  );
}
