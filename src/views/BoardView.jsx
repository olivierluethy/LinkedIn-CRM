import { useState } from 'react';
import { Plus, Flame, Clock, CheckCircle2, Search } from 'lucide-react';
import LeadCard from '../components/LeadCard';
import AddLeadForm from '../components/AddLeadForm';
import ScheduleModal from '../components/ScheduleModal';
import WeeklyLimitTracker from '../components/WeeklyLimitTracker';

const COLUMNS = [
  { status: 'warm', label: 'Warm', subtitle: 'Replied to your comment', icon: Flame, accent: 'text-warm border-warm/30' },
  { status: 'pending', label: 'Pending', subtitle: 'Waiting for next week', icon: Clock, accent: 'text-pending border-pending/30' },
  { status: 'connected', label: 'Connected', subtitle: 'Request accepted', icon: CheckCircle2, accent: 'text-connected border-connected/30' },
];

export default function BoardView({
  leads, creators, fomoScores, weeklyLimit,
  onAddLead, onUpdateLead, onDeleteLead, onSchedule,
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [schedulingLead, setSchedulingLead] = useState(null);
  const [search, setSearch] = useState('');

  const filteredLeads = search
    ? leads.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()))
    : leads;

  const handleMove = (lead, newStatus) => {
    if (newStatus === 'connected') {
      weeklyLimit.increment();
    }
    onUpdateLead({ ...lead, status: newStatus, connectedAt: newStatus === 'connected' ? new Date().toISOString() : lead.connectedAt });
  };

  const creatorMap = {};
  for (const c of creators) creatorMap[c.id] = c.name;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="shrink-0 px-6 py-5 border-b border-zinc-800 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Lead Board</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{leads.length} total leads</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="bg-zinc-800/60 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-brand-light focus:ring-1 focus:ring-brand-light/30 w-56"
            />
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-light rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Weekly Limit */}
      <div className="shrink-0 px-6 py-4">
        <WeeklyLimitTracker {...weeklyLimit} />
      </div>

      {/* Kanban Columns */}
      <div className="flex-1 overflow-x-auto px-6 pb-6">
        <div className="grid grid-cols-3 gap-5 min-w-[720px] h-full">
          {COLUMNS.map(({ status, label, subtitle, icon: Icon, accent }) => {
            const columnLeads = filteredLeads.filter((l) => l.status === status);
            return (
              <div key={status} className="flex flex-col min-h-0">
                <div className={`flex items-center gap-2 mb-3 pb-3 border-b ${accent.split(' ')[1]}`}>
                  <Icon className={`w-4 h-4 ${accent.split(' ')[0]}`} />
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="ml-auto text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">{columnLeads.length}</span>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {columnLeads.length === 0 ? (
                    <div className="text-center py-8 text-sm text-zinc-600">
                      {status === 'warm' ? 'No warm leads yet' : status === 'pending' ? 'No pending leads' : 'No connections yet'}
                    </div>
                  ) : (
                    columnLeads.map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        fomoScore={fomoScores[lead.id] || 0}
                        creatorName={creatorMap[lead.parentCreatorId]}
                        onMove={handleMove}
                        onDelete={onDeleteLead}
                        onSchedule={setSchedulingLead}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showAddForm && (
        <AddLeadForm
          creators={creators}
          onAdd={onAddLead}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {schedulingLead && (
        <ScheduleModal
          lead={schedulingLead}
          onSchedule={onSchedule}
          onClose={() => setSchedulingLead(null)}
        />
      )}
    </div>
  );
}
