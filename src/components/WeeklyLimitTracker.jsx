import { Zap, AlertTriangle, CheckCircle } from 'lucide-react';

export default function WeeklyLimitTracker({ sent, remaining, maxPerWeek, isAtLimit }) {
  const pct = Math.min(100, (sent / maxPerWeek) * 100);

  let barColor = 'bg-connected';
  let icon = <Zap className="w-4 h-4" />;
  if (pct >= 90) {
    barColor = 'bg-fomo-high';
    icon = <AlertTriangle className="w-4 h-4 text-fomo-high" />;
  } else if (pct >= 70) {
    barColor = 'bg-warm';
    icon = <AlertTriangle className="w-4 h-4 text-warm" />;
  }

  return (
    <div className="bg-surface rounded-xl border border-zinc-800 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          {icon}
          <span>Weekly Invites</span>
        </div>
        <span className="text-xs text-zinc-400">Resets Monday</span>
      </div>

      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-2xl font-bold tabular-nums">{sent}</span>
        <span className="text-zinc-500 text-sm">/ {maxPerWeek}</span>
      </div>

      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-2 text-xs text-zinc-400">
        {isAtLimit ? (
          <span className="text-fomo-high font-medium">Limit reached — new leads go to Pending</span>
        ) : (
          <span>{remaining} invites remaining this week</span>
        )}
      </div>
    </div>
  );
}
