export function CampaignProgressBar({ collected, goal }: { collected: number; goal: number }) {
  const progress = goal > 0 ? Math.min(collected / goal, 1) : 0;
  return (
    <div>
      <div className="h-2 w-full rounded-full bg-slate-200">
        <div className="h-2 rounded-full bg-emerald-600" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}
