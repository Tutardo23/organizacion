"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  SquaresFour, 
  Users, 
  Gear, 
  SignOut, 
  Briefcase 
} from "@phosphor-icons/react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Tablero General', href: '/', icon: SquaresFour },
    { name: 'Proyectos', href: '/proyectos', icon: Briefcase },
    { name: 'Equipos', href: '/equipos', icon: Users },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <span className="font-bold text-xl tracking-tight text-slate-800">
          Pucará<span className="text-blue-600">.</span>
        </span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
          Gestión
        </div>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name}
              href={item.href} 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
                isActive 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={20} weight={isActive ? "fill" : "regular"} className={isActive ? "text-blue-600" : ""} />
              {item.name}
            </Link>
          );
        })}
        
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 mt-8 px-2">
          Administración
        </div>
        
        <Link href="/ajustes" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium transition-all">
          <Gear size={20} />
          Ajustes
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg font-medium transition-colors">
          <SignOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}