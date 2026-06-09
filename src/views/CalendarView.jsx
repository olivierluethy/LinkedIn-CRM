import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Trash2, ExternalLink, CheckCircle2 } from 'lucide-react';

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7; // Monday-first
  const days = [];

  // Previous month padding
  for (let i = startOffset - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({ date: d, isCurrentMonth: false });
  }
  // Current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({ date: new Date(year, month, i), isCurrentMonth: true });
  }
  // Next month padding
  const remaining = 7 - (days.length % 7);
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
  }

  return days;
}

function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function CalendarView({ scheduled, leads, onRemoveScheduled, onUpdateScheduled }) {
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(() => new Date().getMonth());

  const days = useMemo(() => getMonthDays(year, month), [year, month]);

  const scheduleMap = useMemo(() => {
    const map = {};
    for (const item of scheduled) {
      if (!map[item.date]) map[item.date] = [];
      map[item.date].push(item);
    }
    return map;
  }, [scheduled]);

  const leadMap = useMemo(() => {
    const map = {};
    for (const l of leads) map[l.id] = l;
    return map;
  }, [leads]);

  const today = formatDate(new Date());

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const monthLabel = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="shrink-0 px-6 py-5 border-b border-zinc-800">
        <h1 className="text-xl font-bold">Smart Calendar</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Schedule connection requests to avoid spam filters</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-semibold">{monthLabel}</span>
          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 gap-px bg-zinc-800 rounded-xl overflow-hidden border border-zinc-800">
          {WEEKDAYS.map((d) => (
            <div key={d} className="bg-zinc-900 py-2 text-center text-xs font-medium text-zinc-500">
              {d}
            </div>
          ))}
          {days.map(({ date, isCurrentMonth }, i) => {
            const key = formatDate(date);
            const items = scheduleMap[key] || [];
            const isToday = key === today;

            return (
              <div
                key={i}
                className={`bg-zinc-900 min-h-[100px] p-2 ${!isCurrentMonth ? 'opacity-30' : ''}`}
              >
                <div className={`text-xs font-medium mb-1 w-6 h-6 flex items-center justify-center rounded-full ${
                  isToday ? 'bg-brand text-white' : 'text-zinc-400'
                }`}>
                  {date.getDate()}
                </div>
                <div className="space-y-1">
                  {items.map((item) => {
                    const lead = leadMap[item.leadId];
                    if (!lead) return null;
                    return (
                      <div
                        key={item.id}
                        className={`text-xs rounded-md px-1.5 py-1 truncate ${
                          item.sent
                            ? 'bg-connected/20 text-connected'
                            : 'bg-brand/20 text-brand-light'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          {item.sent && <CheckCircle2 className="w-3 h-3 shrink-0" />}
                          <span className="truncate">{lead.name}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          {!item.sent && (
                            <button
                              onClick={() => onUpdateScheduled({ ...item, sent: true })}
                              className="text-connected hover:text-white"
                              title="Mark sent"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                            </button>
                          )}
                          <a
                            href={lead.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-white"
                            title="Open profile"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <button
                            onClick={() => onRemoveScheduled(item.id)}
                            className="text-zinc-600 hover:text-fomo-high ml-auto"
                            title="Remove"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Daily limit hint */}
        <div className="mt-4 p-3 bg-surface-alt rounded-lg border border-zinc-800 text-xs text-zinc-400">
          Tip: Spread your connection requests across the week. Aim for no more than 20 per day to avoid LinkedIn's spam detection.
        </div>
      </div>
    </div>
  );
}
