import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
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
          {/* El Header ahora maneja toda la lógica móvil y el modal global */}
          <Header />

          {/* El contenedor principal con scroll */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}