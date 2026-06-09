export default function FOMOStrengthMeter({ score, size = 'md' }) {
  const segments = 5;
  const filled = Math.round((score / 100) * segments);

  const getColor = (idx) => {
    if (idx >= filled) return 'bg-zinc-700';
    if (score >= 70) return 'bg-fomo-high';
    if (score >= 40) return 'bg-fomo-mid';
    return 'bg-fomo-low';
  };

  const getLabel = () => {
    if (score >= 70) return 'High FOMO';
    if (score >= 40) return 'Medium';
    return 'Low';
  };

  const h = size === 'sm' ? 'h-1.5' : 'h-2';
  const gap = size === 'sm' ? 'gap-0.5' : 'gap-1';

  return (
    <div className="flex items-center gap-2">
      <div className={`flex ${gap} flex-1`}>
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`${h} flex-1 rounded-full transition-colors ${getColor(i)}`}
          />
        ))}
      </div>
      {size !== 'sm' && (
        <span
          className={`text-xs font-medium ${
            score >= 70 ? 'text-fomo-high' : score >= 40 ? 'text-fomo-mid' : 'text-zinc-500'
          }`}
        >
          {getLabel()}
        </span>
      )}
    </div>
  );
}
