"use client";

import { useQuery } from "@tanstack/react-query";
import { getCampaignById, getCampaigns } from "@/lib/api/campaigns";

export function useCampaigns() {
  return useQuery({ queryKey: ["campaigns"], queryFn: getCampaigns });
}

export function useCampaignDetail(id: string) {
  return useQuery({
    queryKey: ["campaign", id],
    queryFn: () => getCampaignById(id),
    enabled: Boolean(id),
  });
}
