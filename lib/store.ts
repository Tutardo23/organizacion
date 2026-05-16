import { promises as fs } from "fs";
import path from "path";
import { projects, activity } from "../app/data";

export type RoleProfile = "Secretaría" | "Dirección" | "DOE" | "Académico";
export type ProjectStatus = "Por hacer" | "En curso" | "En revisión" | "Finalizado";

export type ProjectRecord = {
  id: string;
  title: string;
  team: string;
  owner: string;
  status: ProjectStatus;
  risk: "Normal" | "Atención" | "Crítico";
  progress: number;
  dueDate: string;
  docs: number;
  comments: number;
  priority: string;
  summary: string;
  nextAction: string;
  createdAt: string;
  updatedAt: string;
};

type Store = {
  projects: ProjectRecord[];
  events: { id: string; title: string; team: string; startsAt: string; type: "Entrega" | "Reunión" | "Feriado" }[];
  documents: { id: string; projectId: string; team: string; name: string; type: string; date: string; uploadedBy: string }[];
  audit: { id: string; action: string; actor: string; at: string; entity: string; entityId: string }[];
};

const STORE_PATH = path.join(process.cwd(), "data", "runtime-store.json");

const profileToTeam: Record<RoleProfile, string> = {
  "Secretaría": "Secretaría",
  "Dirección": "Dirección",
  DOE: "DOE",
  "Académico": "Académico",
};

function normalizeDueDate(due: string) {
  const [day, mon] = due.split(" ");
  const map: Record<string, string> = { Ene: "01", Feb: "02", Mar: "03", Abr: "04", May: "05", Jun: "06", Jul: "07", Ago: "08", Sep: "09", Oct: "10", Nov: "11", Dic: "12" };
  return `2026-${map[mon] ?? "05"}-${String(Number(day)).padStart(2, "0")}`;
}

function seedStore(): Store {
  const now = new Date().toISOString();
  return {
    projects: projects.map((p) => ({ ...p, dueDate: normalizeDueDate(p.due), createdAt: now, updatedAt: now })),
    events: [
      { id: "evt-1", title: "Entrega Seguimiento 3A", team: "DOE", startsAt: "2026-05-08T10:00:00.000Z", type: "Entrega" },
      { id: "evt-2", title: "Reunión Articulación Directiva", team: "Dirección", startsAt: "2026-05-10T14:30:00.000Z", type: "Reunión" },
    ],
    documents: [],
    audit: activity.slice(0, 4).map((a, i) => ({ id: `audit-${i + 1}`, action: a.title, actor: a.person, at: now, entity: "activity", entityId: `activity-${i + 1}` })),
  };
}

export async function readStore(): Promise<Store> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    return JSON.parse(raw) as Store;
  } catch {
    const seeded = seedStore();
    await writeStore(seeded);
    return seeded;
  }
}

export async function writeStore(store: Store) {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2));
}

export function scopedProjects(projectsData: ProjectRecord[], profile?: string) {
  if (!profile) return projectsData;
  const key = profile as RoleProfile;
  if (!(key in profileToTeam)) return projectsData;
  return projectsData.filter((p) => p.team === profileToTeam[key]);
}

export function generateId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}
