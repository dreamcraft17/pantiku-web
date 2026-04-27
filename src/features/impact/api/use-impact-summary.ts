"use client";

import { useQuery } from "@tanstack/react-query";
import { getImpactStories, getImpactSummary } from "@/lib/api/impact";

export function useImpactSummary() {
  return useQuery({
    queryKey: ["impact"],
    queryFn: getImpactSummary,
    refetchInterval: 30_000,
    refetchIntervalInBackground: true
  });
}

export function useImpactStories() {
  return useQuery({
    queryKey: ["impact-stories"],
    queryFn: getImpactStories,
    refetchInterval: 30_000,
    refetchIntervalInBackground: true
  });
}
