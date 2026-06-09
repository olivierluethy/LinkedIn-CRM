import { ExternalLink, ArrowRight, Trash2, CalendarPlus } from 'lucide-react';
import FOMOStrengthMeter from './FOMOStrengthMeter';

const STATUS_META = {
  warm: { label: 'Warm', dotClass: 'bg-warm' },
  pending: { label: 'Pending', dotClass: 'bg-pending' },
  connected: { label: 'Connected', dotClass: 'bg-connected' },
};

const NEXT_STATUS = { warm: 'pending', pending: 'connected' };

export default function LeadCard({ lead, fomoScore, creatorName, onMove, onDelete, onSchedule }) {
  const meta = STATUS_META[lead.status];

  return (
    <div className="bg-surface-alt border border-zinc-700/50 rounded-xl p-4 space-y-3 hover:border-zinc-600 transition-colors group">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <h3 className="font-semibold text-sm truncate">{lead.name}</h3>
          {creatorName && (
            <p className="text-xs text-zinc-500 mt-0.5 truncate">
              via <span className="text-zinc-400">{creatorName}</span>
            </p>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${meta.dotClass}`} />
          <span className="text-xs text-zinc-400">{meta.label}</span>
        </div>
      </div>

      <FOMOStrengthMeter score={fomoScore} size="sm" />

      {lead.notes && (
        <p className="text-xs text-zinc-500 line-clamp-2">{lead.notes}</p>
      )}

      <div className="flex items-center gap-1.5 pt-1">
        <a
          href={lead.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-brand-light hover:text-white transition-colors px-2 py-1.5 rounded-md hover:bg-zinc-700/50"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Profile
        </a>

        {lead.status !== 'connected' && onSchedule && (
          <button
            onClick={() => onSchedule(lead)}
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors px-2 py-1.5 rounded-md hover:bg-zinc-700/50"
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            Schedule
          </button>
        )}

        {NEXT_STATUS[lead.status] && (
          <button
            onClick={() => onMove(lead, NEXT_STATUS[lead.status])}
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors px-2 py-1.5 rounded-md hover:bg-zinc-700/50 ml-auto"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            {NEXT_STATUS[lead.status] === 'connected' ? 'Mark Connected' : 'Move'}
          </button>
        )}

        <button
          onClick={() => onDelete(lead.id)}
          className="text-zinc-600 hover:text-fomo-high transition-colors p-1.5 rounded-md hover:bg-zinc-700/50 opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
