import { NextRequest, NextResponse } from "next/server";
import { generateId, readStore, writeStore } from "../../../../lib/store";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const store = await readStore();
  const index = store.projects.findIndex((p) => p.id === id);
  if (index < 0) return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });

  store.projects[index] = { ...store.projects[index], ...body, updatedAt: new Date().toISOString() };
  store.audit.unshift({ id: generateId("audit"), action: "Proyecto actualizado", actor: body.actor ?? "Sistema", at: new Date().toISOString(), entity: "project", entityId: id });
  await writeStore(store);
  return NextResponse.json({ project: store.projects[index] });
}
