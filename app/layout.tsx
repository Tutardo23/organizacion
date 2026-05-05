import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar"; // Ajusta la ruta si es necesario
import { Bell } from "@phosphor-icons/react/dist/ssr";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gestión Administrativa | Colegio Pucará",
  description: "Plataforma de gestión de informes y proyectos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased flex h-screen overflow-hidden`}>
        
        <Sidebar />

        <main className="flex-1 flex flex-col overflow-hidden relative">
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10 sticky top-0">
            <div className="text-sm text-slate-500 font-medium">
              Panel de Administración
            </div>
            <div className="flex items-center gap-5">
              <button className="relative text-slate-400 hover:text-blue-600 transition-colors">
                <Bell size={24} />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer hover:bg-slate-800 transition-colors">
                S
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}