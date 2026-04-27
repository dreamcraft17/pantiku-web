"use client";

import { useEffect, useMemo, useState } from "react";
import { formatRupiah } from "@/lib/utils/format";

export function ImpactStatCard({
  label,
  value,
  numericValue,
  isCurrency = false,
  growth,
  icon,
}: {
  label: string;
  value?: string;
  numericValue?: number;
  isCurrency?: boolean;
  growth?: number;
  icon?: string;
}) {
  const growthLabel = growth == null ? null : `${growth >= 0 ? "+" : ""}${growth}%`;
  const resolvedTarget = useMemo(() => {
    if (typeof numericValue === "number" && Number.isFinite(numericValue)) return Math.max(0, Math.round(numericValue));
    if (!value) return null;
    const parsed = Number(value.replace(/[^\d-]/g, ""));
    return Number.isFinite(parsed) ? Math.max(0, Math.round(parsed)) : null;
  }, [numericValue, value]);
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (resolvedTarget == null) return;
    let animationFrame = 0;
    const durationMs = 900;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(Math.round(resolvedTarget * eased));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [resolvedTarget]);

  const displayValue =
    resolvedTarget == null
      ? value ?? "-"
      : isCurrency
        ? formatRupiah(animatedValue)
        : animatedValue.toLocaleString("id-ID");

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 transition-transform duration-300 hover:-translate-y-0.5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-600">{label}</p>
        {icon ? (
          <span className="inline-flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-emerald-100 text-base" aria-hidden="true">
            {icon}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-3xl font-bold text-emerald-800 tabular-nums">{displayValue}</p>
      {growthLabel ? <p className="mt-2 text-xs font-medium text-emerald-700">{growthLabel} bulan ini</p> : null}
    </div>
  );
}
