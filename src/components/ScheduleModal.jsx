import { useState } from 'react';
import { CalendarDays, X } from 'lucide-react';
import { createScheduledItem } from '../lib/schemas';

export default function ScheduleModal({ lead, onSchedule, onClose }) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDate);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date) return;
    onSchedule(createScheduledItem({
      leadId: lead.id,
      date,
      notes: notes.trim(),
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-surface border border-zinc-800 rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-brand-light" />
            Schedule Invite
          </h2>
          <button type="button" onClick={onClose} className="text-zinc-500 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-zinc-400">
          Schedule connection request for <span className="text-zinc-200 font-medium">{lead.name}</span>
        </p>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={defaultDate}
            className="w-full bg-zinc-800/60 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-light focus:ring-1 focus:ring-brand-light/30 [color-scheme:dark]"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">Notes</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Send after their post goes live..."
            className="w-full bg-zinc-800/60 border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-brand-light focus:ring-1 focus:ring-brand-light/30"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-light rounded-lg transition-colors"
          >
            Schedule
          </button>
        </div>
      </form>
    </div>
  );
}
