"use client";

import { useEffect, useMemo, useState } from "react";
import { activity as baseActivity, institutionalPriorities, metrics as baseMetrics, projects as baseProjects, teams, type ProjectRisk, type ProjectStatus } from "../data";

export type Project = {
  id: string;
  title: string;
  team: string;
  owner: string;
  status: ProjectStatus;
  risk: ProjectRisk;
  progress: number;
  due: string;
  daysLeft: number;
  docs: number;
  comments: number;
  priority: string;
  summary: string;
  nextAction: string;
};

const STORAGE_KEY = "pucara.projects.v1";

function calculateDaysLeft(due: string) {
  const [dayStr, mon] = due.split(" ");
  const months: Record<string, number> = { Ene: 0, Feb: 1, Mar: 2, Abr: 3, May: 4, Jun: 5, Jul: 6, Ago: 7, Sep: 8, Oct: 9, Nov: 10, Dic: 11 };
  const day = Number(dayStr);
  const month = months[mon] ?? 4;
  const now = new Date();
  const target = new Date(now.getFullYear(), month, day);
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

export function useInstitutionalData() {
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window === "undefined") return baseProjects as Project[];
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return baseProjects as Project[];
    try { return JSON.parse(raw) as Project[]; } catch { return baseProjects as Project[]; }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const metrics = useMemo(() => {
    const active = projects.filter((p) => p.status !== "Finalizado").length;
    const docs = projects.reduce((acc, p) => acc + p.docs, 0);
    const dueSoon = projects.filter((p) => p.status !== "Finalizado" && p.daysLeft <= 7).length;
    const critical = projects.filter((p) => p.risk === "Crítico").length;

    return [
      { ...baseMetrics[0], value: String(active), trend: `${active} abiertos` },
      { ...baseMetrics[1], value: String(docs), trend: `Total documental` },
      { ...baseMetrics[2], value: String(dueSoon), trend: "Próximos 7 días" },
      { ...baseMetrics[3], value: String(critical), trend: "Riesgo crítico" },
    ];
  }, [projects]);

  const activity = useMemo(() => {
    const latest = [...projects]
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 3)
      .map((p) => ({
        time: `Vence en ${p.daysLeft} día(s)`,
        person: p.owner,
        team: p.team,
        title: p.title,
        detail: p.nextAction,
        action: "Abrir proyecto",
        tone: p.risk === "Crítico" ? "orange" : "blue",
      }));
    return [...latest, ...baseActivity].slice(0, 6);
  }, [projects]);

  const addProject = (input: Omit<Project, "id" | "daysLeft" | "docs" | "comments" | "progress">) => {
    const project: Project = {
      ...input,
      id: `p-${Date.now()}`,
      daysLeft: calculateDaysLeft(input.due),
      docs: 0,
      comments: 0,
      progress: input.status === "Finalizado" ? 100 : 0,
    };
    setProjects((prev) => [project, ...prev]);
  };

  return { projects, setProjects, teams, institutionalPriorities, metrics, activity, addProject };
}
