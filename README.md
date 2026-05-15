# Pucará Gestión Institucional

## Estado actual (Fase 1 + Fase 2 funcional)

La app ahora incluye backend operativo con API routes para:
- Proyectos (`GET/POST /api/projects`, `PATCH /api/projects/:id`)
- Eventos (`GET/POST /api/events`)
- Documentos (`GET/POST /api/documents`)
- Métricas por perfil (`GET /api/dashboard`)

Los datos se persisten en `data/runtime-store.json` automáticamente (sin depender de servicios externos).

## Perfiles soportados
- Secretaría
- Dirección
- DOE
- Académico

## Probar flujo real rápido
1. Levantar app: `npm run dev`
2. Crear proyecto:
```bash
curl -X POST http://localhost:3000/api/projects \
  -H 'content-type: application/json' \
  -d '{"title":"Seguimiento Inasistencias 2B","team":"DOE","owner":"Lic. Verón","dueDate":"2026-06-07","summary":"Seguimiento de casos","nextAction":"Convocar reunión"}'
```
3. Ver proyectos por perfil:
```bash
curl 'http://localhost:3000/api/projects?profile=DOE'
```
4. Crear documento:
```bash
curl -X POST http://localhost:3000/api/documents \
  -H 'content-type: application/json' \
  -d '{"projectId":"<ID_PROYECTO>","name":"Acta reunión familia","uploadedBy":"Secretaría","team":"DOE"}'
```
5. Métricas:
```bash
curl 'http://localhost:3000/api/dashboard?profile=DOE'
```

---

## Cómo conectarlo a Neon (PostgreSQL)

### Variables de entorno
Crear `.env.local` con:
```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
```

### Esquema recomendado en Neon
```sql
create table teams (
  id text primary key,
  name text not null,
  short_name text not null unique
);

create table projects (
  id text primary key,
  title text not null,
  team text not null references teams(short_name),
  owner text not null,
  status text not null,
  risk text not null,
  progress int not null default 0,
  due_date date not null,
  docs int not null default 0,
  comments int not null default 0,
  priority text not null,
  summary text not null,
  next_action text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table events (
  id text primary key,
  title text not null,
  team text not null references teams(short_name),
  starts_at timestamptz not null,
  type text not null
);

create table documents (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  team text not null references teams(short_name),
  name text not null,
  type text not null,
  date date not null,
  uploaded_by text not null
);

create table audit_log (
  id text primary key,
  action text not null,
  actor text not null,
  at timestamptz not null default now(),
  entity text not null,
  entity_id text not null
);
```

### Qué cargar inicialmente
- 4 equipos (`DOE`, `Dirección`, `Secretaría`, `Académico`)
- proyectos activos reales del colegio
- eventos del mes (entregas, reuniones directivas, feriados)
- responsables de cada proyecto

> Con eso ya puedes reemplazar `runtime-store.json` por Neon sin cambiar el contrato de APIs.
