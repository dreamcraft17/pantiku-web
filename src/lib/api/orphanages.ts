import { mockOrphanages } from "../mock/data";
import { safeGet } from "./client";

export async function getOrphanages() {
  return safeGet("/api/v1/orphanages", mockOrphanages);
}

export async function getOrphanageById(id: string) {
  const all = await getOrphanages();
  return all.find((item) => item.id === id) ?? null;
}
