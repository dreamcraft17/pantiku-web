import { safeGet } from "./client";

export async function getImpactSummary() {
  return safeGet("/api/v1/impact/summary", null);
}

export async function getImpactStories() {
  return safeGet("/api/v1/impact/stories", []);
}
