"use client";

import { FunnelSimple, MagnifyingGlass, Plus, X } from "@phosphor-icons/react/dist/ssr";
import { useMemo, useState } from "react";
import { PageHeader, ProgressBar, ToneBadge } from "../components/ui";
import { useInstitutionalData } from "../lib/useInstitutionalData";

export default function ProjectsPage() {
  const { projects, addProject } = useInstitutionalData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Todos");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => projects.filter((p) => (status === "Todos" || p.status === status) && `${p.title} ${p.team} ${p.owner}`.toLowerCase().includes(query.toLowerCase())), [projects, query, status]);

  return (
    <div className="mx-auto flex h-full max-w-[1600px] flex-col gap-6 pb-8">
      <PageHeader eyebrow="Flujo de trabajo" title="Proyectos, cargas y validaciones" description="Vista funcional: búsqueda, filtros y alta de proyectos persistente en navegador.">
        <button onClick={() => setOpen(true)} className="flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white shadow-sm"><Plus size={18} weight="bold" />Nuevo proyecto</button>
      </PageHeader>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_auto]">
        <div className="relative"><MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por proyecto, equipo o responsable" className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm" /></div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3"><FunnelSimple size={18} /><select value={status} onChange={(e) => setStatus(e.target.value)} className="h-11 bg-transparent text-sm font-bold outline-none"><option>Todos</option><option>Por hacer</option><option>En curso</option><option>En revisión</option><option>Finalizado</option></select></div>
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold">{filtered.length} resultados</div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filtered.map((project) => (
          <article key={project.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap gap-2"><ToneBadge tone="blue">{project.team}</ToneBadge><ToneBadge tone={project.status === "Finalizado" ? "emerald" : project.status === "En revisión" ? "orange" : "slate"}>{project.status}</ToneBadge></div>
            <h3 className="mt-3 text-lg font-extrabold text-slate-950">{project.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{project.summary}</p>
            <div className="mt-4"><ProgressBar value={project.progress} tone={project.risk === "Crítico" ? "orange" : "blue"} /></div>
            <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-500"><span>{project.owner}</span><span>Vence {project.due}</span></div>
          </article>
        ))}
      </section>

      {open && <ProjectModal onClose={() => setOpen(false)} onSave={(payload) => { addProject(payload); setOpen(false); }} />}
    </div>
  );
}

type NewProjectPayload = { title: string; team: string; owner: string; due: string; status: "Por hacer"; risk: "Normal"; priority: string; summary: string; nextAction: string; };

function ProjectModal({ onClose, onSave }: { onClose: () => void; onSave: (payload: NewProjectPayload) => void }) {
  const [title, setTitle] = useState("");
  const [team, setTeam] = useState("DOE");
  const [owner, setOwner] = useState("");
  const [due, setDue] = useState("15 May");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <form onSubmit={(e) => { e.preventDefault(); onSave({ title, team, owner, due, status: "Por hacer", risk: "Normal", priority: "Media", summary: "Nuevo proyecto cargado desde panel", nextAction: "Definir primer hito" }); }} className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between"><h3 className="text-xl font-extrabold">Nuevo proyecto</h3><button type="button" onClick={onClose}><X size={20} /></button></div>
        <div className="grid gap-4">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className="h-11 rounded-lg border border-slate-200 px-3" placeholder="Título" />
          <input required value={owner} onChange={(e) => setOwner(e.target.value)} className="h-11 rounded-lg border border-slate-200 px-3" placeholder="Responsable" />
          <input value={team} onChange={(e) => setTeam(e.target.value)} className="h-11 rounded-lg border border-slate-200 px-3" placeholder="Equipo" />
          <input value={due} onChange={(e) => setDue(e.target.value)} className="h-11 rounded-lg border border-slate-200 px-3" placeholder="Vencimiento ej: 22 May" />
        </div>
        <div className="mt-6 flex gap-3"><button type="button" onClick={onClose} className="h-10 flex-1 rounded-lg border border-slate-200">Cancelar</button><button className="h-10 flex-1 rounded-lg bg-slate-950 text-white">Guardar</button></div>
      </form>
    </div>
  );
}
