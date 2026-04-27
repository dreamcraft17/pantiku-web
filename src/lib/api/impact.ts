import { mockImpactStories, mockImpactSummary } from "../mock/data";
import { safeGet } from "./client";

export async function getImpactSummary() {
  return safeGet("/api/v1/impact/summary", mockImpactSummary);
}

export async function getImpactStories() {
  return safeGet("/api/v1/impact/stories", mockImpactStories);
}
